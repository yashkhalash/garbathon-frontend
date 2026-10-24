import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Mic,
  MicOff,
  AlertCircle,
  Radio,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Volume2,
  RotateCcw,
  Sparkles,
  Zap,
  Play,
  Square,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Flame,
} from 'lucide-react';
import { WarningLanguage, RedFlag, RiskLevel, ScamCategory, SpamClassification } from '../types/analysis';
import { WarningPanel } from '../components/WarningPanel';
import { RedFlagCard } from '../components/RedFlagCard';
import { RiskAssessmentCard } from '../components/RiskAssessmentCard';
import { speechWarningService } from '../services/speechWarningService';
import { soundManager } from '../utils/soundManager';
import { saveAnalysisSummary } from '../services/firebase';
import { TRANSLATIONS } from '../utils/translations';

interface LiveAudioProps {
  language: WarningLanguage;
  isDemoMode: boolean;
}

interface TestScenario {
  id: string;
  badge: string;
  title: string;
  category: ScamCategory;
  tier: SpamClassification;
  riskScore: number;
  riskLevel: RiskLevel;
  script: Record<WarningLanguage, string>;
  warning: Record<WarningLanguage, string>;
  summary: Record<WarningLanguage, string>;
  redFlags: Record<WarningLanguage, RedFlag[]>;
}

