import React, { useState, useEffect } from 'react';
import { History, Shield, Trash2, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { fetchAnalysisHistory, clearLocalHistory, SavedAnalysisRecord } from '../services/firebase';
import { formatTime } from '../utils/audioValidation';

export const AnalysisReport: React.FC = () => {
  const [history, setHistory] = useState<SavedAnalysisRecord[]>([]);

  const loadHistory = async () => {
    const records = await fetchAnalysisHistory();
    setHistory(records);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClear = () => {
    if (window.confirm("Clear all recorded analysis logs?")) {
      clearLocalHistory();
      setHistory([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-navy-900">Analysis History &amp; Safety Logs</h2>
          <p className="text-xs text-slate-500 mt-1">
            Privacy-preserving audit trail of previous call assessments. No raw voice audio or credentials are saved.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Logs</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Analysis History Yet</h3>
          <p className="text-xs text-slate-400 mt-1">
            Run an analysis on any scam recording or live microphone session to populate logs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((rec) => {
            const isHighRisk = rec.riskLevel === 'critical' || rec.riskLevel === 'high';
            return (
              <div
                key={rec.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {isHighRisk ? (
                      <ShieldAlert className="w-5 h-5 text-rose-600" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    <span className="font-bold text-sm text-navy-900 capitalize">
                      {rec.riskLevel} Risk Assessment
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isHighRisk ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {rec.riskScore}/100 Risk
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-3">{rec.summary}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {rec.categories?.map((cat, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase"
                    >
                      {cat.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                  <span>{new Date(rec.timestamp).toLocaleString()}</span>
                  <span>Duration: ~{rec.durationSeconds}s</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
