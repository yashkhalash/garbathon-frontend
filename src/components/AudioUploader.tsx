import React, { useRef, useState } from 'react';
import { UploadCloud, Check, AlertTriangle, Play, ShieldAlert, AlertCircle, ShieldCheck } from 'lucide-react';
import { DEMO_PRESETS } from '../services/scamAnalysisService';
import { DemoCallPreset } from '../types/analysis';
import { validateAudioFile } from '../utils/audioValidation';

interface AudioUploaderProps {
  onAudioSelected: (file: File | null, presetUrl?: string, preset?: DemoCallPreset) => void;
  selectedPresetId: string | null;
  setSelectedPresetId: (id: string | null) => void;
  isAnalyzing: boolean;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({
  onAudioSelected,
  selectedPresetId,
  setSelectedPresetId,
  isAnalyzing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError(null);
    const result = await validateAudioFile(file);
    if (!result.isValid) {
      setValidationError(result.error || 'Invalid audio file.');
      return;
    }

    setSelectedFileName(file.name);
    setSelectedPresetId(null);
    onAudioSelected(file);
  };

  const handleSelectPreset = (preset: DemoCallPreset) => {
    setSelectedPresetId(preset.id);
    setSelectedFileName(preset.name);
    setValidationError(null);
    onAudioSelected(null, preset.audioUrl, preset);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base sm:text-lg font-black text-navy-900 dark:text-white flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
            1
          </span>
          <span>STEP 1: Select or Upload Call Audio (.WAV)</span>
        </h2>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          16kHz Mono
        </span>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Choose one of the 3 tiered benchmark calls to observe how the AI distinguishes between <strong>Definite Spam</strong>, <strong>Partially Spam</strong>, and <strong>Genuine Calls</strong>.
      </p>

      {/* 3 Tier Presets Grid */}
      <div className="space-y-3 mb-5">
        {DEMO_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          let borderTheme = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-800/40';

          if (isSelected) {
            if (preset.spamTier === 'definite_spam') {
              borderTheme = 'border-red-500 bg-red-50/80 dark:bg-red-950/30 shadow-sm ring-2 ring-red-400/40';
            } else if (preset.spamTier === 'partially_spam') {
              borderTheme = 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/30 shadow-sm ring-2 ring-amber-400/40';
            } else {
              borderTheme = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/30 shadow-sm ring-2 ring-emerald-400/40';
            }
          }

          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isAnalyzing}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${borderTheme} ${
                isAnalyzing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {preset.id.startsWith('tier1') ? 'TIER 1 (RED)' : preset.id.startsWith('tier2') ? 'TIER 2 (AMBER)' : 'TIER 3 (GREEN)'}
                  </span>

                  {preset.spamTier === 'definite_spam' ? (
                    <span className="flex items-center space-x-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700">
                      <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      <span>Definite Spam (100% Scam)</span>
                    </span>
                  ) : preset.spamTier === 'partially_spam' ? (
                    <span className="flex items-center space-x-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>Partially Spam (Suspicious)</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>No Spam (Safe &amp; Clean)</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-navy-900 dark:text-slate-100 leading-snug">
                  {preset.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {preset.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="font-mono text-[11px]">Audio Duration: ~{preset.durationSeconds}s WAV</span>
                <span className="flex items-center text-blue-600 dark:text-blue-400 font-bold">
                  <Play className="w-3.5 h-3.5 mr-1" />
                  Select This Benchmark
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Upload Area */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
        <div
          onClick={() => !isAnalyzing && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
            selectedFileName && !selectedPresetId
              ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/30'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
          } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/wav,audio/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isAnalyzing}
          />

          <div className="flex flex-col items-center justify-center">
            {selectedFileName && !selectedPresetId ? (
              <>
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm font-bold text-navy-900 dark:text-white">{selectedFileName}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Ready for 5s chunked streaming analysis</p>
              </>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                <p className="text-xs font-semibold text-navy-900 dark:text-slate-200">
                  Or click to upload your own custom <span className="text-blue-600 dark:text-blue-400 font-bold">.WAV recording</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Supports 16kHz PCM audio files</p>
              </>
            )}
          </div>
        </div>
      </div>

      {validationError && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
};
