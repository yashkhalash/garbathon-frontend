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
  History,
  Settings as SettingsIcon,
  Disc,
} from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { ThemeMode } from '../types/theme';
import { AadhaarVaultModal } from './AadhaarVaultModal';
import { TRANSLATIONS } from '../utils/translations';

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
  const t = TRANSLATIONS[language] || TRANSLATIONS.gu;
  const isSenior = themeMode === 'senior';

  return (
    <>
      <header
        className={`relative backdrop-blur-xl border-b sticky top-0 z-40 shadow-2xl transition-all duration-300 ${
          isSenior ? 'bg-[#fffdf8] border-b-2 border-amber-500 text-slate-950 shadow-amber-500/10' : 'bg-[#0a0f1d]/95 border-slate-800/80 text-white'
        }`}
      >
        {/* Animated Neon Gradient Horizon Glow Bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-[3px] animate-pulse opacity-90 ${
            isSenior
              ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300'
              : 'bg-gradient-to-r from-blue-600 via-indigo-500 via-emerald-400 to-amber-400'
          }`}
        />

        <div className="w-full max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
            {/* 1. Left Brand Column */}
            <div
              className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group flex-shrink-0 select-none py-1"
              onClick={() => setCurrentTab('recordings')}
            >
              <div className="relative">
                <div
                  className={`absolute -inset-1.5 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 ${
                    isSenior
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                  }`}
                />
                <div
                  className={`relative p-2 sm:p-2.5 rounded-xl border shadow-xl flex items-center justify-center ${
                    isSenior
                      ? 'bg-amber-100 border-amber-400 text-amber-800'
                      : 'bg-[#0d1527] border-blue-400/40 text-white'
                  }`}
                >
                  <Shield
                    className={`w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300 ${
                      isSenior ? 'text-amber-700' : 'text-blue-400'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span
                    className={`text-lg sm:text-2xl font-black tracking-tight ${
                      isSenior
                        ? 'text-slate-950 font-black'
                        : 'bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent'
                    }`}
                  >
                    Suraksha AI
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full border tracking-wider ${
                      isSenior
                        ? 'bg-amber-200 text-amber-950 border-amber-400 font-black'
                        : 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                    }`}
                  >
                    {isSenior ? 'વરિષ્ઠ મોડ' : 'સુરક્ષા'}
                  </span>
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] font-medium tracking-normal hidden md:block whitespace-nowrap ${
                    isSenior ? 'text-slate-700 font-bold' : 'text-slate-400 font-medium'
                  }`}
                >
                  {t.brandSubtitle}
                </p>
              </div>
            </div>

            {/* 2. Center Navigation Tabs (Desktop xl and up) */}
            <nav
              className={`hidden xl:flex items-center space-x-1.5 p-1.5 rounded-2xl border shadow-inner ${
                isSenior
                  ? 'bg-amber-100/70 border-amber-300'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <button
                onClick={() => setCurrentTab('recordings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'recordings'
                    ? isSenior
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isSenior
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-amber-200/60 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-black'
                }`}
              >
                <Disc className={`w-4 h-4 ${isSenior ? 'text-amber-800' : 'text-blue-200'}`} />
                <span>{t.tabs.recordings}</span>
              </button>

              <button
                onClick={() => setCurrentTab('live')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'live'
                    ? isSenior
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isSenior
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-amber-200/60 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-black'
                }`}
              >
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>{t.tabs.live}</span>
              </button>

              <button
                onClick={() => setCurrentTab('report')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'report'
                    ? isSenior
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isSenior
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-amber-200/60 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-black'
                }`}
              >
                <History className={`w-4 h-4 ${isSenior ? 'text-slate-700' : 'text-slate-400'}`} />
                <span>{t.tabs.report}</span>
              </button>

              <button
                onClick={() => setCurrentTab('settings')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap ${
                  currentTab === 'settings'
                    ? isSenior
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isSenior
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-amber-200/60 font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-black'
                }`}
              >
                <SettingsIcon className={`w-4 h-4 ${isSenior ? 'text-slate-700' : 'text-slate-400'}`} />
                <span>{t.tabs.settings}</span>
              </button>
            </nav>

            {/* 3. Right Action Tools: 5 New Tools + Aadhaar Vault + Theme + Mode + Language */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5 flex-shrink-0">
              {/* 5 NEW AI TOOLS QUICK SHORTCUT */}
              <button
                onClick={() => {
                  setCurrentTab('recordings');
                  setTimeout(() => {
                    document.getElementById('new-features-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }}
                data-testid="five-new-tools-nav-btn"
                className={`relative group flex items-center space-x-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-black transition-all hover:scale-[1.03] active:scale-95 shadow-md ${
                  isSenior
                    ? 'bg-amber-100 border-amber-400 text-slate-950 hover:bg-amber-200'
                    : 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 border-indigo-400/50 hover:border-indigo-300 text-indigo-200'
                }`}
                title="Explore 5 New AI Fraud Protection Tools for GenZ & Older Persons"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSenior ? 'text-amber-600' : 'text-yellow-300'} group-hover:rotate-12 transition-transform`} />
                <span className="whitespace-nowrap font-black hidden lg:inline">5 New Tools</span>
                <span className="text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-indigo-600 text-white animate-pulse tracking-wide">
                  NEW
                </span>
              </button>

              {/* UNIQUE AADHAAR VAULT (Pulsing Glow & Clear Text) */}
              <button
                onClick={() => setIsVaultOpen(true)}
                data-testid="aadhaar-vault-nav-btn"
                className={`relative group flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs font-black transition-all hover:scale-[1.03] active:scale-95 shadow-md ${
                  isSenior
                    ? 'bg-amber-100 border-amber-400 text-slate-950 hover:bg-amber-200'
                    : 'bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border-amber-400/40 hover:border-amber-300 text-amber-200'
                }`}
                title="Open Aadhaar Biometric Freeze Vault against Digital Arrests"
              >
                <Lock className={`w-3.5 h-3.5 ${isSenior ? 'text-amber-700' : 'text-amber-400'} group-hover:rotate-6 transition-transform`} />
                <span className="whitespace-nowrap font-black hidden sm:inline">Aadhaar Vault</span>
                <span className="whitespace-nowrap font-black sm:hidden">Vault</span>

                {/* Animated Pulsing Beacon */}
                <div className="flex items-center space-x-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 animate-pulse tracking-wide">
                    NEW
                  </span>
                </div>
              </button>

              {/* Dynamic Theme Switcher with Clear Label */}
              <div
                className={`flex items-center rounded-xl p-1 border text-xs shadow-inner ${
                  isSenior
                    ? 'bg-amber-100/80 border-amber-300'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <button
                  onClick={() => setThemeMode('light')}
                  className={`p-1.5 rounded-lg transition-all ${
                    themeMode === 'light'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isSenior
                      ? 'text-slate-600 hover:text-slate-900'
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
                      : isSenior
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Dark Theme"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setThemeMode('senior')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg transition-all font-black ${
                    isSenior
                      ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-600'
                      : 'text-slate-400 hover:text-amber-300'
                  }`}
                  title="Senior Citizen Accessible Theme"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Senior</span>
                </button>
              </div>

              {/* Real AI vs Demo Switch */}
              <div
                className={`flex items-center rounded-xl p-1 border text-xs shadow-inner ${
                  isSenior
                    ? 'bg-amber-100/80 border-amber-300'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <button
                  onClick={() => setIsDemoMode(false)}
                  data-testid="real-ai-mode-btn"
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg font-black transition-all ${
                    !isDemoMode
                      ? isSenior
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : isSenior
                      ? 'text-slate-700 hover:text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Uses live Gemini Native Audio API"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isSenior ? 'text-amber-200' : 'text-yellow-300'}`} />
                  <span className="whitespace-nowrap hidden sm:inline">Real AI</span>
                  <span className="whitespace-nowrap sm:hidden">AI</span>
                </button>
                <button
                  onClick={() => setIsDemoMode(true)}
                  data-testid="demo-mode-btn"
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg font-black transition-all ${
                    isDemoMode
                      ? 'bg-amber-600 text-white shadow-md'
                      : isSenior
                      ? 'text-slate-700 hover:text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Runs benchmark simulation mode"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap hidden sm:inline">Demo</span>
                </button>
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as WarningLanguage)}
                  data-testid="language-select"
                  className={`border rounded-xl px-2 sm:px-3 py-1.5 text-xs font-black focus:outline-none focus:ring-2 cursor-pointer shadow-sm transition-colors ${
                    isSenior
                      ? 'bg-white text-slate-950 border-amber-400 focus:ring-amber-500 font-bold'
                      : 'bg-slate-900 text-white border-slate-700/80 focus:ring-blue-500 hover:border-slate-500'
                  }`}
                  title="Select preferred intervention language"
                >
                  <option value="gu" className={isSenior ? 'bg-white text-slate-900 font-bold' : 'bg-slate-900 text-white font-bold'}>ગુજરાતી</option>
                  <option value="hi" className={isSenior ? 'bg-white text-slate-900 font-bold' : 'bg-slate-900 text-white font-bold'}>हिन्दी</option>
                  <option value="en" className={isSenior ? 'bg-white text-slate-900 font-bold' : 'bg-slate-900 text-white font-bold'}>English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Mobile / Tablet Navigation Bar (below xl) */}
        <div
          className={`xl:hidden flex items-center justify-around border-t px-2 py-2 overflow-x-auto gap-1 ${
            isSenior
              ? 'bg-[#fffdf8] border-amber-300'
              : 'bg-slate-950/95 border-slate-800/80'
          }`}
        >
          <button
            onClick={() => setCurrentTab('recordings')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'recordings'
                ? isSenior
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-blue-600 text-white'
                : isSenior
                ? 'text-slate-700 hover:text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Disc className={`w-3.5 h-3.5 ${isSenior ? 'text-amber-800' : 'text-blue-300'}`} />
            <span>{t.tabs.recordings}</span>
          </button>

          <button
            onClick={() => setCurrentTab('live')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'live'
                ? isSenior
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-blue-600 text-white'
                : isSenior
                ? 'text-slate-700 hover:text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.tabs.live}</span>
          </button>

          <button
            onClick={() => setCurrentTab('report')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'report'
                ? isSenior
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-blue-600 text-white'
                : isSenior
                ? 'text-slate-700 hover:text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className={`w-3.5 h-3.5 ${isSenior ? 'text-slate-700' : 'text-slate-300'}`} />
            <span>{t.tabs.report}</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'settings'
                ? isSenior
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-blue-600 text-white'
                : isSenior
                ? 'text-slate-700 hover:text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SettingsIcon className={`w-3.5 h-3.5 ${isSenior ? 'text-slate-700' : 'text-slate-300'}`} />
            <span>{t.tabs.settings}</span>
          </button>
        </div>

        {/* Dynamic Mode Sub-Banner with Animated Status Pill */}
        {isDemoMode ? (
          <div className="bg-amber-500 text-slate-950 px-4 py-1 text-xs font-black text-center tracking-wider flex items-center justify-center space-x-2 shadow-inner">
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
