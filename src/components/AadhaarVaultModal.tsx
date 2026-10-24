import React, { useState } from 'react';
import { Lock, CheckCircle, Eye, EyeOff, X, ShieldCheck, Key, ShieldAlert } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';

interface AadhaarVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
}

export const AadhaarVaultModal: React.FC<AadhaarVaultModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [isLocked, setIsLocked] = useState(true);
  const [showVirtualId, setShowVirtualId] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[language]?.vault || TRANSLATIONS.gu.vault;

  if (!isOpen) return null;

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
    setStatusMessage(!isLocked ? t.lockedSuccess : t.unlockedSuccess);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div
      data-testid="aadhaar-vault-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-testid="close-vault-btn"
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-amber-500 via-rose-500 to-amber-600 p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-navy-950 tracking-wider animate-pulse">
                {t.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Core Protection Description Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 mb-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-extrabold text-sm block mb-1">
            {t.howItWorksTitle}
          </strong>
          {t.howItWorksDesc}
        </div>

        {/* 3 Step Aadhaar Protection Flow */}
        <div className="space-y-2.5 mb-5">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-xs font-black text-navy-900 dark:text-white">{t.step1Title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.step1Desc}</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-xs font-black text-navy-900 dark:text-white">{t.step2Title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.step2Desc}</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-xs font-black text-navy-900 dark:text-white">{t.step3Title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{t.step3Desc}</p>
            </div>
          </div>
        </div>

        {/* Card Status Display */}
        <div className="bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t.maskedIdentity}
            </span>
            <button
              onClick={() => setShowVirtualId(!showVirtualId)}
              className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {showVirtualId ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showVirtualId ? t.hideVid : t.showVid}</span>
            </button>
          </div>

          <div className="font-mono text-xl font-black tracking-widest text-navy-900 dark:text-white py-1">
            {showVirtualId ? '9182-4521-7890-3341' : 'XXXX-XXXX-8921'}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <span className="text-slate-600 dark:text-slate-300">{t.biometricStatus}</span>
            <span
              className={`font-black px-3 py-1 rounded-full text-xs ${
                isLocked
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
              }`}
            >
              {isLocked ? t.lockedStatus : t.unlockedStatus}
            </span>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleToggleLock}
            className={`w-full sm:flex-1 py-3 px-4 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 ${
              isLocked
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isLocked ? t.tempUnlockBtn : t.lockNowBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
