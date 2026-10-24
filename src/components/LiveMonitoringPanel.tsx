import React from 'react';
import { Activity, Clock, ShieldCheck, Zap } from 'lucide-react';
import { formatTime } from '../utils/audioValidation';

interface LiveMonitoringPanelProps {
  currentChunkIndex: number;
  totalChunks: number;
  isProcessingChunk: boolean;
  currentTime: number;
  lastAnalysisTimestamp: number | null;
}

export const LiveMonitoringPanel: React.FC<LiveMonitoringPanelProps> = ({
  currentChunkIndex,
  totalChunks,
  isProcessingChunk,
  currentTime,
  lastAnalysisTimestamp,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold tracking-wide uppercase text-slate-300">
            Audio Stream Monitor
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono">
          Chunk Buffer: 5.0s
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Stream Position */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Playback Position</span>
          </div>
          <div className="text-lg font-mono font-bold text-white">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Current Chunk */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Chunk Sequence</span>
          </div>
          <div className="text-lg font-mono font-bold text-white">
            {totalChunks > 0 ? `${currentChunkIndex + 1} / ${totalChunks}` : '0 / 0'}
          </div>
        </div>

        {/* Inference Latency / Status */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <span className={`w-2 h-2 rounded-full ${isProcessingChunk ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            <span>Gemini Native Audio</span>
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1">
            {isProcessingChunk ? 'Analyzing Chunk...' : 'Listening Active'}
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Intervention Engine</span>
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-1">
            Active Guard
          </div>
        </div>
      </div>
    </div>
  );
};
