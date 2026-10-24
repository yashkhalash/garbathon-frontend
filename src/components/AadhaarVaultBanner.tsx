import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { AadhaarVaultModal } from './AadhaarVaultModal';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';
import { VoiceExplainerButton } from './VoiceExplainerButton';

interface AadhaarVaultBannerProps {
  language: WarningLanguage;
}

export const AadhaarVaultBanner: React.FC<AadhaarVaultBannerProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[language]?.vault || TRANSLATIONS.gu.vault;
  const explainerText = TRANSLATIONS[language]?.voiceExplainer?.aadhaarVault || TRANSLATIONS.gu.voiceExplainer.aadhaarVault;

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-indigo-950 to-navy-900 rounded-3xl p-5 sm:p-6 border border-indigo-800/60 shadow-lg text-white">
        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {t.bannerTitle}
                </h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-navy-950 animate-pulse">
                  {t.badge}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {t.bannerDesc}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
            <VoiceExplainerButton
              textToSpeak={explainerText}
              language={language}
              variant="amber"
              size="md"
              testId="voice-explain-aadhaar-vault"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              <span>{t.launchButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AadhaarVaultModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        language={language}
      />
    </>
  );
};