const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'scenario_digital_arrest',
    badge: '🚨 ૧-ક્લિક ટેસ્ટ ૧: ડિજિટલ અરેસ્ટ',
    title: 'Digital Arrest & Police Extortion',
    category: 'DIGITAL_ARREST',
    tier: 'definite_spam',
    riskScore: 98,
    riskLevel: 'critical',
    script: {
      gu: 'હું મુંબઈ પોલીસ સાયબર સેલમાંથી ઈન્સ્પેક્ટર બોલું છું. તમારા આધાર નંબર પર ફેડેક્સ પાર્સલ પકડાયું છે જેમાં પ્રતિબંધિત ડ્રગ્સ મળ્યા છે. તમે ડિજિટલ અરેસ્ટ હેઠળ છો, ફોન કાપશો નહીં. તાત્કાલિક ₹૫૦,૦૦૦ સરકારી ખાતામાં ટ્રાન્સફર કરો નહીંતર ધરપકડ થશે.',
      hi: 'मैं मुंबई पुलिस साइबर सेल से इंस्पेक्टर बोल रहा हूँ। आपके आधार नंबर पर एक पार्सल में गैरकानूनी ड्रग्स मिले हैं। आप डिजिटल अरेस्ट में हैं, फोन मत काटिए। तुरंत ₹50,000 ट्रांसफर कीजिए वरना जेल होगी।',
      en: 'This is Inspector from Mumbai Police Cyber Cell. A courier parcel registered to your Aadhaar contains illegal narcotics. You are under immediate Digital Arrest. Do not hang up. Transfer ₹50,000 penalty immediately or face arrest.',
    },
    warning: {
      gu: 'સાવધાન! આ કોલમાં છેતરપિંડીનાં ગંભીર સંકેતો છે. કોલ કરનાર પોલીસ હોવાનો દાવો કરે છે અને ડ્રગ્સનો ડર બતાવી ₹૫૦,૦૦૦ માંગે છે. ફોન તાત્કાલિક કાપી નાખો.',
      hi: 'सावधान! इस कॉल में गंभीर धोखाधड़ी के संकेत हैं। कॉल करने वाला पुलिस बनकर ₹50,000 की अवैध मांग कर रहा है। कॉल तुरंत काट दें।',
      en: 'Warning: Severe scam detected. Caller is impersonating police and demanding ₹50,000 extortion under fake Digital Arrest. Disconnect immediately.',
    },
    summary: {
      gu: 'નકલી મુંબઈ સાયબર પોલીસ, આધાર પર ડ્રગ્સ આરોપ, ગેરકાયદેસર ડિજિટલ અરેસ્ટ અને ₹૫૦,૦૦૦ નું એક્સ્ટોર્શન ડિટેક્ટ થયું.',
      hi: 'फर्जी मुंबई साइबर पुलिस, आधार पर ड्रग्स आरोप, अवैध डिजिटल अरेस्ट और ₹50,000 की जबरन वसूली पहचानी गई।',
      en: 'Critical threat: Law enforcement impersonation, counterfeit narcotics allegations, and illegal ₹50,000 digital arrest extortion.',
    },
    redFlags: {
      gu: [
        {
          id: 'flag_da_1',
          category: 'AUTHORITY_IMPERSONATION',
          evidence: 'મુંબઈ પોલીસ સાયબર સેલમાંથી ઈન્સ્પેક્ટર',
          timestamp_seconds: 1.2,
          severity: 'critical',
          reason: 'ભારતીય પોલીસ ક્યારેય સામાન્ય ફોન કૉલ પર તપાસ કે ધરપકડની ધમકી આપતી નથી.',
          recommended_action: 'કોઈપણ પોલીસ હોવાનો દાવો કરતા કૉલને ૧૯૩૦ પર ચકાસો.',
        },
        {
          id: 'flag_da_2',
          category: 'COURIER_FRAUD',
          evidence: 'આધાર નંબર પર પાર્સલમાં ડ્રગ્સ પકડાયા',
          timestamp_seconds: 3.5,
          severity: 'critical',
          reason: 'ફેડેક્સ કે કુરિયરમાં ગેરકાયદે ડ્રગ્સ હોવાનો ડર બતાવી ગભરાવવાની યુક્તિ.',
          recommended_action: 'ડર્યા વગર કૉલ ડિસ્કનેક્ટ કરો.',
        },
        {
          id: 'flag_da_3',
          category: 'DIGITAL_ARREST',
          evidence: 'તમે ડિજિટલ અરેસ્ટ હેઠળ છો, ફોન કાપશો નહીં',
          timestamp_seconds: 5.8,
          severity: 'critical',
          reason: 'ભારતીય કાયદામાં "ડિજિટલ અરેસ્ટ" નામનો કોઈ નિયમ નથી. આ ૧૦૦% સ્કેમ છે.',
          recommended_action: 'તરત જ કૉલ કટ કરો.',
        },
        {
          id: 'flag_da_4',
          category: 'PAYMENT_FRAUD',
          evidence: 'તાત્કાલિક ₹૫૦,૦૦૦ સરકારી ખાતામાં ટ્રાન્સફર કરો',
          timestamp_seconds: 8.0,
          severity: 'critical',
          reason: 'પોલીસ કે કોર્ટ ક્યારેય પૈસા ટ્રાન્સફર કરવા માટે કહેતી નથી.',
          recommended_action: 'એક પણ રૂપિયો ટ્રાન્સફર કરશો નહીં.',
        },
      ],
      hi: [
        {
          id: 'flag_da_1_hi',
          category: 'AUTHORITY_IMPERSONATION',
          evidence: 'मुंबई पुलिस साइबर सेल से इंस्पेक्टर बोल रहा हूँ',
          timestamp_seconds: 1.2,
          severity: 'critical',
          reason: 'असली पुलिस कभी फोन पर पूछताछ या गिरफ्तारी नहीं करती।',
          recommended_action: '1930 साइबर हेल्पलाइन पर रिपोर्ट करें।',
        },
        {
          id: 'flag_da_2_hi',
          category: 'DIGITAL_ARREST',
          evidence: 'आप डिजिटल अरेस्ट में हैं, फोन मत काटिए',
          timestamp_seconds: 4.5,
          severity: 'critical',
          reason: 'भारत के कानून में डिजिटल अरेस्ट जैसी कोई व्यवस्था नहीं है।',
          recommended_action: 'कॉल तुरंत काट दें।',
        },
        {
          id: 'flag_da_3_hi',
          category: 'PAYMENT_FRAUD',
          evidence: 'तुरंत ₹50,000 ट्रांसफर कीजिए वरना जेल होगी',
          timestamp_seconds: 7.2,
          severity: 'critical',
          reason: 'सरकारी जांच एजेंसी कभी ऑनलाइन पैसे की मांग नहीं करती।',
          recommended_action: 'कोई पैसा न भेजें।',
        },
      ],
      en: [
        {
          id: 'flag_da_1_en',
          category: 'AUTHORITY_IMPERSONATION',
          evidence: 'Mumbai Police Cyber Cell inspector claim',
          timestamp_seconds: 1.2,
          severity: 'critical',
          reason: 'Law enforcement does not conduct official inquiries or arrests via voice calls.',
          recommended_action: 'Verify caller directly via 1930 Cyber Helpline.',
        },
        {
          id: 'flag_da_2_en',
          category: 'DIGITAL_ARREST',
          evidence: 'You are under immediate Digital Arrest',
          timestamp_seconds: 4.5,
          severity: 'critical',
          reason: 'Digital Arrest does not exist in Indian legal frameworks. It is complete extortion.',
          recommended_action: 'Disconnect call immediately.',
        },
        {
          id: 'flag_da_3_en',
          category: 'PAYMENT_FRAUD',
          evidence: 'Transfer ₹50,000 penalty immediately',
          timestamp_seconds: 7.2,
          severity: 'critical',
          reason: 'Police or judicial bodies never demand direct digital fund transfers.',
          recommended_action: 'Transfer zero funds.',
        },
      ],
    },
  },
  {
    id: 'scenario_bank_otp',
    badge: '⚠️ ૧-ક્લિક ટેસ્ટ ૨: બેંક કેવાયસી & OTP',
    title: 'Bank KYC Freeze & OTP Theft',
    category: 'OTP_FRAUD',
    tier: 'definite_spam',
    riskScore: 88,
    riskLevel: 'high',
    script: {
      gu: 'નમસ્તે, હું SBI બેંક હેડ ઓફિસમાંથી બોલું છું. તમારું એકાઉન્ટ અને એટીએમ કાર્ડ KYC ન હોવાથી આજે રાત્રે બ્લોક થઈ જશે. એકાઉન્ટ ચાલુ રાખવા હમણાં જ મોબાઈલ પર આવેલો ૬-અંકનો OTP જણાવો.',
      hi: 'नमस्ते, मैं SBI बैंक हेड ऑफिस से बोल रहा हूँ। आपका बैंक खाता और डेबिट कार्ड आज रात ब्लॉक कर दिया जाएगा। अकाउंट चालू रखने के लिए आपके फोन पर आया 6 अंकों का OTP शेयर करें।',
      en: 'Hello, this is SBI bank verification officer. Your bank account and ATM card will be permanently blocked tonight due to missing KYC. Please share the 6-digit verification OTP received on your mobile.',
    },
    warning: {
      gu: 'સાવધાન! આ કોલમાં બેંક ફ્રોડ અને OTP ચોરીના સંકેતો છે. બેંક ક્યારેય ફોન પર OTP કે પાસવર્ડ માંગતી નથી. OTP આપશો નહીં.',
      hi: 'सावधान! इस कॉल में बैंक फ्रॉड और OTP चोरी के संकेत हैं। बैंक कभी फोन पर OTP नहीं मांगता। OTP साझा न करें।',
      en: 'Warning: Phishing attempt detected. Banks never solicit OTP or card details over phone calls. Never disclose OTP.',
    },
    summary: {
      gu: 'SBI બેંકના નામે ખાતું બ્લોક કરવાની ધમકી આપીને અનધિકૃત રીતે ગુપ્ત OTP મેળવવાની યુક્તિ પકડાઈ.',
      hi: 'बैंक खाता ब्लॉक करने की झूठी धमकी देकर अनधिकृत OTP हासिल करने का प्रयास पकड़ा गया।',
      en: 'Bank impersonation attempting credential theft via fake account suspension threat and OTP extraction.',
    },
    redFlags: {
      gu: [
        {
          id: 'flag_otp_1',
          category: 'BANK_KYC_FRAUD',
          evidence: 'તમારું એકાઉન્ટ અને એટીએમ કાર્ડ આજે રાત્રે બ્લોક થઈ જશે',
          timestamp_seconds: 2.0,
          severity: 'high',
          reason: 'કૃત્રિમ ભય ઊભો કરીને ગ્રાહકને વિચારવાનો સમય ન આપવાની પદ્ધતિ.',
          recommended_action: 'બેંક બ્રાન્ચની રૂબરૂ મુલાકાત લઈને જ ખાતરી કરો.',
        },
        {
          id: 'flag_otp_2',
          category: 'OTP_FRAUD',
          evidence: 'મોબાઈલ પર આવેલો ૬-અંકનો OTP જણાવો',
          timestamp_seconds: 5.5,
          severity: 'critical',
          reason: 'OTP શેર કરવાથી બેંક ખાતામાંથી તમામ રકમ કપાઈ શકે છે.',
          recommended_action: 'કોઈપણ સંજોગોમાં OTP ક્યારેય શેર કરશો નહીં.',
        },
      ],
      hi: [
        {
          id: 'flag_otp_1_hi',
          category: 'OTP_FRAUD',
          evidence: 'आपके फोन पर आया 6 अंकों का OTP शेयर करें',
          timestamp_seconds: 3.5,
          severity: 'critical',
          reason: 'बैंक कभी फोन पर गुप्त OTP नहीं मांगता।',
          recommended_action: 'OTP किसी से साझा न करें।',
        },
      ],
      en: [
        {
          id: 'flag_otp_1_en',
          category: 'OTP_FRAUD',
          evidence: 'Please share the 6-digit verification OTP',
          timestamp_seconds: 3.5,
          severity: 'critical',
          reason: 'Sharing OTP allows attackers to siphon all bank funds instantly.',
          recommended_action: 'Never disclose OTP or PIN.',
        },
      ],
    },
  },
  {
    id: 'scenario_safe_delivery',
    badge: '🟢 ૧-ક્લિક ટેસ્ટ ૩: સેફ ડિલિવરી કોલ',
    title: 'Safe Swiggy Delivery Partner',
    category: 'BENIGN_OR_UNCLEAR',
    tier: 'no_spam',
    riskScore: 6,
    riskLevel: 'safe',
    script: {
      gu: 'નમસ્તે સર, હું સ્વિગી ફૂડ ડિલિવરી બોય છું. તમારી સોસાયટીના ગેટ નંબર ૨ પર ઊભો છું, ઓર્ડર કયા ફ્લેટમાં પહોંચાડવાનો છે?',
      hi: 'नमस्ते सर, मैं स्विगी डिलीवरी बॉय बोल रहा हूँ। मैं आपकी सोसाइटी के गेट नंबर 2 पर खड़ा हूँ। ऑर्डर किस फ्लैट में देना है?',
      en: 'Hello sir, this is your Swiggy food delivery partner. I am waiting at Gate number 2 of your society. Which flat should I deliver to?',
    },
    warning: {
      gu: 'કોલ સંપૂર્ણ સુરક્ષિત છે. કોઈ શંકાસ્પદ બાબત નથી.',
      hi: 'कॉल पूरी तरह सुरक्षित है। कोई खतरा नहीं है।',
      en: 'Call is verified safe and routine.',
    },
    summary: {
      gu: 'સામાન્ય ફૂડ ડિલિવરી કોલ. શૂન્ય જોખમ. કોઈ ધમકી, પૈસા કે OTP ની માંગણી નથી.',
      hi: 'सामान्य डिलीवरी कॉल। शून्य जोखिम। कोई धोखाधड़ी नहीं पाई गई।',
      en: 'Routine food delivery verification. Zero threats, zero credentials or money requested.',
    },
    redFlags: {
      gu: [],
      hi: [],
      en: [],
    },
  },
];

