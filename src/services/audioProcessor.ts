import { AudioChunk } from '../types/analysis';

/**
 * Splits an audio file or AudioBuffer into manageable overlapping chunks.
 * Encodes each chunk into a standard 16kHz mono WAV Blob and Base64 string for Gemini audio analysis.
 */
export async function splitAudioIntoWavChunks(
  file: File | Blob,
  chunkDurationSec: number = 6,
  overlapSec: number = 1.5
): Promise<AudioChunk[]> {
  const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  const totalDuration = audioBuffer.duration;
  const sampleRate = audioBuffer.sampleRate;
  const chunks: AudioChunk[] = [];
  
  let startTime = 0;
  let chunkIndex = 0;
  
  while (startTime < totalDuration) {
    const endTime = Math.min(startTime + chunkDurationSec, totalDuration);
    const duration = endTime - startTime;
    
    // Ignore extremely tiny leftover chunks
    if (duration < 1.0 && chunks.length > 0) {
      break;
    }
    
    const startSample = Math.floor(startTime * sampleRate);
    const endSample = Math.floor(endTime * sampleRate);
    const sampleCount = endSample - startSample;
    
    // Extract channel data (mix to mono if multi-channel)
    const monoData = new Float32Array(sampleCount);
    const numChannels = audioBuffer.numberOfChannels;
    
    for (let c = 0; c < numChannels; c++) {
      const channelData = audioBuffer.getChannelData(c);
      for (let i = 0; i < sampleCount; i++) {
        monoData[i] += channelData[startSample + i] / numChannels;
      }
    }
    
    // Resample to 16,000 Hz if needed for Gemini standard speech
    const targetSampleRate = 16000;
    const resampledData = resampleAudio(monoData, sampleRate, targetSampleRate);
    
    // Convert to PCM WAV Blob
    const wavBlob = encodeWAV(resampledData, targetSampleRate);
    const audioBase64 = await blobToBase64(wavBlob);
    
    chunks.push({
      chunkIndex,
      startTime,
      endTime,
      audioBlob: wavBlob,
      audioBase64,
    });
    
    chunkIndex++;
    startTime += chunkDurationSec - overlapSec;
    if (startTime >= totalDuration - 0.5) break;
  }
  
  await audioContext.close();
  return chunks;
}

function resampleAudio(source: Float32Array, srcRate: number, dstRate: number): Float32Array {
  if (srcRate === dstRate) return source;
  const ratio = srcRate / dstRate;
  const dstLength = Math.round(source.length / ratio);
  const result = new Float32Array(dstLength);
  
  for (let i = 0; i < dstLength; i++) {
    const srcIndex = i * ratio;
    const left = Math.floor(srcIndex);
    const right = Math.min(left + 1, source.length - 1);
    const frac = srcIndex - left;
    result[i] = source[left] * (1 - frac) + source[right] * frac;
  }
  return result;
}

function encodeWAV(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  
  // RIFF identifier
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  
  // Format chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, 1, true); // NumChannels (1 = Mono)
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * 2, true); // ByteRate (SampleRate * 1 * 16/8)
  view.setUint16(32, 2, true); // BlockAlign (1 * 16/8)
  view.setUint16(34, 16, true); // BitsPerSample
  
  // Data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  
  // Write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  
  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string): void {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
