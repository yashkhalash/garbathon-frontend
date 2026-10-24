import React, { useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Cpu } from 'lucide-react';
import { formatTime } from '../utils/audioValidation';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';

interface AudioPlayerProps {
  audioUrl: string | null;
  isPlaying: boolean;
  isAnalyzing: boolean;
  currentTime: number;
  duration: number;
  language: WarningLanguage;
  onPlayPause: () => void;
  onRestart: () => void;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (dur: number) => void;
  onEnded: () => void;
  onStartAnalysis: () => void;
  onStopAnalysis: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  isAnalyzing,
  currentTime,
  duration,
  language,
  onPlayPause,
  onRestart,
  onTimeUpdate,
  onDurationChange,
  onEnded,
  onStartAnalysis,
  onStopAnalysis,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = TRANSLATIONS[language]?.player || TRANSLATIONS.gu.player;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    onTimeUpdate(time);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-navy-900 dark:text-white flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
              2
            </span>
            <span>{t.title}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.subtitle}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {isAnalyzing ? (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold animate-pulse border border-blue-200 dark:border-blue-800">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
              <span>{t.listeningStatus}</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
              <span>{t.readyStatus}</span>
            </span>
          )}
        </div>
      </div>

      {audioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={() => audioRef.current && onTimeUpdate(audioRef.current.currentTime)}
          onLoadedMetadata={() => audioRef.current && onDurationChange(audioRef.current.duration)}
          onEnded={() => {
            onEnded();
          }}
        />
      ) : null}

      {/* Progress Bar & Timestamps */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          disabled={!audioUrl}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Controls & Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPlayPause}
            disabled={!audioUrl}
            className={`p-3 rounded-xl flex items-center justify-center transition-all ${
              !audioUrl
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-navy-900 dark:bg-blue-600 text-white hover:bg-navy-800 dark:hover:bg-blue-500 shadow-md active:scale-95'
            }`}
            title={isPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={onRestart}
            disabled={!audioUrl}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50"
            title="Restart playback from 00:00"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Start / Stop Real-Time AI Analysis Action */}
        <div className="flex items-center space-x-2">
          {!isAnalyzing ? (
            <button
              onClick={onStartAnalysis}
              disabled={!audioUrl}
              data-testid="start-analysis-btn"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all ${
                !audioUrl
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95 ring-2 ring-blue-500/20'
              }`}
            >
              <Cpu className="w-4 h-4 text-blue-200" />
              <span>{t.startBtn}</span>
            </button>
          ) : (
            <button
              onClick={onStopAnalysis}
              data-testid="stop-analysis-btn"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-rose-600 text-white hover:bg-rose-700 shadow-md transition-all active:scale-95"
            >
              <span>{t.stopBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
