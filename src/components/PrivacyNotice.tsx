import React from 'react';
import { Lock, Shield, EyeOff, Trash2 } from 'lucide-react';
import { clearLocalHistory } from '../services/firebase';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';

interface PrivacyNoticeProps {
  onHistoryCleared?: () => void;
  language?: WarningLanguage;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
  onHistoryCleared,
  language = 'gu',
}) => {
  const t = TRANSLATIONS[language]?.privacy || TRANSLATIONS.gu.privacy;

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all locally stored analysis logs?")) {
      clearLocalHistory();
      if (onHistoryCleared) onHistoryCleared();
    }
  };

  return (
    <div className="bg-slate-100/80 dark:bg-slate-900/80 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-navy-800 dark:text-blue-400" />
          <h3 className="text-sm font-bold text-navy-900 dark:text-white uppercase tracking-wider">
            {t.title}
          </h3>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center space-x-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-800 font-semibold px-2.5 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.clearBtn}</span>
        </button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
        {t.desc}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{t.bullet1}</span>
        </div>
        <div className="flex items-center space-x-2">
          <EyeOff className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{t.bullet2}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{t.bullet3}</span>
        </div>
      </div>
    </div>
  );
};
