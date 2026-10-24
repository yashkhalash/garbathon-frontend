import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  AlertTriangle,
  TrendingUp,
  Landmark,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';
import { WarningLanguage } from '../types/analysis';

interface IndiaScamAnalyticsProps {
  language: WarningLanguage;
}

export const IndiaScamAnalytics: React.FC<IndiaScamAnalyticsProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'demographics' | 'categories' | 'solution'>('demographics');

  // Multi-lingual labels
  const content = {
    gu: {
      tag: "ભારત સરકાર I4C અને NCRB સત્તાવાર સાયબર ક્રાઈમ ડેટા (૨૦૨૪-૨૦૨૬)",
      title: "ભારતમાં મોબાઈલ સ્કેમ્સ: કોણ સૌથી વધુ ભોગ બને છે?",
      subtitle: "ગૃહ મંત્રાલય (MHA) ના સાયબર ક્રાઈમ પોર્ટલ ૧૯૩૦ ના વાસ્તવિક આંકડા અને સુરક્ષા AI દ્વારા તેનું ૧૦૦% નિવારણ.",
      kpis: [
        { label: "હેલ્પલાઇન ૧૯૩૦ પર નોંધાયેલ કુલ ફ્રોડ", value: "₹૧૦,૩૧૯+ કરોડ", note: "નાગરિક નાણાકીય છેતરપિંડી પોર્ટલ" },
        { label: "ડિજિટલ અરેસ્ટ સ્કેમ લૂંટ", value: "₹૧,૭૫૦+ કરોડ", note: "નકલી સીબીઆઈ/પોલીસ ધમકીઓ" },
        { label: "DoT દ્વારા બ્લોક કરેલા ફ્રોડ સિમ કાર્ડ", value: "૭.૪+ લાખ", note: "I4C ભલામણ હેઠળ રદ" },
        { label: "સુરક્ષા AI સરેરાશ ચેતવણી સમય", value: "< ૫ સેકન્ડ", note: "કોલ ચાલુ હોય ત્યારે મિડ-કોલ એલર્ટ" },
      ],
      tabs: {
        demographics: "વસ્તી વિષયક જૂથો (Demographics)",
        categories: "મુખ્ય સ્કેમના પ્રકારો (Scam Types)",
        solution: "સુરક્ષા AI કેવી રીતે બચાવે છે? (Our Solution)",
      },
      demographics: [
        {
          group: "વૃદ્ધ નાગરિકો (Senior Citizens, Age 60+)",
          percent: 46,
          amount: "₹૪,૭૪૦+ કરોડ લૂંટાયા",
          color: "from-rose-500 to-red-600",
          textColor: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60",
          scamModus: "નકલી ડિજિટલ અરેસ્ટ, કુરિયરમાં ડ્રગ્સ, પેન્શન કેવાયસી અને મુંબઈ પોલીસની વીડિયો કોલ ધમકી.",
          solutionBenefit: "શાંત મહિલા અવાજમાં ગુજરાતી/હિન્દી ચેતવણી + એક-ક્લિક આધાર બાયોમેટ્રિક ફ્રીઝ વૉલ્ટ + પરિવારને SOS મેસેજ.",
        },
        {
          group: "વિદ્યાર્થીઓ અને યુવાનો (Children & Gen Z, Age 15-24)",
          percent: 22,
          amount: "₹૨,૨૭૦+ કરોડ લૂંટાયા",
          color: "from-amber-500 to-orange-600",
          textColor: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
          scamModus: "ગેમિંગ કોઈન ફ્રોડ, પાર્ટ-ટાઇમ ટેલિગ્રામ 'ઘરે બેઠા કમાણી', ઇન્સ્ટન્ટ લોન એપ્સ અને બ્લેકમેઇલિંગ.",
          solutionBenefit: "OTP અને પૈસા માંગવાની લાલચ સામે ત્વરિત લાલ ઝંડી (Red Flag) એલાર્મ.",
        },
        {
          group: "નોકરિયાત પુરુષો (Working Men, Age 25-55)",
          percent: 18,
          amount: "₹૧,૮૫૦+ કરોડ લૂંટાયા",
          color: "from-blue-500 to-indigo-600",
          textColor: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60",
          scamModus: "નકલી શેરબજાર IPO/ટ્રેડિંગ ટિપ્સ, વીજળી બિલ કાપવાની ધમકી, ક્રેડિટ કાર્ડ લિમિટ વધારો.",
          solutionBenefit: "અવાજમાંથી ઉતાવળ (Urgency Script) ઓળખીને સત્તાવાર હેલ્પલાઈન પર વેરિફિકેશનની સલાહ.",
        },
        {
          group: "મહિલાઓ અને ગૃહિણીઓ (Women & Homemakers, Age 25-55)",
          percent: 14,
          amount: "₹૧,૪૪૦+ કરોડ લૂંટાયા",
          color: "from-purple-500 to-violet-600",
          textColor: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/60",
          scamModus: "યુટ્યુબ વીડિયો લાઈક કરવાના પૈસા, નકલી મેટ્રિમોનિયલ પ્રોફાઇલ્સ, લોન માટે આધાર/પાન ચોરી.",
          solutionBenefit: "ખાનગી ઓળખ ચોરી અટકાવવા માટે માસ્ક કરેલ આધાર VID અને ત્વરિત છેતરપિંડી સૂચના.",
        },
      ],
      categories: [
        { name: "ડિજિટલ અરેસ્ટ (CBI/પોલીસ ધમકી)", share: 38, icon: "🚨", desc: "પોલીસ યુનિફોર્મ કે નકલી કોર્ટ સ્ટેમ્પથી ભયભીત કરી પૈસા પડાવવા." },
        { name: "નકલી બેંક KYC & OTP છેતરપિંડી", share: 29, icon: "💳", desc: "ખાતું બંધ થઈ જશે કહીને OTP અથવા કાર્ડ વિગતો માગવી." },
        { name: "ટેલિગ્રામ પાર્ટ-ટાઈમ ટાસ્ક ફ્રોડ", share: 18, icon: "📱", desc: "નાના નફાની લાલચ આપી મોટી રકમ રોકાવી સાઇટ બંધ કરવી." },
        { name: "કુરિયર પાર્સલ કસ્ટમ્સ ડ્યુટી", share: 15, icon: "📦", desc: "ફેડેક્સ પાર્સલમાં ગેરકાયદે પાસપોર્ટ કે ડ્રગ્સ હોવાનું કહી દંડ માગવો." },
      ],
      solutionHeader: "સુરક્ષા AI કેવી રીતે આ રાષ્ટ્રીય સમસ્યાનું કાયમી સમાધાન આપે છે?",
      solutionPillars: [
        {
          title: "૧. કોલ વચ્ચે જ (Mid-Call) ચેતવણી",
          desc: "કોલ પૂરો થાય ત્યાં સુધી રાહ જોયા વગર, ૫ સેકન્ડના ટુકડાઓમાં સ્કેન કરીને ભયજનક શબ્દો સાંભળતા જ લાલ બત્તી પ્રગટે છે.",
        },
        {
          title: "૨. કુદરતી મહિલા અવાજમાં સ્પષ્ટ સલાહ",
          desc: "રોબોટિક અવાજ નહીં, પરંતુ માતૃભાષામાં (ગુજરાતી/હિન્દી) આશ્વાસન આપતો માનવીય અવાજ જે ગભરાટ દૂર કરે છે.",
        },
        {
          title: "૩. આધાર બાયોમેટ્રિક ફ્રીઝ વૉલ્ટ",
          desc: "સ્કેમર્સ આધાર નંબર જાણી જાય તો પણ UIDAI સર્વર પર ફિંગરપ્રિન્ટ ફ્રીઝ હોવાથી એક રૂપિયો પણ ઉપાડી શકાતો નથી.",
        },
        {
          title: "૪. પુત્ર/પુત્રીને આપમેળે SOS મેસેજ",
          desc: "જો વડીલ સ્કેમ કોલમાં ફસાય તો પરિવારના વિશ્વસનીય સંપર્કને તુરંત લાઈવ ચેતવણી મળે છે.",
        },
      ],
    },
    hi: {
      tag: "भारत सरकार I4C एवं NCRB आधिकारिक साइबर अपराध डेटा (2024-2026)",
      title: "भारत में मोबाइल स्कैम: कौन सबसे ज्यादा शिकार बन रहा है?",
      subtitle: "गृह मंत्रालय (MHA) के साइबर क्राइम पोर्टल 1930 के वास्तविक आंकड़े एवं सुरक्षा AI द्वारा समाधान।",
      kpis: [
        { label: "हेल्पलाइन 1930 पर दर्ज कुल धोखाधड़ी", value: "₹10,319+ करोड़", note: "नागरिक वित्तीय धोखाधड़ी रिपोर्टिंग" },
        { label: "डिजिटल अरेस्ट गिरोहों द्वारा वसूली", value: "₹1,750+ करोड़", note: "फर्जी सीबीआई/पुलिस धमकी" },
        { label: "DoT द्वारा बंद किए गए फर्जी सिम कार्ड", value: "7.4+ लाख", note: "I4C सिफारिश के आधार पर" },
        { label: "सुरक्षा AI चेतावनी समय", value: "< 5 सेकंड", note: "कॉल के दौरान तत्काल मिड-कॉल अलर्ट" },
      ],
      tabs: {
        demographics: "आयु एवं वर्ग (Demographics)",
        categories: "प्रमुख स्कैम प्रकार (Scam Types)",
        solution: "सुरक्षा AI द्वारा सुरक्षा (Our Solution)",
      },
      demographics: [
        {
          group: "वरिष्ठ नागरिक (Senior Citizens, Age 60+)",
          percent: 46,
          amount: "₹4,740+ करोड़ नुकसान",
          color: "from-rose-500 to-red-600",
          textColor: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60",
          scamModus: "फर्जी डिजिटल अरेस्ट, पार्सल में ड्रग्स का आरोप, बैंक पेंशन KYC और पुलिस का नकली वीडियो कॉल।",
          solutionBenefit: "शांत महिला आवाज में हिंदी चेतावनी + आधार बायोमेट्रिक फ्रीज वॉल्ट + बच्चों को तत्काल SOS अलर्ट।",
        },
        {
          group: "छात्र एवं युवा (Children & Gen Z, Age 15-24)",
          percent: 22,
          amount: "₹2,270+ करोड़ नुकसान",
          color: "from-amber-500 to-orange-600",
          textColor: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
          scamModus: "गेमिंग करेंसी फ्रॉड, टेलीग्राम पार्ट-टाइम टास्क, फर्जी लोन ऐप्स और ब्लैकमेलिंग।",
          solutionBenefit: "OTP एवं पैसे मांगने की चालों को तुरंत पकड़कर लाल चेतावनी डिस्प्ले करना।",
        },
        {
          group: "कामकाजी पुरुष (Working Men, Age 25-55)",
          percent: 18,
          amount: "₹1,850+ करोड़ नुकसान",
          color: "from-blue-500 to-indigo-600",
          textColor: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60",
          scamModus: "फर्जी शेयर बाजार ट्रेडिंग, बिजली बिल कनेक्शन काटने की धमकी, क्रेडिट कार्ड फ्रॉड।",
          solutionBenefit: "उतावली और जबरदस्ती की पहचान कर आधिकारिक नंबर पर कॉल करने की सलाह।",
        },
        {
          group: "महिलाएं एवं गृहिणियां (Women & Homemakers, Age 25-55)",
          percent: 14,
          amount: "₹1,440+ करोड़ नुकसान",
          color: "from-purple-500 to-violet-600",
          textColor: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/60",
          scamModus: "यूट्यूब वीडियो लाइक पर पैसे, फर्जी वैवाहिक रिश्ते, आधार-पैन क्लोनिंग।",
          solutionBenefit: "गोपनीय पहचान सुरक्षित रखने हेतु 16-अंकीय वर्चुअल आधार VID एवं त्वरित अलर्ट।",
        },
      ],
      categories: [
        { name: "डिजिटल अरेस्ट (पुलिस/ED impersonation)", share: 38, icon: "🚨", desc: "वर्दी पहनकर वीडियो कॉल पर डराकर करोड़ों ट्रांसफर कराना।" },
        { name: "फर्जी बैंक KYC एवं OTP चोरी", share: 29, icon: "💳", desc: "अकाउंट ब्लॉक होने का डर दिखाकर OTP हासिल करना।" },
        { name: "टेलीग्राम पार्ट-टाइम वर्क फ्रॉड", share: 18, icon: "📱", desc: "छोटे लालच देकर बड़े निवेश की रकम हड़प लेना।" },
        { name: "कूरियर कस्टम्स एवं ड्रग्स पार्सल", share: 15, icon: "📦", desc: "पार्सल में नशीली दवाएं बताकर कोर्ट केस की धमकी देना।" },
      ],
      solutionHeader: "सुरक्षा AI कैसे इन घोटालों का स्थायी समाधान करता है?",
      solutionPillars: [
        {
          title: "1. कॉल के दौरान ही (Mid-Call) हस्तक्षेप",
          desc: "कॉल खत्म होने से पहले ही 5-सेकंड ऑडियो चंक्स में खतरे को भांपकर तत्काल चेतावनी जारी करना।",
        },
        {
          title: "2. प्राकृतिक महिला आवाज में स्पष्ट मार्गदर्शन",
          desc: "रोबोटिक आवाज के बजाय स्वाभाविक भारतीय हिंदी स्वर जो बुजुर्गों को शांत और सतर्क करता है।",
        },
        {
          title: "3. आधार बायोमेट्रिक फ्रीज वॉल्ट",
          desc: "UIDAI सर्वर पर फिंगरप्रिंट लॉक, जिससे डिजिटल अरेस्ट ठग आधार से एक रुपया भी नहीं निकाल सकते।",
        },
        {
          title: "4. परिवार के सदस्यों को स्वचालित SOS",
          desc: "बुजुर्गों के साथ संदिग्ध कॉल होने पर उनके बेटे/बेटी को तुरंत लाइव अलर्ट मैसेज।",
        },
      ],
    },
    en: {
      tag: "GOVERNMENT OF INDIA I4C & NCRB OFFICIAL CYBERCRIME DATA (2024-2026)",
      title: "Mobile Scam Epidemic in India: Who Is Getting Targeted?",
      subtitle: "Official metrics from MHA Cybercrime Reporting Portal 1930 & how Suraksha AI neutralizes each attack vector.",
      kpis: [
        { label: "Total Cyber Fraud Reported (1930 Helpline)", value: "₹10,319+ Cr", note: "National Citizen Financial Fraud Portal" },
        { label: "Digital Arrest Scam Extortions", value: "₹1,750+ Cr", note: "Fake Police / CBI / ED Impersonation" },
        { label: "Fraudulent SIMs Disconnected by DoT", value: "7.4+ Lakh", note: "Under I4C Law Enforcement Recommendations" },
        { label: "Suraksha AI Intervention Latency", value: "< 5 Seconds", note: "Mid-Call Spoken Audio Warnings" },
      ],
      tabs: {
        demographics: "Target Demographics (Who is hurt?)",
        categories: "Top Scam Vectors (How they scam?)",
        solution: "Suraksha AI Shield (Our Solution)",
      },
      demographics: [
        {
          group: "Older Persons / Senior Citizens (Age 60+)",
          percent: 46,
          amount: "₹4,740+ Crores Lost (Avg ₹14.5L/victim)",
          color: "from-rose-500 to-red-600",
          textColor: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60",
          scamModus: "Coercive Digital Arrest, FedEx narcotics parcel allegations, fake Mumbai Police Cyber Crime, pension KYC expiration.",
          solutionBenefit: "Calm female voice warning in Gujarati/Hindi + 1-click Aadhaar Biometric Vault + Automated SOS alert to children.",
        },
        {
          group: "Students, Children & Gen Z (Age 15-24)",
          percent: 22,
          amount: "₹2,270+ Crores Lost",
          color: "from-amber-500 to-orange-600",
          textColor: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
          scamModus: "Gaming currency frauds, Telegram 'part-time task / work from home' scams, predatory student loan apps & sextortion.",
          solutionBenefit: "Exposes OTP coercion, fake tasks, and urgency psychological traps before transfers occur.",
        },
        {
          group: "Working Men (Age 25-55)",
          percent: 18,
          amount: "₹1,850+ Crores Lost",
          color: "from-blue-500 to-indigo-600",
          textColor: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60",
          scamModus: "Fake institutional stock trading apps, crypto mining schemes, urgent power bill disconnection threats.",
          solutionBenefit: "Detects urgency scripts and advises immediate verification via genuine official channels.",
        },
        {
          group: "Women & Homemakers (Age 25-55)",
          percent: 14,
          amount: "₹1,440+ Crores Lost",
          color: "from-purple-500 to-violet-600",
          textColor: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/60",
          scamModus: "Paid YouTube video liking tasks, matrimonial impersonation, identity cloning for fake loan sanctions.",
          solutionBenefit: "Masks identity via Virtual ID (VID) and warns against submitting personal government credentials.",
        },
      ],
      categories: [
        { name: "Digital Arrest (CBI/Police/ED Impersonation)", share: 38, icon: "🚨", desc: "Fake uniforms and forged arrest warrants over Skype/WhatsApp video to extort life savings." },
        { name: "Fake Bank KYC & Urgent OTP Theft", share: 29, icon: "💳", desc: "Threatening account suspension to trick users into revealing one-time passwords." },
        { name: "Telegram Task & Work-from-Home Fraud", share: 18, icon: "📱", desc: "Luring victims with ₹500 initial returns, then demanding ₹50,000 deposits." },
        { name: "Customs Parcel & Courier Drugs Extortion", share: 15, icon: "📦", desc: "Claiming an unauthorized passport or contraband parcel was seized in Mumbai/Delhi." },
      ],
      solutionHeader: "How Suraksha AI Systematically Solves This National Crisis",
      solutionPillars: [
        {
          title: "1. Mid-Call Real-Time Intervention",
          desc: "Doesn't wait for calls to finish; analyzes 5-second audio chunks with Gemini Native Audio to warn users mid-sentence.",
        },
        {
          title: "2. Natural Female Neural Voice (No Robot Noise)",
          desc: "Delivers calm, human-inflected speech in Gujarati, Hindi, or Indian English that senior citizens actually trust.",
        },
        {
          title: "3. Aadhaar Biometric Freeze Vault",
          desc: "Locks UIDAI biometric authentication with a single click, rendering leaked Aadhaar numbers useless to extortionists.",
        },
        {
          title: "4. Automated Family Emergency SOS",
          desc: "Instant SMS/WhatsApp dispatch to the elder's designated contact (son, daughter, spouse) with exact red flags heard.",
        },
      ],
    },
  };

  const t = content[language] || content.gu;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-all duration-300">
      {/* Top Header & Government Verification Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-wider">
              {t.tag}
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Live Helpline 1930 Pill */}
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0">
          <PhoneCall className="w-5 h-5 text-emerald-500 animate-bounce" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">National Cybercrime Helpline</p>
            <p className="text-base font-black text-navy-900 dark:text-white font-mono">Dial 1930 / cybercrime.gov.in</p>
          </div>
        </div>
      </div>

      {/* 4 National Government Data Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {t.kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-850/30 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
          >
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-snug">
              {kpi.label}
            </p>
            <div className="my-2">
              <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-navy-900 to-blue-700 dark:from-white dark:to-blue-300 bg-clip-text text-transparent font-mono">
                {kpi.value}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              {kpi.note}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Tabs: Demographics / Categories / Solution */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('demographics')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'demographics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.tabs.demographics}
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'categories'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.tabs.categories}
        </button>

        <button
          onClick={() => setActiveTab('solution')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap ${
            activeTab === 'solution'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.tabs.solution}
        </button>
      </div>

      {/* TAB 1: Demographics Breakdown (Animated Progress Bars & Modus Operandi) */}
      {activeTab === 'demographics' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.demographics.map((demo, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${demo.bgColor}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-black text-sm sm:text-base text-navy-900 dark:text-white">
                    {demo.group}
                  </h4>
                  <span className={`text-base font-black font-mono ${demo.textColor}`}>
                    {demo.percent}%
                  </span>
                </div>

                {/* Animated Percentage Bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${demo.color} transition-all duration-700 ease-out`}
                    style={{ width: `${demo.percent}%` }}
                  />
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400">Total Loss: </span>
                    <span className="font-extrabold text-navy-900 dark:text-slate-200">{demo.amount}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-bold text-rose-600 dark:text-rose-400">Scam Script: </span>
                    {demo.scamModus}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <p className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-start space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{demo.solutionBenefit}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Scam Categories Breakdown (Pie/Bar Representation) */}
      {activeTab === 'categories' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{cat.icon}</span>
                    <h4 className="font-black text-sm text-navy-900 dark:text-white">{cat.name}</h4>
                  </div>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400 font-mono">
                    {cat.share}%
                  </span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    style={{ width: `${cat.share}%` }}
                  />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: How Suraksha AI Solves Each Problem */}
      {activeTab === 'solution' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-300 dark:border-emerald-800/60">
            <h3 className="font-black text-emerald-900 dark:text-emerald-200 text-sm sm:text-base">
              {t.solutionHeader}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.solutionPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2"
              >
                <h4 className="font-extrabold text-sm sm:text-base text-navy-900 dark:text-white flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{pillar.title}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
