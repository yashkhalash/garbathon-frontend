import { WarningLanguage } from '../types/analysis';

class SpeechWarningService {
  private isEnabled: boolean = true;
  private currentAudio: HTMLAudioElement | null = null;
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Plays natural human speech using server-side neural TTS for Gujarati, Hindi, and Indian English.
   * Falls back gracefully to browser SpeechSynthesis only if offline.
   */
  public async speak(text: string, lang: WarningLanguage = 'gu') {
    if (!this.isEnabled || !text) return;

    this.stop();

    try {
      // 1. Try High-Quality Natural Human Voice from backend API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          language: lang,
          tld: 'co.in',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audio_b64) {
          const audioSrc = `data:${data.mime_type || 'audio/mp3'};base64,${data.audio_b64}`;
          const audio = new Audio(audioSrc);
          this.currentAudio = audio;
          audio.playbackRate = 1.0;
          await audio.play();
          audio.onended = () => {
            this.currentAudio = null;
          };
          return;
        }
      }
    } catch (e) {
      console.warn("Backend human TTS unavailable, using browser synthesis fallback:", e);
    }

    // 2. Fallback to browser SpeechSynthesis
    if (this.synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'gu') {
        utterance.lang = 'gu-IN';
      } else if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = this.synth.getVoices();
      const matched = voices.find(v => v.lang.startsWith(lang));
      if (matched) utterance.voice = matched;

      this.synth.speak(utterance);
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
  }
}

export const speechWarningService = new SpeechWarningService();
