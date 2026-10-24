import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { LiveAudio } from './pages/LiveAudio';
import { AnalysisReport } from './pages/AnalysisReport';
import { Settings } from './pages/Settings';
import { PageLoader } from './components/PageLoader';
import { WarningLanguage } from './types/analysis';
import { ThemeMode } from './types/theme';
import { checkBackendHealth } from './services/scamAnalysisService';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'recordings' | 'live' | 'report' | 'settings'>('recordings');
  const [language, setLanguage] = useState<WarningLanguage>('gu');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('suraksha_theme') as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
  }, []);

  // Apply theme dynamically to document root
  useEffect(() => {
    localStorage.setItem('suraksha_theme', themeMode);
    const root = document.documentElement;

    root.classList.remove('dark', 'senior-theme');

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else if (themeMode === 'senior') {
      root.classList.add('senior-theme');
    }
  }, [themeMode]);

  useEffect(() => {
    checkBackendHealth().then((res) => {
      if (!res.has_gemini_key) {
        setIsDemoMode(true);
      }
    });
  }, []);

  return (
    <>
      {isPageLoading && <PageLoader onComplete={() => setIsPageLoading(false)} />}

      <div
        className={`min-h-screen flex flex-col font-sans transition-colors duration-300 w-full overflow-x-hidden ${
          themeMode === 'dark'
            ? 'bg-slate-950 text-slate-100'
            : themeMode === 'senior'
            ? 'bg-amber-50/50 text-black text-lg'
            : 'bg-slate-50 text-slate-900'
        }`}
      >
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'recordings' && (
          <Dashboard language={language} isDemoMode={isDemoMode} />
        )}
        {currentTab === 'live' && (
          <LiveAudio language={language} isDemoMode={isDemoMode} />
        )}
        {currentTab === 'report' && <AnalysisReport language={language} />}
        {currentTab === 'settings' && (
          <Settings language={language} setLanguage={setLanguage} />
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">
        <p>
          Suraksha AI — Real-Time Voice Scam Protection Assistant • Built for Garbathon 2026
        </p>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
          Powered by Gemini Native Audio Understanding &amp; Firebase • Non-punitive advisory safety layer
        </p>
      </footer>
    </div>
    </>
  );
};

export default App;
