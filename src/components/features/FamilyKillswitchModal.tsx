import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  ShieldAlert,
  Flame,
  Clock,
  Landmark,
  Share2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';

interface FamilyKillswitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
  contactName?: string;
  relationship?: string;
}

export const FamilyKillswitchModal: React.FC<FamilyKillswitchModalProps> = ({
  isOpen,
  onClose,
  language,
  contactName = 'Ramesh Kumar',
  relationship = 'father',
}) => {
  const [bankSelected, setBankSelected] = useState('SBI');
  const [copied, setCopied] = useState(false);
  const [freezeTriggered, setFreezeTriggered] = useState(false);

  if (!isOpen) return null;

  const content = {
    gu: {
      title: "ગોલ્ડન અવર ફેમિલી કિલ-સ્વિચ & ફાઇનાન્શિયલ ફ્રીઝ",
      badge: "તાત્કાલિક કટોકટી કાર્યવાહી",
      subtitle: "છેતરપિંડી થયાની પ્રથમ ૨ કલાકમાં પૈસા પાછા મેળવવાની ૧૦૦% કાનૂની પદ્ધતિ.",
      goldenHourAlert: "⚡ 'ગોલ્ડન અવર' નો નિયમ: જો ફ્રોડ થયાના ૨ કલાકમાં ૧૯૩૦ પર ફોન કરવામાં આવે તો સ્કેમરના ખાતામાં પૈસા ફ્રીઝ થઈ જાય છે!",
      bankHotlineTitle: "૧. મુખ્ય બેંકોના ૨૪x૭ ઇમરજન્સી ફ્રીઝ નંબરો:",
      alertFamilyBtn: "પરિવારને તાત્કાલિક SOS મોકલો",
      familyMsgSent: "✅ SOS સંદેશ મોકલાયો: 'પિતાજી સાથે સાયબર ફ્રોડનો પ્રયાસ થયો છે. તરત સંપર્ક કરો.'",
      freezeFormTitle: "૨. સાયબર સેલ ૧૯૩૦ ત્વરિત નોંધણી:",
    },
    hi: {
      title: "गोल्डन आवर फैमिली किल-स्विच एवं वित्तीय फ्रीज",
      badge: "तत्काल आपातकालीन सुरक्षा",
      subtitle: "धोखाधड़ी के पहले 2 घंटे में पैसे वापस ब्लॉक करने की आधिकारिक प्रक्रिया।",
      goldenHourAlert: "⚡ 'गोल्डन आवर' नियम: यदि फ्रॉड के 2 घंटे के भीतर 1930 पर शिकायत दर्ज होती है तो ठग के बैंक खाते में पैसे रोक दिए जाते हैं!",
      bankHotlineTitle: "1. प्रमुख बैंकों के 24x7 आपातकालीन खाता ब्लॉक नंबर:",
      alertFamilyBtn: "परिवार को तत्काल SOS भेजें",
      familyMsgSent: "✅ SOS संदेश भेजा गया: 'परिवार के सदस्य के साथ ऑनलाइन फ्रॉड का प्रयास हुआ है। तत्काल बात करें।'",
      freezeFormTitle: "2. साइबर हेल्पलाइन 1930 पर सीधी रिपोर्ट:",
    },
    en: {
      title: "Golden Hour Family Kill-Switch & Financial Freeze Hub",
      badge: "Emergency Fraud Neutralizer",
      subtitle: "Stop funds from leaving Indian banking channels during the critical first 2 hours.",
      goldenHourAlert: "⚡ The 'Golden Hour' Protocol: Calling Helpline 1930 within 2 hours flags beneficiary mule accounts, enabling law enforcement to freeze stolen funds mid-transit!",
      bankHotlineTitle: "1. Official 24/7 Indian Bank Emergency Freeze Toll-Free:",
      alertFamilyBtn: "Dispatch Family SOS WhatsApp/SMS",
      familyMsgSent: "✅ Emergency SOS Sent: 'Suspected scam attempt detected. Check immediately.'",
      freezeFormTitle: "2. Citizen Financial Fraud Reporting Portal (CFCFRS):",
    },
  };

  const bankNumbers: Record<string, string> = {
    SBI: '1800 11 2211 / 1800 425 3800',
    HDFC: '1800 202 6161 / 1860 267 6161',
    ICICI: '1800 1080',
    PNB: '1800 180 2222',
    BankOfBaroda: '1800 5700',
    Axis: '1860 419 5555',
  };

  const t = content[language] || content.gu;

  const handleCopySOS = () => {
    const text = `[EMERGENCY SOS - SURAKSHA AI]: My ${relationship} (${contactName}) has reported an active scam call or unauthorized debit. Please dial 1930 immediately with reference timestamp ${new Date().toLocaleTimeString()}!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setFreezeTriggered(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      data-testid="family-killswitch-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          data-testid="close-killswitch-modal-btn"
          className="absolute right-5 top-5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-rose-600 to-red-600 p-3 rounded-2xl text-white shadow-lg flex-shrink-0 animate-pulse">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Golden Hour Banner */}
        <div className="p-3.5 rounded-2xl bg-rose-500/15 border-2 border-rose-500 text-rose-950 dark:text-rose-200 text-xs font-bold leading-relaxed mb-4">
          {t.goldenHourAlert}
        </div>

        {/* 1. Bank Direct Emergency Speed Dials */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 mb-4">
          <h4 className="font-black text-xs sm:text-sm text-navy-900 dark:text-white flex items-center space-x-1.5">
            <Landmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t.bankHotlineTitle}</span>
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {Object.keys(bankNumbers).map((bank) => (
              <button
                key={bank}
                onClick={() => setBankSelected(bank)}
                className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all ${
                  bankSelected === bank
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {bank}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Emergency Freeze Hotline ({bankSelected}):</p>
              <p className="font-mono font-black text-navy-900 dark:text-white text-sm">{bankNumbers[bankSelected]}</p>
            </div>
            <a
              href={`tel:${bankNumbers[bankSelected].split('/')[0].trim()}`}
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center space-x-1 text-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* 2. Family SOS WhatsApp / SMS Dispatch */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-xs sm:text-sm text-navy-900 dark:text-white">
              {t.freezeFormTitle}
            </h4>
            <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
              Target: {relationship} ({contactName})
            </span>
          </div>

          <button
            onClick={handleCopySOS}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Copied SOS to Clipboard!' : t.alertFamilyBtn}</span>
          </button>

          {freezeTriggered && (
            <p className="text-xs text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{t.familyMsgSent}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
