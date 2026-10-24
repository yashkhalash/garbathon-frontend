import React, { useState } from 'react';
import {
  Shield,
  Radio,
  Sparkles,
  AlertCircle,
  Sun,
  Moon,
  Eye,
  Lock,
  ChevronDown,
  History,
  Settings as SettingsIcon,
  Disc,
} from 'lucide-react';
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
      <header className="relative bg-[#0a0f1d]/95 backdrop-blur-xl border-b border-slate-800/80 text-white sticky top-0 z-40 shadow-2xl transition-all duration-300">
        {/* Animated Neon Gradient Horizon Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-500 via-emerald-400 to-amber-400 animate-pulse opacity-90" />

        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            {/* 1. Left Brand Column */}
            <div
              className="flex items-center space-x-3 cursor-pointer group flex-shrink-0 select-none py-1"
              onClick={() => setCurrentTab('recordings')}
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105" />
                <div className="relative bg-[#0d1527] p-2.5 rounded-xl border border-blue-400/40 text-white shadow-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                    Suraksha AI
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 tracking-wider">
                    સુરક્ષા
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium tracking-normal hidden md:block whitespace-nowrap">
                  Real-Time Voice Scam Shield • Powered by Google Gemini Native Audio
                </p>
              </div>
            </div>

            {/* 2. Center Navigation Tabs with Spacious Text & Clear Badges */}
            <nav className="hidden xl:flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
              <button
                onClick={() => setCurrentTab('recordings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'recordings'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Disc className="w-4 h-4 text-blue-200" />
                <span>Analyze Recording</span>
              </button>

              <button
                onClick={() => setCurrentTab('live')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'live'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Live Mic Mode</span>
              </button>

              <button
                onClick={() => setCurrentTab('report')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'report'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <History className="w-4 h-4 text-slate-400" />
                <span>History &amp; Logs</span>
              </button>

              <button
                onClick={() => setCurrentTab('settings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'settings'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <SettingsIcon className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>
            </nav>

            {/* 3. Right Action Tools: Aadhaar Vault + Theme + Mode + Language */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* UNIQUE AADHAAR VAULT (Pulsing Glow & Clear Text) */}
              <button
                onClick={() => setIsVaultOpen(true)}
                data-testid="aadhaar-vault-nav-btn"
                className="relative group flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border border-amber-400/40 hover:border-amber-300 text-amber-200 text-xs font-black transition-all hover:scale-[1.03] active:scale-95 shadow-md"
                title="Open Aadhaar Biometric Freeze Vault against Digital Arrests"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-6 transition-transform" />
                <span className="whitespace-nowrap font-black">Aadhaar Vault</span>

                {/* Animated Pulsing Beacon */}
                <div className="flex items-center space-x-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 animate-pulse tracking-wide">
                    NEW
                  </span>
                </div>
              </button>

              {/* Dynamic Theme Switcher with Clear Label */}
              <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs shadow-inner">
                <button
                  onClick={() => setThemeMode('light')}
                  className={`p-1.5 rounded-lg transition-all ${
                    themeMode === 'light'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Light Theme"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`p-1.5 rounded-lg transition-all ${
                    themeMode === 'dark'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Dark Theme"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setThemeMode('senior')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all font-black ${
                    themeMode === 'senior'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                  title="Senior Citizen Accessible Theme"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden 2xl:inline text-[11px]">Senior</span>
                </button>
              </div>

              {/* Real AI vs Demo Switch (Proper spacing & Badges) */}
              <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs shadow-inner">
                <button
                  onClick={() => setIsDemoMode(false)}
                  data-testid="real-ai-mode-btn"
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-black transition-all ${
                    !isDemoMode
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Uses live Gemini Native Audio API"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="whitespace-nowrap">Real AI</span>
                </button>
                <button
                  onClick={() => setIsDemoMode(true)}
                  data-testid="demo-mode-btn"
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-black transition-all ${
                    isDemoMode
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Runs benchmark simulation mode"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">Demo</span>
                </button>
              </div>

              {/* Language Selector Dropdown (Clean, Crisp Typography) */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as WarningLanguage)}
                  data-testid="language-select"
                  className="bg-slate-900 text-white border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-black focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm hover:border-slate-500 transition-colors"
                  title="Select preferred intervention language"
                >
                  <option value="gu" className="bg-slate-900 text-white font-bold py-1">ગુજરાતી</option>
                  <option value="hi" className="bg-slate-900 text-white font-bold py-1">हिन्दी</option>
                  <option value="en" className="bg-slate-900 text-white font-bold py-1">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Mode Sub-Banner with Animated Status Pill */}
        {isDemoMode ? (
          <div className="bg-amber-500 text-navy-950 px-4 py-1 text-xs font-black text-center tracking-wider flex items-center justify-center space-x-2 shadow-inner">
            <span>⚠️ DEMO MODE ACTIVE — SIMULATED 3-TIER BENCHMARKS (SWITCH TO 'REAL AI' FOR LIVE GEMINI FLASH CALLS)</span>
          </div>
        ) : (
          <div className="bg-emerald-600 text-white px-4 py-1 text-xs font-black text-center tracking-wider flex items-center justify-center space-x-2 shadow-inner">
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
