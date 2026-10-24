import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  PhoneOff,
  ExternalLink,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';

interface DigitalLifeCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
}

export const DigitalLifeCertificateModal: React.FC<DigitalLifeCertificateModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [callerAskedOtp, setCallerAskedOtp] = useState(false);
  const [callerAskedApp, setCallerAskedApp] = useState(false);

  if (!isOpen) return null;

  const content = {
    gu: {
      title: "જીવન પ્રમાણપત્ર (Life Certificate) પેન્શન સેફ્ટી ગાર્ડ",
      badge: "વરિષ્ઠ પેન્શનર્સ વિશેષ સુરક્ષા",
      subtitle: "પેન્શન બંધ થવાની ધમકી આપી OTP કે સ્ક્રીન શેરિંગ કરાવતા સ્કેમર્સથી બચો.",
      warningNotice: "⚠️ સત્તાવાર નિયમ: ટ્રેઝરી કે બેંક પેન્શન અધિકારી ક્યારેય ફોન કરીને OTP કે રિમોટ એપ ડાઉનલોડ કરવાનું કહેતા નથી!",
      checklistTitle: "કોલરનું વેરિફિકેશન કરો (Is This Call Fake?):",
      askOtp: "૧. શું કોલ કરનાર આધાર OTP કે બેંક એકાઉન્ટ વિગત માગે છે?",
      askApp: "૨. શું કોલ કરનાર AnyDesk, TeamViewer કે કોઈ APK ઇન્સ્ટોલ કરવાનું કહે છે?",
      dangerResult: "🚨 આ ૧૦૦% સાયબર ક્રાઈમ સ્કેમ છે! તરત ફોન કાપી નાખો!",
      dangerDesc: "જીવન પ્રમાણપત્ર માત્ર સત્તાવાર Jeevan Pramaan Face App અથવા નજીકની પોસ્ટ ઓફિસના ડાકિયા દ્વારા જ સબમિટ થાય છે. કોઈ પણ સરકારી અધિકારી ફોન પર OTP માગતો નથી.",
      safeWaysTitle: "જીવન પ્રમાણપત્ર આપવાની ૨ સત્તાવાર અને સુરક્ષિત રીતો:",
      safeWays: [
        "પોસ્ટ ઓફિસ સેવા (Doorstep Banking): તમારા ઘરબેઠા ડાકિયા દ્વારા બાયોમેટ્રિક ફિંગરપ્રિન્ટથી સબમિટ કરાવો (માત્ર ₹૫૦ ફી).",
        "Jeevan Pramaan Face App: તમારા મોબાઈલ કેમેરાથી આધાર ફેસ ઓથેન્ટિકેશન દ્વારા ૫ મિનિટમાં જાતે સબમિટ કરો.",
      ],
    },
    hi: {
      title: "जीवन प्रमाण (Life Certificate) पेंशन सेफ्टी गार्ड",
      badge: "वरिष्ठ पेंशनभोगी विशेष सुरक्षा",
      subtitle: "पेंशन बंद होने की धमकी देकर OTP या ऐप डाउनलोड कराने वाले फर्जी कॉलों से बचाव।",
      warningNotice: "⚠️ आधिकारिक नियम: बैंक या पेंशन कोषागार अधिकारी कभी फोन पर OTP या रिमोट ऐप डाउनलोड करने को नहीं कहते!",
      checklistTitle: "कॉलर की सत्यता जांचें (Is This Call Fake?):",
      askOtp: "1. क्या फोन करने वाला आधार OTP या बैंक विवरण मांग रहा है?",
      askApp: "2. क्या फोन करने वाला AnyDesk, TeamViewer या कोई APK डाउनलोड करने को कह रहा है?",
      dangerResult: "🚨 यह 100% साइबर फ्रॉड है! तत्काल फोन काट दें!",
      dangerDesc: "जीवन प्रमाण पत्र केवल आधिकारिक 'Jeevan Pramaan Face App' या नजदीकी डाकघर के डाकिया (India Post Payments Bank) के माध्यम से जमा होता है। फोन पर OTP देना पेंशन खाता खाली करा सकता है।",
      safeWaysTitle: "जीवन प्रमाण पत्र जमा करने के 2 वैध और सुरक्षित तरीके:",
      safeWays: [
        "डाकघर डोरस्टेप सेवा (Doorstep Banking): डाकिया आपके घर आकर बायोमेट्रिक मशीन से प्रमाण पत्र जमा करेगा।",
        "Jeevan Pramaan Face App: प्ले स्टोर से सरकारी ऐप डाउनलोड कर चेहरे के स्कैन (Face RD) से स्वयं जमा करें।",
      ],
    },
    en: {
      title: "Jeevan Pramaan (Digital Life Certificate) Scam Guard",
      badge: "Senior Citizen Pension Defense",
      subtitle: "Thwarts extortion calls threatening pension cancellation to steal Aadhaar OTPs or screen access.",
      warningNotice: "⚠️ Official Government Rule: Treasury and bank officers NEVER call pensioners to demand OTPs or remote screen apps!",
      checklistTitle: "Evaluate Suspicious Pension Caller:",
      askOtp: "1. Did the caller demand an Aadhaar OTP or bank account number?",
      askApp: "2. Did the caller insist on downloading AnyDesk, TeamViewer, or an APK?",
      dangerResult: "🚨 CONFIRMED CYBER SCAM! HANG UP IMMEDIATELY!",
      dangerDesc: "Digital Life Certificates can only be submitted in person at bank/treasury branches, via India Post doorstep postmen, or using the official Jeevan Pramaan Face App. Phone verification is non-existent.",
      safeWaysTitle: "The 2 Authentic & Safe Ways to Submit Life Certificates:",
      safeWays: [
        "India Post Doorstep Banking: A certified postman visits your home and captures biometrics securely via IPPB.",
        "Official Jeevan Pramaan Face App: Download directly from jeevanpramaan.gov.in and complete face scan at home.",
      ],
    },
  };

  const t = content[language] || content.gu;
  const isScam = callerAskedOtp || callerAskedApp;

  return (
    <div
      data-testid="pension-guard-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          data-testid="close-pension-modal-btn"
          className="absolute right-5 top-5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-cyan-500 text-white animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Official Rule Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400 text-amber-950 dark:text-amber-200 text-xs font-bold leading-relaxed mb-4">
          {t.warningNotice}
        </div>

        {/* Interactive Checklist */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 mb-4">
          <h4 className="font-black text-xs sm:text-sm text-navy-900 dark:text-white">
            {t.checklistTitle}
          </h4>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={callerAskedOtp}
                onChange={(e) => setCallerAskedOtp(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600"
              />
              <span>{t.askOtp}</span>
            </label>

            <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={callerAskedApp}
                onChange={(e) => setCallerAskedApp(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600"
              />
              <span>{t.askApp}</span>
            </label>
          </div>

          {isScam && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-400 text-rose-900 dark:text-rose-200 rounded-xl space-y-1">
              <p className="font-black text-xs sm:text-sm flex items-center space-x-1.5 text-rose-700 dark:text-rose-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{t.dangerResult}</span>
              </p>
              <p className="text-xs leading-relaxed">{t.dangerDesc}</p>
            </div>
          )}
        </div>

        {/* 2 Safe Ways to Submit */}
        <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h5 className="font-extrabold text-xs text-navy-900 dark:text-white uppercase tracking-wider">
            {t.safeWaysTitle}
          </h5>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {t.safeWays.map((way, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{way}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
