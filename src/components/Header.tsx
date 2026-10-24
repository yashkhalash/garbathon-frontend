import React, { useState } from 'react';
import { Shield, Radio, Sparkles, AlertCircle, Sun, Moon, Eye, Lock } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { ThemeMode } from '../types/theme';
import { AadhaarVaultModal } from './AadhaarVaultModal';

interface HeaderProps {
  currentTab: 'recordings' | 'live' | 'report' | 'settings';
  setCurrentTab: (tab: 'recordings' | 'live' | 'report' | 'settings') => void;
  language: WarningLanguage;
  setLanguage: (lang: WarningLanguage) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isDemoMode,
  setIsDemoMode,
  themeMode,
  setThemeMode,
}) => {
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  return (
    <>
      <header className="relative bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 border-b border-navy-800 text-white sticky top-0 z-40 shadow-xl backdrop-blur-md">
        {/* Top ambient glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 opacity-80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Product Brand */}
            <div
              className="flex items-center space-x-3 cursor-pointer group select-none"
              onClick={() => setCurrentTab('recordings')}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-navy-900 p-2.5 rounded-xl border border-blue-400/40 text-white shadow-lg">
                  <Shield className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                    Suraksha AI
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    સુરક્ષા
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Real-Time Voice Scam Shield • Powered by Google Gemini Native Audio
                </p>
              </div>
            </div>

            {/* Navigation Tabs with Modern Glass Pill Design */}
            <nav className="hidden lg:flex items-center space-x-1 bg-navy-800/80 p-1.5 rounded-2xl border border-navy-700/80 backdrop-blur-sm shadow-inner">
              <button
                onClick={() => setCurrentTab('recordings')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  currentTab === 'recordings'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                Analyze Recording
              </button>
              <button
                onClick={() => setCurrentTab('live')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  currentTab === 'live'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live Mic Mode</span>
              </button>
              <button
                onClick={() => setCurrentTab('report')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  currentTab === 'report'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                History &amp; Logs
              </button>
              <button
                onClick={() => setCurrentTab('settings')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  currentTab === 'settings'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-navy-700/50'
                }`}
              >
                Settings
              </button>
            </nav>

            {/* Actions: Unique Aadhaar Vault + Theme + Mode + Language */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* UNIQUE NEW FEATURE: Aadhaar Biometric Vault Button */}
              <button
                onClick={() => setIsVaultOpen(true)}
                className="relative group flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 hover:border-amber-300 text-amber-200 text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Open Aadhaar Biometric Freeze Vault against Digital Arrests"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Aadhaar Vault</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-emerald-500 text-navy-950 animate-pulse">
                  NEW
                </span>
              </button>

              {/* Dynamic Theme Switcher */}
              <div className="flex items-center bg-navy-800/90 rounded-xl p-1 border border-navy-700 text-xs">
                <button
                  onClick={() => setThemeMode('light')}
                  className={`p-1.5 rounded-lg transition-all ${
                    themeMode === 'light' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Light Theme"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`p-1.5 rounded-lg transition-all ${
                    themeMode === 'dark' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Dark Theme"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setThemeMode('senior')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all font-black ${
                    themeMode === 'senior' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-amber-300'
                  }`}
                  title="Senior Citizen Accessible Theme"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Senior</span>
                </button>
              </div>

              {/* Real AI vs Demo Switch */}
              <div className="flex items-center bg-navy-800/90 rounded-xl p-1 border border-navy-700 text-xs">
                <button
                  onClick={() => setIsDemoMode(false)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-black transition-all ${
                    !isDemoMode
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Uses live Gemini Native Audio API"
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span className="hidden sm:inline">Real AI</span>
                </button>
                <button
                  onClick={() => setIsDemoMode(true)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-black transition-all ${
                    isDemoMode
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Runs benchmark simulation mode"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span className="hidden sm:inline">Demo</span>
                </button>
              </div>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as WarningLanguage)}
                  className="bg-navy-800 text-white border border-navy-700 rounded-xl px-2.5 py-1.5 text-xs font-black focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm"
                  title="Select preferred intervention language"
                >
                  <option value="gu">ગુજરાતી</option>
                  <option value="hi">हिन्दी</option>
                  <option value="en">ENG</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Mode Sub-Banner */}
        {isDemoMode ? (
          <div className="bg-amber-500 text-navy-950 px-4 py-1 text-xs font-black text-center tracking-wide flex items-center justify-center space-x-2">
            <span>⚠️ DEMO MODE ACTIVE — SIMULATED 3-TIER BENCHMARKS (SWITCH TO 'REAL AI' FOR LIVE GEMINI FLASH CALLS)</span>
          </div>
        ) : (
          <div className="bg-emerald-600 text-white px-4 py-1 text-xs font-black text-center tracking-wide flex items-center justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>✨ REAL AI MODE ACTIVE — NATIVE GEMINI 2.5 FLASH AUDIO ENGINE CONNECTED</span>
          </div>
        )}
      </header>

      {/* Aadhaar Vault Modal */}
      <AadhaarVaultModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        language={language}
      />
    </>
  );
};
