import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  Landmark,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';

interface SeniorInvestmentShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
}

export const SeniorInvestmentShieldModal: React.FC<SeniorInvestmentShieldModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [monthlyReturn, setMonthlyReturn] = useState<number>(20);
  const [schemeName, setSchemeName] = useState<string>('Institutional VIP Stock Group');

  if (!isOpen) return null;

  const content = {
    gu: {
      title: "વરિષ્ઠ નાગરિક પેન્શન & રોકાણ છેતરપિંડી શિલ્ડ",
      badge: "સીનિયર સિટિઝન ઇન્વેસ્ટમેન્ટ પ્રોટેક્શન",
      subtitle: "WhatsApp/Telegram પર ૧૦% થી ૫૦% માસિક વળતર આપવાના દાવા કરતા નકલી ટ્રેડિંગ ગ્રુપોની તપાસ.",
      calcTitle: "ગેરંટીડ રિટર્ન રિયાલિટી ચેકર (Ponzi Calculator):",
      monthlyLabel: "સામેવાળો મહિને કેટલા % વળતર આપવાનો દાવો કરે છે?",
      calcResultDanger: "🚨 ૧૦૦% પોન્ઝી સ્કેમ (અશક્ય વળતર)!",
      calcResultDesc: "વારંવાર % વળતરનું વચન આપવું એ સેબી (SEBI) નિયમ મુજબ ગેરકાયદેસર છે. શેરબજાર કે બેંક FD માં ક્યારેય નિશ્ચિત માસિક મોટું વળતર શક્ય નથી. આ સ્કેમર્સ તમારી આખી જિંદગીની પેન્શન બચત લૂંટી લેશે.",
      sebiRulesTitle: "SEBI અધિકૃત રોકાણના ૪ સુવર્ણ નિયમો:",
      rules: [
        "કોઈ પણ અધિકૃત બ્રોકર ક્યારેય અંગત બચત ખાતા (Individual Savings Account) માં પૈસા ટ્રાન્સફર કરાવતો નથી.",
        "WhatsApp કે Telegram પર કોઈ સંસ્થાકીય (FII/VIP) ખાતું ખોલવામાં આવતું નથી.",
        "સેબીમાં નોંધાયેલા વાસ્તવિક સ્ટોક બ્રોકર્સ ક્યારેય '૧૦૦% ગેરેન્ટેડ નફો' આપતા નથી.",
        "શંકાસ્પદ સ્કીમની સીધી ફરિયાદ scores.sebi.gov.in પોર્ટલ પર કરો.",
      ],
    },
    hi: {
      title: "वरिष्ठ नागरिक पेंशन एवं निवेश धोखाधड़ी शील्ड",
      badge: "सीनियर सिटीजन निवेश सुरक्षा",
      subtitle: "WhatsApp/Telegram पर 20% से 50% मासिक रिटर्न का दावा करने वाले फर्जी ट्रेडिंग ग्रुपों की जांच।",
      calcTitle: "गारंटीड रिटर्न पोंजी कैलकुलेटर (Ponzi Reality Check):",
      monthlyLabel: "कॉलर/ग्रुप हर महीने कितने % मुनाफे का दावा कर रहा है?",
      calcResultDanger: "🚨 100% पोंजी घोटाला (गणितीय रूप से असंभव)!",
      calcResultDesc: "शेयर बाजार या म्यूचुअल फंड में निश्चित मासिक रिटर्न का दावा करना SEBI नियमों के तहत अवैध है। ठग शुरुआत में फर्जी डैशबोर्ड पर मुनाफा दिखाते हैं और जब आप पैसे निकालने जाते हैं तो 30% 'टैक्स' मांगकर गायब हो जाते हैं।",
      sebiRulesTitle: "SEBI एवं सुरक्षित निवेश के 4 स्वर्णिम नियम:",
      rules: [
        "कोई भी पंजीकृत ब्रोकर कभी किसी व्यक्ति के निजी बैंक खाते में पैसे जमा नहीं करवाता।",
        "WhatsApp या Telegram ग्रुप पर कोई Institutional/FII डीमैट खाता नहीं खुलता।",
        "सेबी में रजिस्टर्ड वास्तविक सलाहकार कभी 'गारंटीड मुनाफे' का वादा नहीं करते।",
        "धोखाधड़ी होने पर तत्काल 1930 एवं scores.sebi.gov.in पर रिपोर्ट दर्ज करें।",
      ],
    },
    en: {
      title: "Senior Pension & High-Yield Investment Fraud Shield",
      badge: "Retiree & Senior Wealth Protection",
      subtitle: "Unmasks fake WhatsApp/Telegram institutional trading groups promising 20%-50% monthly returns.",
      calcTitle: "Guaranteed Return Reality Checker (Ponzi Detector):",
      monthlyLabel: "Promised Monthly Return Percentage:",
      calcResultDanger: "🚨 100% MATHEMATICALLY IMPOSSIBLE (PONZI SCHEME)!",
      calcResultDesc: "Promising guaranteed stock market returns is strictly illegal under SEBI regulations. Scammers show fake trading app balances, then freeze withdrawals demanding a 30% 'release tax', wiping out your retirement corpus.",
      sebiRulesTitle: "4 Non-Negotiable SEBI Safety Rules for Seniors:",
      rules: [
        "Authentic brokers NEVER ask you to deposit money into individual third-party bank accounts.",
        "No authentic SEBI broker operates secret 'Institutional FII VIP Groups' on WhatsApp/Telegram.",
        "Legitimate mutual funds and equities NEVER offer guaranteed monthly fixed yields.",
        "Verify broker registration status directly on sebi.gov.in before transferring any money.",
      ],
    },
  };

  const t = content[language] || content.gu;
  const isSuspicious = monthlyReturn >= 2;

  return (
    <div
      data-testid="senior-investment-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          data-testid="close-investment-modal-btn"
          className="absolute right-5 top-5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Ponzi Calculator Box */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 mb-5">
          <div className="flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-black text-xs sm:text-sm text-navy-900 dark:text-white">
              {t.calcTitle}
            </h4>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
              <span>{t.monthlyLabel}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">{monthlyReturn}% / Month (~{monthlyReturn * 12}% Annual)</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={monthlyReturn}
              onChange={(e) => setMonthlyReturn(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Assessment Result */}
          {isSuspicious ? (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 rounded-xl space-y-1 text-rose-950 dark:text-rose-200">
              <div className="font-black text-xs sm:text-sm flex items-center space-x-1.5 text-rose-700 dark:text-rose-300">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{t.calcResultDanger}</span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{t.calcResultDesc}</p>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Standard bank fixed deposit range (6% - 8% annual). Verify official bank branch.</span>
            </div>
          )}
        </div>

        {/* SEBI Safety Rules */}
        <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h5 className="font-extrabold text-xs text-navy-900 dark:text-white uppercase tracking-wider">
            {t.sebiRulesTitle}
          </h5>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {t.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
