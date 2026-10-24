import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WarningLanguage } from '../../types/analysis';

interface UPIScamShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: WarningLanguage;
}

export const UPIScamShieldModal: React.FC<UPIScamShieldModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [upiInput, setUpiInput] = useState('');
  const [amountInput, setAmountInput] = useState('2000');
  const [isCollectRequest, setIsCollectRequest] = useState(true);
  const [analysisResult, setAnalysisResult] = useState<{
    risk: 'danger' | 'safe' | 'warning' | null;
    title: string;
    explanation: string;
  }>({
    risk: 'danger',
    title: 'UPI PIN Scam Alert!',
    explanation:
      'Entering your UPI PIN will DEDUCT money from your account, NOT credit it. Scammers send "Collect Requests" or QR codes claiming you won a cash prize.',
  });

  if (!isOpen) return null;

  const content = {
    gu: {
      title: "UPI રિવર્સ QR અને પેમેન્ટ સેફ્ટી શિલ્ડ",
      badge: "GenZ ડિજિટલ પેમેન્ટ પ્રોટેક્શન",
      subtitle: "Google Pay, PhonePe, Paytm પર પૈસા મેળવવા ક્યારેય UPI PIN નાખવો પડતો નથી.",
      goldenRule: "🛡️ સુવર્ણ નિયમ: UPI PIN માત્ર પૈસા મોકલવા માટે જ વપરાય છે, મેળવવા માટે કદી નહીં!",
      simulateTitle: "લાઇવ UPI રિક્વેસ્ટ તપાસો (Simulate & Inspect):",
      collectLabel: "સામેવાળો દાવો કરે છે કે: 'તમને પૈસા મળશે (Receive Money)'",
      checkBtn: "UPI રિક્વેસ્ટ સ્કેન કરો",
      dangerTitle: "🚨 100% છેતરપિંડી! આનાથી તમારા પૈસા કપાશે!",
      dangerDesc: "સ્કેમર્સ QR કોડ કે કલેક્ટ રિક્વેસ્ટ મોકલે છે અને કહે છે કે 'પૈસા લેવા માટે PIN નાખો'. PIN નાખતા જ તમારા ખાતામાંથી પૈસા સ્કેમર પાસે જતા રહેશે.",
      tips: [
        "ઓનલાઇન વસ્તુ વેચતી વખતે (OLX/Facebook) સ્કેમર્સ ક્યારેય એડવાન્સ QR થી પૈસા આપતા નથી.",
        "લકી ડ્રો કે ગેમિંગ કોઈન માટે UPI PIN માગવો એ ૧૦૦% સાયબર ક્રાઈમ છે.",
        "કોઈ પણ અજાણી 'Collect Request' સીધી Reject કરો.",
      ],
    },
    hi: {
      title: "UPI रिवर्स QR एवं पेमेंट सेफ्टी शील्ड",
      badge: "GenZ डिजिटल पेमेंट प्रोटेक्शन",
      subtitle: "Google Pay, PhonePe, Paytm पर पैसे प्राप्त करने के लिए कभी UPI PIN की जरूरत नहीं होती।",
      goldenRule: "🛡️ स्वर्णिम नियम: UPI PIN केवल पैसे भेजने (Debit) के लिए होता है, पाने (Credit) के लिए कभी नहीं!",
      simulateTitle: "लाइव UPI रिक्वेस्ट की जांच करें (Simulate & Inspect):",
      collectLabel: "कॉलर का दावा: 'आपको रिफंड या कैश प्राइज मिलेगा (Receive Money)'",
      checkBtn: "UPI रिक्वेस्ट स्कैन करें",
      dangerTitle: "🚨 100% फ्रॉड! इससे आपके पैसे कट जाएंगे!",
      dangerDesc: "ठग QR कोड या 'Collect Request' भेजकर कहते हैं कि 'पैसे पाने के लिए पिन डालें'। पिन डालते ही पैसे सीधे ठग के पास चले जाते हैं।",
      tips: [
        "OLX या मार्केटप्लेस पर सामान बेचते समय कोई भी खरीदार QR से एडवांस पैसे नहीं देता।",
        "गेमिंग रिवॉर्ड या कैशबैक के नाम पर पिन मांगना पूरी तरह गैरकानूनी है।",
        "किसी भी अनजान 'Collect Request' को तुरंत Reject करें।",
      ],
    },
    en: {
      title: "UPI Reverse QR & Payment Fraud Shield",
      badge: "GenZ Digital Payments Defense",
      subtitle: "Universal rule for GPay, PhonePe, and Paytm: Receiving money NEVER requires a UPI PIN.",
      goldenRule: "🛡️ Golden Rule: A UPI PIN is ONLY entered to SEND money, NEVER to receive money!",
      simulateTitle: "Inspect Suspicious UPI / QR Request:",
      collectLabel: "Caller claims: 'You will receive cashback/refund (Receive Money)'",
      checkBtn: "Analyze UPI Request",
      dangerTitle: "🚨 100% SCAM DETECTED! Your Money Will Be Deducted!",
      dangerDesc: "Scammers generate 'Collect Requests' or reverse QR codes falsely claiming you must enter your PIN to claim money. Entering your PIN authorizes an instant debit.",
      tips: [
        "Selling second-hand items on OLX/Instagram? Scammers send fake payment QR codes that debit your account.",
        "No lottery, gaming reward, or refund requires entering a UPI PIN.",
        "Always tap 'Decline' on unsolicited payment collect requests in PhonePe/Google Pay.",
      ],
    },
  };

  const t = content[language] || content.gu;

  const handleTest = () => {
    if (isCollectRequest) {
      setAnalysisResult({
        risk: 'danger',
        title: t.dangerTitle,
        explanation: t.dangerDesc,
      });
    } else {
      setAnalysisResult({
        risk: 'safe',
        title: 'Authentic Send Transaction',
        explanation: 'You are voluntarily sending money. Verify the merchant name and VPA before confirming.',
      });
    }
  };

  return (
    <div
      data-testid="upi-shield-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          data-testid="close-upi-modal-btn"
          className="absolute right-5 top-5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3.5 mb-4">
          <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg flex-shrink-0">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-black text-navy-900 dark:text-white">
                {t.title}
              </h3>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500 text-white animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t.badge}
            </p>
          </div>
        </div>

        {/* Golden Rule Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-400/80 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-extrabold mb-5 flex items-start space-x-2">
          <span>{t.goldenRule}</span>
        </div>

        {/* Interactive Payment Scanner Simulation */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 mb-5">
          <h4 className="font-black text-xs sm:text-sm text-navy-900 dark:text-white">
            {t.simulateTitle}
          </h4>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              UPI VPA / Handle / Request Link:
            </label>
            <input
              type="text"
              value={upiInput}
              onChange={(e) => setUpiInput(e.target.value)}
              placeholder="e.g. lucky_reward_claim@paytm, refund_support@okhdfcbank"
              className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="collectReq"
              checked={isCollectRequest}
              onChange={(e) => setIsCollectRequest(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
            />
            <label htmlFor="collectReq" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {t.collectLabel}
            </label>
          </div>

          <button
            onClick={handleTest}
            data-testid="inspect-upi-request-btn"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.checkBtn}</span>
          </button>
        </div>

        {/* Real-time Analysis Card */}
        {analysisResult.risk && (
          <div
            className={`p-4 rounded-2xl border-2 mb-5 ${
              analysisResult.risk === 'danger'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-center space-x-2 font-black text-sm mb-1">
              {analysisResult.risk === 'danger' ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              <span>{analysisResult.title}</span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">{analysisResult.explanation}</p>
          </div>
        )}

        {/* Protection Tips */}
        <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
          <h5 className="font-extrabold text-xs text-navy-900 dark:text-white uppercase tracking-wider">
            Quick UPI Safety Rules:
          </h5>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {t.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
