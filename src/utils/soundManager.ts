/**
 * Global Sound Manager for Suraksha AI.
 * Ensures strict single-stream audio playback:
 * When one sound begins playing (Call Audio, Voice Warning, or Demo Preset),
 * all other audio tracks, HTMLAudioElement instances, and speech synthesizers
 * immediately pause or terminate. Zero overlapping voices.
 */

type SoundCallback = () => void;

class GlobalSoundManager {
  private activeAudioElements: Set<HTMLAudioElement> = new Set();
  private stopListeners: Set<SoundCallback> = new Set();
  private currentSpeaker: string | null = null;

  /**
   * Register an HTMLAudioElement so the manager can track and halt it.
   */
  public register(audio: HTMLAudioElement, id: string = 'media-player'): () => void {
    this.activeAudioElements.add(audio);

    const onPlay = () => {
      this.stopAllExcept(audio, id);
    };

    audio.addEventListener('play', onPlay);

    // Return unregister function
    return () => {
      audio.removeEventListener('play', onPlay);
      this.activeAudioElements.delete(audio);
    };
  }

  /**
   * Stops all active audio elements, speech synthesizers, and notifies listeners.
   */
  public stopAll(except?: HTMLAudioElement | null, sourceId?: string) {
    this.stopAllExcept(except, sourceId);
  }

  private stopAllExcept(except?: HTMLAudioElement | null, sourceId?: string) {
    this.currentSpeaker = sourceId || null;

    // 1. Pause any tracked HTMLAudioElements
    this.activeAudioElements.forEach((audio) => {
      if (audio !== except && !audio.paused) {
        try {
          audio.pause();
        } catch (e) {
          console.warn('SoundManager: error pausing audio', e);
        }
      }
    });

    // 2. Query any other <audio> elements in the DOM just in case
    if (typeof document !== 'undefined') {
      const allDomAudios = document.querySelectorAll('audio');
      allDomAudios.forEach((el) => {
        if (el !== except && !el.paused) {
          try {
            el.pause();
          } catch {
            // ignore
          }
        }
      });
    }

    // 3. Cancel browser SpeechSynthesis if speech is not the current source
    if (sourceId !== 'speech-synthesis' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }

    // 4. Notify all registered stop listeners (e.g., UI state setters)
    this.stopListeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // ignore
      }
    });
  }

  /**
   * Subscribe to global sound stop events (e.g. to update UI play buttons).
   */
  public onStop(callback: SoundCallback): () => void {
    this.stopListeners.add(callback);
    return () => {
      this.stopListeners.delete(callback);
    };
  }

  public getCurrentSpeaker(): string | null {
    return this.currentSpeaker;
  }
}

export const soundManager = new GlobalSoundManager();