export const LiveAudio: React.FC<LiveAudioProps> = ({ language, isDemoMode }) => {
  const t = TRANSLATIONS[language]?.liveAudio || TRANSLATIONS.gu.liveAudio;

  // Recording & stream states
  const [isRecording, setIsRecording] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [frequencyBars, setFrequencyBars] = useState<number[]>(new Array(16).fill(10));
  const [speechApiSupported, setSpeechApiSupported] = useState<boolean>(true);

  // Live transcript states
  const [transcript, setTranscript] = useState<string>('');
  const [interimText, setInterimText] = useState<string>('');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [simulationTimer, setSimulationTimer] = useState<any>(null);

  // Analysis Result States
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('safe');
  const [riskScore, setRiskScore] = useState<number>(0);
  const [spamTier, setSpamTier] = useState<SpamClassification>('no_spam');
  const [summary, setSummary] = useState<string>(t.readyStatus);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [warningText, setWarningText] = useState(
    language === 'gu'
      ? 'સાવધાન! આ કોલમાં છેતરપિંડીનાં સંકેતો છે.'
      : language === 'hi'
      ? 'सावधान! इस कॉल में धोखाधड़ी के संकेत हैं।'
      : 'Warning! Potential scam indicators detected in call.'
  );
  const [recommendedActions, setRecommendedActions] = useState<string[]>([
    'Hang up immediately if under threat.',
    'Never share OTP or banking passwords.',
    'Verify caller credentials through official channels (1930).',
  ]);

  // Audio Context & Web Speech Refs
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  isRecordingRef.current = isRecording;

  const lastAlertScoreRef = useRef<number>(0);

  const playWarningBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // ignore
    }
  };

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSpeechApiSupported(!!SpeechRecognitionClass);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLiveMic();
    };
  }, []);

  /**
   * Evaluates text recognized from microphone or simulation
   */
  const evaluateSpeechText = useCallback(
    async (rawText: string) => {
      if (!rawText.trim()) return;

      const lower = rawText.toLowerCase();

      // Check keywords for Digital Arrest & Police Coercion
      const isDigitalArrest =
        lower.includes('police') ||
        lower.includes('પોલીસ') ||
        lower.includes('पुलिस') ||
        lower.includes('cyber') ||
        lower.includes('સાયબર') ||
        lower.includes('साइबर') ||
        lower.includes('arrest') ||
        lower.includes('અરેસ્ટ') ||
        lower.includes('अरेस्ट') ||
        lower.includes('drugs') ||
        lower.includes('ડ્રગ્સ') ||
        lower.includes('ड्रग्स') ||
        lower.includes('parcel') ||
        lower.includes('પાર્સલ') ||
        lower.includes('पार्सल') ||
        lower.includes('50,000') ||
        lower.includes('50000') ||
        lower.includes('૫૦,૦૦૦') ||
        lower.includes('૫૦૦૦૦') ||
        lower.includes('cbi') ||
        lower.includes('સીબીઆઈ') ||
        lower.includes('ધરપકડ') ||
        lower.includes('ગેરકાયદે') ||
        lower.includes('extortion');

      // Check keywords for Bank KYC & OTP Fraud
      const isBankOtp =
        lower.includes('otp') ||
        lower.includes('ઓટીપી') ||
        lower.includes('ओटीपी') ||
        lower.includes('kyc') ||
        lower.includes('કેવાયસી') ||
        lower.includes('केवाईसी') ||
        lower.includes('block') ||
        lower.includes('બ્લોક') ||
        lower.includes('બ્લોક') ||
        lower.includes('खाता ब्लॉक') ||
        lower.includes('ખાતું બ્લોક') ||
        lower.includes('freeze') ||
        lower.includes('atm') ||
        lower.includes('password') ||
        lower.includes('પાસવર્ડ') ||
        lower.includes('पासवर्ड') ||
        lower.includes('sbi');

      // Check keywords for Unsolicited Loan Phishing
      const isLoanPhish =
        lower.includes('loan') ||
        lower.includes('લોન') ||
        lower.includes('लोन') ||
        lower.includes('pan card') ||
        lower.includes('પાન કાર્ડ') ||
        lower.includes('पैन कार्ड') ||
        lower.includes('pre-approved') ||
        lower.includes('પ્રી-એપ્રૂવ્ડ');

      // Check keywords for Safe delivery
      const isSafeDelivery =
        lower.includes('swiggy') ||
        lower.includes('સ્વિગી') ||
        lower.includes('स्विगी') ||
        lower.includes('zomato') ||
        lower.includes('ઝોમેટો') ||
        lower.includes('delivery') ||
        lower.includes('ડિલિવરી') ||
        lower.includes('gate') ||
        lower.includes('ગેટ');

      let newRiskScore = 0;
      let newRiskLevel: RiskLevel = 'safe';
      let newTier: SpamClassification = 'no_spam';
      let newSummary = '';
      let newWarningText = '';
      const newFlags: RedFlag[] = [];
      let shouldTriggerAlert = false;

      if (isDigitalArrest) {
        newRiskScore = 98;
        newRiskLevel = 'critical';
        newTier = 'definite_spam';
        shouldTriggerAlert = true;

        newSummary =
          language === 'gu'
            ? 'નકલી મુંબઈ પોલીસ, આધાર પાર્સલમાં ડ્રગ્સ અને ગેરકાયદેસર ડિજિટલ અરેસ્ટ એક્સ્ટોર્શન ડિટેક્ટ થયું.'
            : language === 'hi'
            ? 'फर्जी पुलिस, आधार पर ड्रग्स का आरोप और अवैध डिजिटल अरेस्ट की जबरन वसूली पकड़ी गई।'
            : 'Severe extortion detected: Police impersonation, illegal narcotics claim, and digital arrest threats.';

        newWarningText =
          language === 'gu'
            ? 'સાવધાન! આ કોલમાં છેતરપિંડીનાં ગંભીર સંકેતો છે. કોલ કરનાર પોલીસ હોવાનો દાવો કરે છે અને ડ્રગ્સનો ડર બતાવી ₹૫૦,૦૦૦ માંગે છે. ફોન તાત્કાલિક કાપી નાખો.'
            : language === 'hi'
            ? 'सावधान! इस कॉल में गंभीर धोखाधड़ी के संकेत हैं। कॉल करने वाला पुलिस बनकर ₹50,000 की मांग कर रहा है। कॉल तुरंत काट दें।'
            : 'Warning: Severe scam detected. Caller is impersonating police and demanding ₹50,000 extortion under fake Digital Arrest. Disconnect immediately.';

        newFlags.push(
          {
            id: `live_da_1_${Date.now()}`,
            category: 'AUTHORITY_IMPERSONATION',
            evidence: rawText.slice(0, 70),
            timestamp_seconds: 1.5,
            severity: 'critical',
            reason: 'Law enforcement never conducts arrests or interrogations over casual phone calls.',
            recommended_action: 'Disconnect immediately and verify directly via 1930 Cyber helpline.',
          },
          {
            id: `live_da_2_${Date.now()}`,
            category: 'DIGITAL_ARREST',
            evidence: 'ડિજિટલ અરેસ્ટ / Digital Arrest threat',
            timestamp_seconds: 3.5,
            severity: 'critical',
            reason: 'Indian law recognizes no concept of "digital arrest". This is 100% fraud.',
            recommended_action: 'Hang up without hesitation.',
          },
          {
            id: `live_da_3_${Date.now()}`,
            category: 'PAYMENT_FRAUD',
            evidence: '₹૫૦,૦૦૦ ટ્રાન્સફર / Transfer ₹50,000 demand',
            timestamp_seconds: 5.8,
            severity: 'critical',
            reason: 'Police or judicial authorities never demand bank transfers to clear cases.',
            recommended_action: 'Transfer zero funds.',
          }
        );
      } else if (isBankOtp) {
        newRiskScore = 88;
        newRiskLevel = 'high';
        newTier = 'definite_spam';
        shouldTriggerAlert = true;

        newSummary =
          language === 'gu'
            ? 'બેંક ખાતું બ્લોક કરવાની ધમકી આપીને અનધિકૃત રીતે ગુપ્ત OTP માંગવાનો પ્રયાસ ડિટેક્ટ થયો.'
            : language === 'hi'
            ? 'बैंक खाता ब्लॉक करने की धमकी देकर अनधिकृत OTP हासिल करने का प्रयास पकड़ा गया।'
            : 'Bank impersonation attempting credential theft via fake account block threat and OTP extraction.';

        newWarningText =
          language === 'gu'
            ? 'સાવધાન! આ કોલમાં બેંક ફ્રોડ અને OTP ચોરીના સંકેતો છે. બેંક ક્યારેય ફોન પર OTP કે પાસવર્ડ માંગતી નથી. OTP આપશો નહીં.'
            : language === 'hi'
            ? 'सावधान! इस कॉल में बैंक फ्रॉड और OTP चोरी के संकेत हैं। बैंक कभी फोन पर OTP नहीं मांगता। OTP साझा न करें।'
            : 'Warning: Phishing attempt detected. Banks never solicit OTP or card details over phone calls. Never disclose OTP.';

        newFlags.push(
          {
            id: `live_otp_1_${Date.now()}`,
            category: 'BANK_KYC_FRAUD',
            evidence: rawText.slice(0, 60),
            timestamp_seconds: 2.0,
            severity: 'high',
            reason: 'False account freeze urgency designed to rush user into bypassing verification.',
            recommended_action: 'Visit your authorized bank branch in person.',
          },
          {
            id: `live_otp_2_${Date.now()}`,
            category: 'OTP_FRAUD',
            evidence: 'ઓટીપી જણાવો / Share OTP request',
            timestamp_seconds: 4.2,
            severity: 'critical',
            reason: 'Sharing OTP allows attackers to siphon all bank funds instantly.',
            recommended_action: 'Never disclose OTP to anyone.',
          }
        );
      } else if (isLoanPhish) {
        newRiskScore = 58;
        newRiskLevel = 'suspicious';
        newTier = 'partially_spam';
        shouldTriggerAlert = true;

        newSummary =
          language === 'gu'
            ? 'અજાણ્યા કોલર દ્વારા પ્રી-એપ્રુવ્ડ લોનની ઉતાવળ બતાવીને સંવેદનશીલ દસ્તાવેજો માંગવાની શંકા.'
            : language === 'hi'
            ? 'अवांछित कॉल द्वारा लोन की जल्दबाजी दिखाकर संवेदनशील दस्तावेज मांगने का प्रयास।'
            : 'Unsolicited loan telemarketing attempting to harvest sensitive credentials under artificial urgency.';

        newWarningText =
          language === 'gu'
            ? 'ધ્યાન આપો: આ શંકાસ્પદ લોન કોલ છે. ઉતાવળમાં તમારો PAN નંબર કે જન્મતારીખ શેર કરશો નહીં.'
            : language === 'hi'
            ? 'ध्यान दें: यह संदिग्ध अनचाहा लोन कॉल है। जल्दबाजी में अपना PAN नंबर साझा न करें।'
            : 'Caution: Unsolicited telemarketing push. Do not share PAN card or identity documents.';

        newFlags.push({
          id: `live_loan_1_${Date.now()}`,
          category: 'SOCIAL_ENGINEERING',
          evidence: rawText.slice(0, 60),
          timestamp_seconds: 2.5,
          severity: 'medium',
          reason: 'Unsolicited caller asking for sensitive personal credentials.',
          recommended_action: 'Do not rush. Apply directly through official banking apps.',
        });
      } else if (isSafeDelivery) {
        newRiskScore = 6;
        newRiskLevel = 'safe';
        newTier = 'no_spam';
        shouldTriggerAlert = false;

        newSummary =
          language === 'gu'
            ? 'સામાન્ય ફૂડ ડિલિવરી કોલ. શૂન્ય જોખમ. કોઈ ધમકી, પૈસા કે OTP ની માંગણી નથી.'
            : language === 'hi'
            ? 'सामान्य डिलीवरी कॉल। शून्य जोखिम। कोई धोखाधड़ी नहीं पाई गई।'
            : 'Routine food delivery verification. Zero threats, zero credentials or money requested.';

        newWarningText =
          language === 'gu'
            ? 'કોલ સંપૂર્ણ સુરક્ષિત છે. કોઈ શંકાસ્પદ બાબત નથી.'
            : language === 'hi'
            ? 'कॉल पूरी तरह सुरक्षित है।'
            : 'Call is verified safe and routine.';
      } else {
        // Default ambient speech heard
        newRiskScore = 0;
        newRiskLevel = 'safe';
        newTier = 'no_spam';
        newSummary =
          language === 'gu'
            ? `વાતચીત સ્કેન થઈ રહી છે: "${rawText.slice(-40)}..." કોઈ શંકાસ્પદ શબ્દો મળ્યા નથી.`
            : language === 'hi'
            ? `बातचीत स्कैन हो रही है: "${rawText.slice(-40)}..." कोई खतरा नहीं मिला।`
            : `Scanning speech: "${rawText.slice(-40)}..." No scam indicators detected yet.`;
      }

      setRiskScore(newRiskScore);
      setRiskLevel(newRiskLevel);
      setSpamTier(newTier);
      setSummary(newSummary);
      if (newFlags.length > 0) {
        setRedFlags(newFlags);
      }
      setWarningText(newWarningText);
      setShouldWarn(shouldTriggerAlert);

      // Play spoken voice warning if high risk and not triggered yet
      if (shouldTriggerAlert && newRiskScore >= 70 && lastAlertScoreRef.current < 70) {
        lastAlertScoreRef.current = newRiskScore;
        playWarningBeep();
        speechWarningService.speak(newWarningText, language);

        // Auto-save this incident to History & Logs
        saveAnalysisSummary({
          timestamp: Date.now(),
          callTitle: `Live Mic Session: ${newRiskScore >= 90 ? 'Digital Arrest Extortion' : 'OTP Phishing Attempt'}`,
          callerTag: 'Live Microphone Interception',
          spamTier: newTier,
          durationSeconds: 12,
          riskLevel: newRiskLevel,
          riskScore: newRiskScore,
          verdictLabel: newRiskScore >= 90 ? '🔴 ગંભીર છેતરપિંડી (Live Extortion)' : '🟡 શંકાસ્પદ કૉલ (Live Phishing)',
          summary: newSummary,
          redFlagCount: newFlags.length,
          categories: newFlags.map((f) => f.category),
          redFlagsList: newFlags.map((f) => ({
            category: f.category,
            evidence: f.evidence,
            reason: f.reason,
            severity: f.severity,
          })),
          recommendedAction:
            language === 'gu'
              ? 'કૉલ તરત જ કાપી નાખો. ૧૯૩૦ પર સાયબર સેલમાં ફરિયાદ કરો.'
              : 'Hang up immediately and report to 1930.',
          warningText: newWarningText,
          language: language,
        });
      }

      // Try server-side Gemini text evaluation if backend is reachable and text is rich
      if (!isDemoMode && rawText.length > 15) {
        try {
          const resp = await fetch('/api/analyze-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: rawText,
              language: language,
            }),
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data.risk_score !== undefined && data.risk_score > 0) {
              setRiskScore(data.risk_score);
              setRiskLevel(data.risk_level);
              setSummary(data.summary);
              if (data.red_flags && data.red_flags.length > 0) {
                setRedFlags(data.red_flags);
              }
              if (data.warning_text) {
                setWarningText(data.warning_text);
              }
              if (data.should_warn) {
                setShouldWarn(true);
              }
            }
          }
        } catch {
          // Keep reliable client-side heuristic evaluation
        }
      }
    },
    [language, isDemoMode]
  );

  /**
   * Starts Real Live Microphone with Web Audio Visualizer + Speech Recognition
   */
  const startLiveMic = async () => {
    setErrorMessage(null);
    setActiveScenarioId(null);
    if (simulationTimer) {
      clearInterval(simulationTimer);
      setSimulationTimer(null);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setMicPermissionGranted(true);
      setIsRecording(true);
      setSummary(t.listeningStatus);

      // 1. Setup Web Audio API Volume & Frequency Visualizer
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateMeter = () => {
            if (!isRecordingRef.current) return;
            analyser.getByteFrequencyData(dataArray);

            // Compute volume
            let sum = 0;
            const bars: number[] = [];
            const step = Math.floor(dataArray.length / 16) || 1;
            for (let i = 0; i < 16; i++) {
              const val = dataArray[i * step] || 0;
              bars.push(Math.max(12, Math.round((val / 255) * 100)));
              sum += val;
            }
            const avg = Math.round(sum / dataArray.length);
            setAudioVolume(Math.min(100, Math.round((avg / 128) * 100)));
            setFrequencyBars(bars);

            animationFrameRef.current = requestAnimationFrame(updateMeter);
          };
          updateMeter();
        }
      } catch (audioErr) {
        console.warn("Web Audio API visualizer warning:", audioErr);
      }

      // 2. Setup Continuous Web Speech Recognition
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognitionClass) {
        const recognition = new SpeechRecognitionClass();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language === 'gu' ? 'gu-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          let currentInterim = '';
          let finalTranscriptPiece = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const res = event.results[i];
            if (res.isFinal) {
              finalTranscriptPiece += res[0].transcript + ' ';
            } else {
              currentInterim += res[0].transcript;
            }
          }

          setInterimText(currentInterim);
          if (finalTranscriptPiece) {
            setTranscript((prev) => {
              const updated = (prev + ' ' + finalTranscriptPiece).trim();
              evaluateSpeechText(updated);
              return updated;
            });
          } else if (currentInterim) {
            evaluateSpeechText(currentInterim);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          if (event.error === 'not-allowed') {
            setErrorMessage(t.micDenied);
          }
        };

        recognition.onend = () => {
          // Auto restart if still recording
          if (isRecordingRef.current) {
            try {
              recognition.start();
            } catch {
              // Ignore restart glitch
            }
          }
        };

        try {
          recognition.start();
        } catch (e) {
          console.warn("Could not start SpeechRecognition:", e);
        }
      }
    } catch (err: unknown) {
      console.error("Microphone access error:", err);
      setErrorMessage(t.micDenied);
      setIsRecording(false);
    }
  };

  /**
   * Stops Real Live Microphone and visualizers
   */
  const stopLiveMic = () => {
    setIsRecording(false);
    setAudioVolume(0);
    setFrequencyBars(new Array(16).fill(10));

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (simulationTimer) {
      clearInterval(simulationTimer);
      setSimulationTimer(null);
    }

    setSummary(t.readyStatus);
  };

  /**
   * Runs a 1-Click Test Scenario to simulate live microphone input
   */
  const runTestScenario = (scenario: TestScenario) => {
    // Stop any existing mic or simulation
    stopLiveMic();
    setActiveScenarioId(scenario.id);
    setIsRecording(true);
    setSummary(t.listeningStatus);
    lastAlertScoreRef.current = 0;

    const fullScript = scenario.script[language] || scenario.script.gu;
    const words = fullScript.split(' ');
    let currentIdx = 0;
    setTranscript('');
    setInterimText('');

    // Animate audio frequency bars to mimic real voice input
    const timer = setInterval(() => {
      if (currentIdx < words.length) {
        const slice = words.slice(0, currentIdx + 3).join(' ');
        currentIdx += 3;
        setTranscript(slice);

        // Fake volume bars jump
        const simulatedBars = Array.from({ length: 16 }, () =>
          Math.floor(Math.random() * 65) + 25
        );
        setFrequencyBars(simulatedBars);
        setAudioVolume(Math.floor(Math.random() * 45) + 40);

        // Incremental threat evaluation
        evaluateSpeechText(slice);
      } else {
        clearInterval(timer);
        setSimulationTimer(null);
        setFrequencyBars(new Array(16).fill(10));
        setAudioVolume(0);

        // Apply final scenario state
        setRiskScore(scenario.riskScore);
        setRiskLevel(scenario.riskLevel);
        setSpamTier(scenario.tier);
        setSummary(scenario.summary[language] || scenario.summary.gu);
        setRedFlags(scenario.redFlags[language] || scenario.redFlags.gu);
        setWarningText(scenario.warning[language] || scenario.warning.gu);
        setShouldWarn(scenario.riskScore >= 70);

        if (scenario.riskScore >= 70) {
          playWarningBeep();
          speechWarningService.speak(
            scenario.warning[language] || scenario.warning.gu,
            language
          );
        }
      }
    }, 450);

    setSimulationTimer(timer);
  };

  /**
   * Resets session to clean state
   */
  const handleResetSession = () => {
    stopLiveMic();
    setActiveScenarioId(null);
    setTranscript('');
    setInterimText('');
    setRiskScore(0);
    setRiskLevel('safe');
    setSpamTier('no_spam');
    setSummary(t.readyStatus);
    setRedFlags([]);
    setShouldWarn(false);
    lastAlertScoreRef.current = 0;
    speechWarningService.stop();
  };

  return (
    <div className="space-y-6">
      {/* Important Disclaimer Notice */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl p-4 flex items-start space-x-3 text-xs text-blue-900 dark:text-blue-200">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">{t.noticeTitle} </strong>
          {t.noticeDesc}
          {!speechApiSupported && (
            <div className="mt-2 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
              💡 સૂચના: આ બ્રાઉઝરમાં વેબ સ્પીચ રેકગ્નિશન મર્યાદિત છે. તમે નીચે આપેલા ૧-ક્લિક ટેસ્ટ સિમ્યુલેશન અથવા ઝડપી ટેસ્ટ કીવર્ડ્સ દ્વારા સંપૂર્ણ લાઈવ સ્કેનિંગ ચકાસી શકો છો.
            </div>
          )}
        </div>
      </div>

      {/* Spoken Warning Panel (Mid-Call Siren Alert) */}
      {shouldWarn && (
        <WarningPanel
          warningText={warningText}
          language={language}
          shouldWarn={shouldWarn}
          recommendedActions={recommendedActions}
          riskScore={riskScore}
          relationship="family"
          contactName="Emergency Guardian"
        />
      )}

      {/* Main Microphone Control Console */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center transition-colors">
        <div className="max-w-2xl mx-auto">
          {/* Live Audio Visualizer Equalizer */}
          <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 h-14 mb-4">
            {frequencyBars.map((height, idx) => (
              <div
                key={idx}
                className={`w-2 sm:w-2.5 rounded-full transition-all duration-100 ${
                  isRecording
                    ? riskScore >= 70
                      ? 'bg-gradient-to-t from-red-600 to-rose-400'
                      : riskScore >= 40
                      ? 'bg-gradient-to-t from-amber-500 to-yellow-300'
                      : 'bg-gradient-to-t from-emerald-600 to-teal-400'
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          {/* Microphone Main Action Button */}
          <button
            onClick={isRecording ? stopLiveMic : startLiveMic}
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all cursor-pointer ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-8 ring-red-100 dark:ring-red-900/50 shadow-xl'
                : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:scale-105 active:scale-95'
            }`}
            title={isRecording ? t.stopBtn : t.startBtn}
          >
            {isRecording ? <Square className="w-9 h-9 fill-current" /> : <Mic className="w-10 h-10" />}
          </button>

          {/* Status Header */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-400'
              }`}
            />
            <h2 className="text-xl font-extrabold text-navy-900 dark:text-white">
              {isRecording ? t.listeningStatus : t.title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
            {t.subtitle}
          </p>

          {/* Primary Buttons Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!isRecording ? (
              <button
                onClick={startLiveMic}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center space-x-2 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
                <span>{t.startBtn}</span>
              </button>
            ) : (
              <button
                onClick={stopLiveMic}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center space-x-2 cursor-pointer"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>{t.stopBtn}</span>
              </button>
            )}

            {(transcript || riskScore > 0) && (
              <button
                onClick={handleResetSession}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>રીસેટ સત્ર (Reset)</span>
              </button>
            )}
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-4 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-800">
              {errorMessage}
            </p>
          )}

          {/* 1-Click Instant Test Presets Toolbar */}
          <div className="mt-7 pt-6 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>૧-ક્લિક ટેસ્ટ સિમ્યુલેશન (1-Click Instant Test Scenarios):</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                માઈક વિના પણ તરત જ લાઈવ ચકાસો
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TEST_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => runTestScenario(scen)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeScenarioId === scen.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-400/50'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold truncate">{scen.badge}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {scen.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Recognized Speech Transcript Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-navy-900 dark:text-white">
              લાઈવ સાંભળેલ અવાજ (Live Recognized Speech)
            </h3>
          </div>
          {isRecording && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1.5"></span>
              માઈક સક્રિય • વોલ્યુમ {audioVolume}%
            </span>
          )}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[70px] max-h-40 overflow-y-auto font-sans text-sm">
          {transcript || interimText ? (
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
              <span>{transcript}</span>
              {interimText && (
                <span className="text-slate-400 italic"> {interimText}</span>
              )}
            </p>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
              {isRecording
                ? 'માઈક્રોફોન સાંભળી રહ્યું છે... તમારા ફોનનો સ્પીકર અવાજ બોલો અથવા ઉપરથી ૧-ક્લિક ટેસ્ટ પસંદ કરો.'
                : 'લાઈવ સ્કેનિંગ શરૂ કરવા ઉપર "લાઈવ સ્કેનિંગ શરૂ કરો" બટન દબાવો.'}
            </p>
          )}
        </div>

        {/* Quick Keyword Tap Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 mr-1">ઝડપી ટેસ્ટ કીવર્ડ્સ:</span>
          {[
            { label: '🚨 મુંબઈ પોલીસ & ડ્રગ્સ', text: 'હું મુંબઈ સાયબર પોલીસમાંથી બોલું છું, તમારા પાર્સલમાં ડ્રગ્સ મળ્યા છે.' },
            { label: '🛑 ડિજિટલ અરેસ્ટ ₹50,000', text: 'તમે ડિજિટલ અરેસ્ટ હેઠળ છો, ₹50,000 અત્યારે ટ્રાન્સફર કરો.' },
            { label: '💳 બેંક OTP માંગણી', text: 'તમારું બેંક ખાતું બ્લોક થશે, તુરંત 6-અંકનો OTP આપો.' },
            { label: '🟢 સ્વિગી ડિલિવરી', text: 'નમસ્તે હું સ્વિગી ડિલિવરી પાર્ટનર છું, કયા ગેટ પર આવું?' },
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript((prev) => {
                  const updated = (prev ? prev + ' ' : '') + chip.text;
                  evaluateSpeechText(updated);
                  return updated;
                });
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Dual Cards: Risk Assessment & Extracted Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskAssessmentCard
          riskLevel={riskLevel}
          riskScore={riskScore}
          summary={summary}
          spamTier={spamTier}
          language={language}
        />

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-navy-900 dark:text-white text-base">
              લાઈવ રેડ ફ્લેગ્સ (Live Red Flags)
            </h3>
            {redFlags.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold">
                {redFlags.length} શોધાયા
              </span>
            )}
          </div>

          {redFlags.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                હજી સુધી કોઈ શંકાસ્પદ ફ્લેગ્સ મળ્યા નથી. પોલીસ, ડિજિટલ અરેસ્ટ કે OTP સંભળાતા જ અહીં દેખાશે.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {redFlags.map((flag) => (
                <RedFlagCard key={flag.id} flag={flag} language={language} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
