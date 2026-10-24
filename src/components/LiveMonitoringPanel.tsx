import React from 'react';
import { Activity, Clock, ShieldCheck, Zap } from 'lucide-react';
import { formatTime } from '../utils/audioValidation';
import { WarningLanguage } from '../types/analysis';

interface LiveMonitoringPanelProps {
  currentChunkIndex: number;
  totalChunks: number;
  isProcessingChunk: boolean;
  currentTime: number;
  lastAnalysisTimestamp: number | null;
  language?: WarningLanguage;
}

export const LiveMonitoringPanel: React.FC<LiveMonitoringPanelProps> = ({
  currentChunkIndex,
  totalChunks,
  isProcessingChunk,
  currentTime,
  language = 'gu',
}) => {
  const labels = {
    gu: {
      title: "ઑડિયો સ્ટ્રીમ મોનિટર",
      buffer: "ચંક બફર: ૫.૦ સેકન્ડ",
      pos: "પ્લેબેક સ્થિતિ",
      chunk: "ચંક ક્રમ",
      engine: "જેમિની નેટિવ ઑડિયો",
      analyzing: "વિશ્લેષણ ચાલુ છે...",
      active: "લાઈવ સ્કૅનિંગ સક્રિય",
      guard: "સુરક્ષા કવચ સક્રિય",
    },
    hi: {
      title: "ऑडियो स्ट्रीम मॉनिटर",
      buffer: "चंक बफर: 5.0 सेकंड",
      pos: "प्लेबैक स्थिति",
      chunk: "चंक अनुक्रम",
      engine: "जेमिनी नेटिव ऑडियो",
      analyzing: "विश्लेषण जारी है...",
      active: "लाइव स्कैनिंग सक्रिय",
      guard: "सुरक्षा कवच सक्रिय",
    },
    en: {
      title: "Audio Stream Monitor",
      buffer: "Chunk Buffer: 5.0s",
      pos: "Playback Position",
      chunk: "Chunk Sequence",
      engine: "Gemini Native Audio",
      analyzing: "Analyzing Chunk...",
      active: "Listening Active",
      guard: "Active Guard",
    },
  };

  const t = labels[language] || labels.gu;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold tracking-wide uppercase text-slate-300">
            {t.title}
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono self-start sm:self-auto">
          {t.buffer}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Stream Position */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">{t.pos}</span>
          </div>
          <div className="text-lg font-mono font-bold text-white">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Current Chunk */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="truncate">{t.chunk}</span>
          </div>
          <div className="text-lg font-mono font-bold text-white">
            {totalChunks > 0 ? `${currentChunkIndex + 1} / ${totalChunks}` : '0 / 0'}
          </div>
        </div>

        {/* Inference Latency / Status */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <span className={`w-2 h-2 rounded-full ${isProcessingChunk ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="truncate">{t.engine}</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1 truncate">
            {isProcessingChunk ? t.analyzing : t.active}
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">{t.guard}</span>
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 truncate">
            Active
          </div>
        </div>
      </div>
    </div>
  );
};
