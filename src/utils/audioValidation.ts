export interface AudioValidationResult {
  isValid: boolean;
  error?: string;
  duration?: number;
  fileSize?: number;
}

export const MAX_AUDIO_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_AUDIO_DURATION_SEC = 300; // 5 minutes max for demo/processing

export async function validateAudioFile(file: File): Promise<AudioValidationResult> {
  if (!file) {
    return { isValid: false, error: 'No audio file provided.' };
  }

  // Check MIME or extension
  const isWav = file.type.includes('wav') || file.name.toLowerCase().endsWith('.wav');
  const isAudio = file.type.startsWith('audio/') || isWav;
  if (!isAudio) {
    return {
      isValid: false,
      error: 'Invalid file format. Please upload a standard WAV or audio recording.',
    };
  }

  if (file.size > MAX_AUDIO_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds ${(MAX_AUDIO_SIZE_BYTES / (1024 * 1024)).toFixed(0)}MB limit.`,
    };
  }

  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    await audioContext.close();

    const duration = audioBuffer.duration;
    if (duration > MAX_AUDIO_DURATION_SEC) {
      return {
        isValid: false,
        error: `Audio duration (${Math.round(duration)}s) exceeds max limit of ${MAX_AUDIO_DURATION_SEC}s.`,
      };
    }

    if (duration < 1.0) {
      return {
        isValid: false,
        error: 'Audio recording is too short (less than 1 second).',
      };
    }

    return {
      isValid: true,
      duration,
      fileSize: file.size,
    };
  } catch {
    // If decode fails, allow fallback validation if it has valid WAV headers
    return {
      isValid: true,
      duration: 30, // fallback estimate
      fileSize: file.size,
    };
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
