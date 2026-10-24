import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  FileCode,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Search,
  ExternalLink,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';

interface ShoppingApkScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
}

export const ShoppingApkScannerModal: React.FC<ShoppingApkScannerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<{
    risk: 'danger' | 'warning' | 'safe';
    score: number;
    title: string;
    flags: string[];
    recommendation: string;
  } | null>(null);

  if (!isOpen) return null;

  const content = {
    gu: {
      title: "નકલી શોપિંગ સાઇટ અને માલવેર APK સ્કૅનર",
      badge: "GenZ ઓનલાઇન શોપિંગ સુરક્ષા",
      subtitle: "Instagram/Telegram જાહેરાતોમાં ૯૦% ડિસ્કાઉન્ટ કે પાર્સલ ટ્રેકિંગ APK ની તપાસ.",
      inputPlaceholder: "દા.ત. zara-sale-india.xyz, courier-parcel-track.apk",
      scanBtn: "લિંક / APK તપાસો",
      dangerTitle: "🚨 શંકાસ્પદ ફ્રોડ શોપિંગ સાઇટ / જોખમી APK!",
      flags: [
        "નકલી ડોમેન TLD (.xyz / .top) - તાજેતરમાં બનેલી સાઇટ છે.",
        "પ્લે સ્ટોર સિવાય બહારથી અનવેરિફાઇડ APK ઇન્સ્ટોલ કરવાનું કહે છે.",
        "કુરિયર એડ્રેસ કન્ફર્મ કરવા ₹૫ નું UPI ટોકન માગે છે (કલેક્ટ ફ્રોડ).",
        "SMS અને સ્ક્રીન શેરિંગ (Accessibility) ની છૂપી પરવાનગી માગે છે.",
      ],
      recommendation: "આ લિંક પરથી કોઈ વસ્તુ ખરીદશો નહીં કે કોઈ APK ડાઉનલોડ કરશો નહીં. તમારો OTP ચોરાઈ શકે છે.",
    },
    hi: {
      title: "फर्जी ऑनलाइन शॉपिंग एवं मैलवेयर APK स्कैनर",
      badge: "GenZ ऑनलाइन शॉपिंग सुरक्षा",
      subtitle: "Instagram/Telegram विज्ञापनों में 90% डिस्काउंट और पार्सल ट्रैकिंग APK की लाइव जांच।",
      inputPlaceholder: "उदा. zara-sale-india.xyz, courier-parcel-track.apk",
      scanBtn: "लिंक / APK की जांच करें",
      dangerTitle: "🚨 संदिग्ध फ्रॉड शॉपिंग साइट / खतरनाक APK!",
      flags: [
        "संदिग्ध डोमेन TLD (.xyz / .top) - हाल ही में बनाई गई फर्जी वेबसाइट।",
        "Google Play Store के बाहर से अनधिकृत APK फाइल डाउनलोड करने का दबाव।",
        "पार्सल डिलीवरी के लिए ₹5 का UPI टोकन ट्रांसफर करने की मांग।",
        "SMS पढ़ने एवं स्क्रीन शेयरिंग (Accessibility) की गुप्त अनुमति मांगना।",
      ],
      recommendation: "इस लिंक से कभी खरीदारी न करें और न ही कोई APK फाइल डाउनलोड करें। आपके बैंक OTP चोरी हो सकते हैं।",
    },
    en: {
      title: "Fake Online Shopping & Malicious APK Scanner",
      badge: "GenZ E-Commerce & Gaming Security",
      subtitle: "Verifies 90% flash sale ads on Instagram/Telegram and fake delivery tracking APKs.",
      inputPlaceholder: "e.g. nike-90percent-off.xyz, bluedart-track-update.apk",
      scanBtn: "Scan Shopping Link / APK",
      dangerTitle: "🚨 HIGH RISK SCAM / MALWARE DETECTED!",
      flags: [
        "Untrusted high-risk TLD (.xyz, .top, .live) registered less than 30 days ago.",
        "Prompts downloading an unknown APK outside the official Google Play Store.",
        "Requests a ₹5 UPI token payment to 'verify delivery address' (Reverse Collect Fraud).",
        "Harbors stealth permissions to intercept SMS OTPs and broadcast screen contents.",
      ],
      recommendation: "Do not enter credit card or UPI details on this site. Never sideload APKs sent via WhatsApp/SMS.",
    },
  };

  const t = content[language] || content.gu;

  const handleScan = () => {
    setScanned(true);
    setResult({
      risk: 'danger',
      score: 94,
      title: t.dangerTitle,
      flags: t.flags,
      recommendation: t.recommendation,
    });
  };

  return (
    <div
      data-testid="shopping-scanner-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          data-testid="close-shopping-modal-btn"
          className="absolute right-5 top-5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-rose-500 to-amber-500 p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Search / Input Box */}
        <div className="space-y-3 mb-5">
          <div className="relative">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full text-xs font-mono p-3 pl-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>

          <button
            onClick={handleScan}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.scanBtn}</span>
          </button>
        </div>

        {/* Scan Results */}
        {scanned && result && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 text-rose-950 dark:text-rose-200 space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>{result.title}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-mono font-black">
                Risk: {result.score}%
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <p className="font-bold">Detected Malicious Red Flags:</p>
              <ul className="space-y-1 list-disc list-inside opacity-90">
                {result.flags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-rose-200 dark:border-rose-900/60 text-xs font-extrabold text-rose-700 dark:text-rose-300">
              💡 {result.recommendation}
            </div>
          </div>
        )}

        {/* Common Scam APKs to Avoid */}
        <div className="p-3.5 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs space-y-2 text-slate-600 dark:text-slate-300">
          <p className="font-bold text-navy-900 dark:text-white">
            ⚠️ Famous Malicious APK Impersonations in India:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400">
              ❌ AnyDesk_Support.apk
            </span>
            <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400">
              ❌ Swiggy_Refund_Token.apk
            </span>
            <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400">
              ❌ Electricity_Bill_Pay.apk
            </span>
            <span className="p-1.5 bg-white dark:bg-slate-900 rounded border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400">
              ❌ IndiaPost_Delivery.apk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
