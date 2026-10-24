import React, { useEffect, useState } from 'react';
import { Shield, Sparkles, Lock, Cpu, CheckCircle } from 'lucide-react';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Suraksha AI Shield...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Connecting to Google Gemini 2.5 Flash Native Audio Engine...' },
      { at: 45, text: 'Synchronizing UIDAI Aadhaar Biometric Freeze Vault...' },
      { at: 75, text: 'Calibrating Multilingual Neural Voice Models (Gujarati/Hindi/English)...' },
      { at: 95, text: 'Real-Time Voice Scam Protection Ready.' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        const matchingStatus = statuses.slice().reverse().find((s) => next >= s.at);
        if (matchingStatus) {
          setStatusText(matchingStatus.text);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 400);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b16] text-white transition-opacity duration-400 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient Radial Horizon Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.25),rgba(255,255,255,0))] pointer-events-none" />

      {/* Main Logo & Radar Rings */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Pulsing Concentric Radar Rings */}
        <div className="absolute w-44 h-44 rounded-full border border-blue-500/20 animate-ping" />
        <div className="absolute w-36 h-36 rounded-full border border-emerald-400/20 animate-pulse" />
        <div className="absolute w-28 h-28 rounded-full bg-blue-600/10 blur-xl" />

        {/* Shield Logo with Neon Accent */}
        <div className="relative bg-gradient-to-tr from-slate-900 via-[#0e172e] to-slate-900 p-6 rounded-3xl border border-blue-500/40 shadow-2xl shadow-blue-500/20">
          <Shield className="w-14 h-14 text-blue-400 animate-pulse" />
          <div className="absolute top-2 right-2 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* Brand Title */}
      <div className="text-center space-y-1 mb-8 z-10">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            Suraksha AI
          </h1>
          <span className="text-xs font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
            સુરક્ષા
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          Real-Time Voice Scam Detection • Garbathon 2026
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-72 sm:w-80 bg-slate-800/80 rounded-full h-2 p-0.5 border border-slate-700/60 overflow-hidden shadow-inner mb-4 z-10">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Percentage & Status Note */}
      <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 z-10">
        <span className="text-blue-400 font-black">{progress}%</span>
        <span>•</span>
        <span className="text-slate-300 font-medium animate-pulse">{statusText}</span>
      </div>

      {/* Footer Pill Details */}
      <div className="absolute bottom-8 flex items-center space-x-4 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>Gemini Native Audio</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1">
          <Lock className="w-3.5 h-3.5 text-amber-400" />
          <span>UIDAI Vault Lock</span>
        </span>
      </div>
    </div>
  );
};
