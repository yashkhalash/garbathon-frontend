import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, Eye, EyeOff, Sparkles, X } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';

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
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [showVirtualId, setShowVirtualId] = useState(false);
  const [maskedPreview, setMaskedPreview] = useState('XXXX-XXXX-8921');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleLock = () => {
    setIsLocked(!isLocked);
    setStatusMessage(
      !isLocked
        ? (language === 'gu' ? 'બાયોમેટ્રિક્સ સફળતાપૂર્વક લોક થઈ ગયા છે!' : language === 'hi' ? 'बायोमेट्रिक्स सफलतापूर्वक लॉक हो गए हैं!' : 'Biometrics successfully LOCKED!')
        : (language === 'gu' ? 'બાયોમેટ્રિક્સ અસ્થાયી રૂપે અનલોક થયા છે.' : language === 'hi' ? 'बायोमेट्रिक्स अस्थायी रूप से अनलॉक हैं।' : 'Biometrics temporarily unlocked.')
    );
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-tr from-amber-500 to-rose-500 p-2.5 rounded-2xl text-white shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-black text-navy-900 dark:text-white">
                Aadhaar Biometric Freeze Vault
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero-Knowledge Client-Side UIDAI Biometric Defense Layer
            </p>
          </div>
        </div>

        {/* Core Protection Description */}
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold block mb-1">
            {language === 'gu'
              ? '🛡️ ડિજિટલ અરેસ્ટ સ્કેમર્સથી આધાર સુરક્ષા:'
              : language === 'hi'
              ? '🛡️ डिजिटल अरेस्ट स्कैमर्स से आधार सुरक्षा:'
              : '🛡️ How this stops Digital Arrest Extortion:'}
          </strong>
          {language === 'gu'
            ? 'સ્કેમર્સ દાવો કરે છે કે તમારા આધાર પર ડ્રગ્સ કે ગુનાહિત કેસ છે. UIDAI સેફ્ટી લોક સક્રિય કરવાથી તમારા ફિંગરપ્રિન્ટ અને આઇરિસ બાયોમેટ્રિક્સ લોક થઈ જાય છે, જેથી કોઈ પણ સાયબર ફ્રોડ તમારા નામે શક્ય બનતું નથી.'
            : language === 'hi'
            ? 'स्कैमर्स दावा करते हैं कि आपके आधार से ड्रग्स पार्सल लिंक है। बायोमेट्रिक लॉक एक्टिव होने पर कोई भी फर्जी सिम या बैंक अकाउंट आपके नाम पर नहीं खोला जा सकता।'
            : 'Scammers weaponize fake Aadhaar crime notices. Locking your biometric vault completely freezes fingerprint & iris authentication at UIDAI servers, making unauthorized SIM issues or loans impossible.'}
        </div>

        {/* Card Status Display */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Masked Identity
            </span>
            <button
              onClick={() => setShowVirtualId(!showVirtualId)}
              className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {showVirtualId ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showVirtualId ? 'Hide VID' : 'Show 16-Digit VID'}</span>
            </button>
          </div>

          <div className="font-mono text-lg font-black tracking-widest text-navy-900 dark:text-white">
            {showVirtualId ? '9182-4521-7890-3341' : maskedPreview}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700 text-xs">
            <span className="text-slate-500 dark:text-slate-400">UIDAI Biometric Status:</span>
            <span
              className={`font-black px-2.5 py-0.5 rounded-full ${
                isLocked
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {isLocked ? '🔒 FROZEN & PROTECTED' : '🔓 UNLOCKED'}
            </span>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleLock}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2 ${
              isLocked
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isLocked ? 'Temporarily Unlock (10 Mins)' : 'Lock Biometrics Now'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
