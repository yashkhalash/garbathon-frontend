import React, { useState } from 'react';
import { Lock, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { AadhaarVaultModal } from './AadhaarVaultModal';
import { WarningLanguage } from '../types/analysis';

interface AadhaarVaultBannerProps {
  language: WarningLanguage;
}

export const AadhaarVaultBanner: React.FC<AadhaarVaultBannerProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-indigo-950 to-navy-900 rounded-3xl p-5 sm:p-6 border border-indigo-800/60 shadow-lg text-white">
        {/* Ambient background blur */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Aadhaar Biometric Freeze Vault
                </h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-navy-950 animate-pulse">
                  NEW UNIQUE DEFENSE
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {language === 'gu'
                  ? 'ડિજિટલ અરેસ્ટ સ્કેમર્સ આધાર નંબર પર ડ્રગ્સ કે ગુનાનું નાટક કરે છે. એક ક્લિકમાં તમારા બાયોમેટ્રિક્સને UIDAI સ્તરે ફ્રીઝ કરીને 100% સુરક્ષિત બનો.'
                  : language === 'hi'
                  ? 'डिजिटल अरेस्ट स्कैमर्स आधार नंबर पर फर्जी केस की धमकी देते हैं। अपने बायोमेट्रिक्स को तुरंत फ्रीज करके पहचान चोरी रोकें।'
                  : 'Stops Digital Arrest extortion before scammers can intimidate you. Lock UIDAI biometrics client-side with Zero-Knowledge verification.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs shadow-lg transition-all active:scale-95 flex-shrink-0"
          >
            <span>Launch Freeze Vault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
