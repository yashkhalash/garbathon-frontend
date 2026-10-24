import React, { useState } from 'react';
import {
  Mic,
  Cpu,
  Volume2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Play,
  CheckCircle,
} from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { VoiceExplainerButton } from './VoiceExplainerButton';
import { TRANSLATIONS } from '../utils/translations';

interface AnimatedHowItWorksProps {
  language: WarningLanguage;
  onSelectStep?: (stepIndex: number) => void;
}

export const AnimatedHowItWorks: React.FC<AnimatedHowItWorksProps> = ({ language }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const content = {
    gu: {
      badge: "સરળ માર્ગદર્શિકા • ૪ પગલાં",
      title: "સુરક્ષા AI નો ઉપયોગ કેવી રીતે કરવો?",
      subtitle: "કોઈ જટિલ સેટઅપ નથી. સામાન્ય નાગરિક કે વડીલ પણ માત્ર ૪ સરળ પગલાંમાં ૧૦૦% સુરક્ષિત રહી શકે છે.",
      steps: [
        {
          num: "૦૧",
          icon: Mic,
          title: "કોલ ઑડિયો પસંદ કરો",
          badge: "ઈનપુટ સ્ટેજ",
          desc: "ડેમો સ્કેમ કોલ (Tier 1/2/3) પસંદ કરો અથવા તમારા ફોન પર ચાલતા કોલ માટે 'લાઈવ માઈક' શરૂ કરો. અવાજ એકબીજા પર અથડાશે નહીં.",
          tip: "સિંગલ-સ્ટ્રીમ સાઉન્ડ મેનેજર જૂના અવાજને તરત રોકી દે છે.",
        },
        {
          num: "૦૨",
          icon: Cpu,
          title: "જેમિની નેટિવ ઓડિયો સ્કૅનિંગ",
          desc: "કોલને ૫ સેકન્ડના નાના ટુકડાઓમાં વહેંચીને ગૂગલ જેમિની ૨.૫ ફ્લેશ મોડેલ સીધા અવાજમાંથી છેતરપિંડીના સંકેતો ઓળખે છે.",
          tip: "બ્રાઉઝર સ્પીચ API નહીં, પરંતુ સીધો ગૂગલ જેમિની અવાજ એન્જિન.",
        },
        {
          num: "૦૩",
          icon: Volume2,
          title: "કુદરતી મહિલા અવાજમાં ચેતવણી",
          badge: "મિડ-કોલ એલર્ટ",
          desc: "કોલ ચાલુ હોય ત્યારે જ માતૃભાષામાં કુદરતી મહિલા અવાજ ચેતવણી આપશે: 'સાવધાન! આ કોલમાં છેતરપિંડી છે, OTP કે પૈસા આપશો નહીં.'",
          tip: "રોબોટિક નહીં પણ સ્પષ્ટ અને આશ્વાસન આપતો કુદરતી સ્વર.",
        },
        {
          num: "૦૪",
          icon: Lock,
          title: "આધાર ફ્રીઝ વૉલ્ટ & કટોકટી SOS",
          badge: "અંતિમ સુરક્ષા કવચ",
          desc: "એક જ ક્લિકમાં UIDAI બાયોમેટ્રિક્સ ફ્રીઝ કરો જેથી ડિજિટલ અરેસ્ટ સ્કેમર્સ ખાલી હાથે જાય, અને પુત્ર/પુત્રીને તરત SOS મેસેજ પહોંચે.",
          tip: "૧૦ મિનિટ માટે અસ્થાયી અનલોક સુવિધા ઉપલબ્ધ છે.",
        },
      ],
    },
    hi: {
      badge: "सरल गाइड • 4 चरण",
      title: "सुरक्षा AI का उपयोग कैसे करें?",
      subtitle: "कोई जटिल प्रक्रिया नहीं। वरिष्ठ नागरिक एवं परिवार केवल 4 आसान चरणों में साइबर अपराध से सुरक्षित रह सकते हैं।",
      steps: [
        {
          num: "01",
          icon: Mic,
          title: "कॉल ऑडियो चुनें",
          badge: "इनपुट स्टेज",
          desc: "डेमो कॉल (Tier 1/2/3) चुनें या लाइव माइक्रोफोन मोड शुरू करें। एक समय में केवल एक ही स्पष्ट ऑडियो बजेगा।",
          tip: "साउंड मैनेजर पुराना ऑडियो अपने-आप बंद कर देता है।",
        },
        {
          num: "02",
          icon: Cpu,
          title: "जेमिनी 2.5 फ्लैश ऑडियो स्कैनिंग",
          desc: "ऑडियो को 5 सेकंड के टुकड़ों में बांटकर गूगल जेमिनी मॉडल सीधे आवाज के लहजे, धमकी और दबाव को पहचानता है।",
          tip: "कमजोर ब्राउज़र टूल नहीं, वास्तविक जेमिनी नेटिव ऑडियो।",
        },
        {
          num: "03",
          icon: Volume2,
          title: "प्राकृतिक महिला आवाज में चेतावनी",
          badge: "मिड-कॉल अलर्ट",
          desc: "कॉल के बीच में ही शांत महिला स्वर में चेतावनी: 'सावधान! यह कॉल फर्जी है, ओटीपी या पैसे ट्रांसफर न करें।'",
          tip: "रोबोटिक आवाज के बजाय स्वाभाविक एवं स्पष्ट उच्चारण।",
        },
        {
          num: "04",
          icon: Lock,
          title: "आधार फ्रीज वॉल्ट एवं पारिवारिक SOS",
          badge: "अंतिम सुरक्षा",
          desc: "एक क्लिक में UIDAI बायोमेट्रिक्स फ्रीज करें ताकि डिजिटल अरेस्ट ठग आधार से फ्रॉड न कर सकें, और परिवार को लाइव SOS भेजें।",
          tip: "जरूरत पड़ने पर 10 मिनट के लिए सुरक्षित अनलॉक।",
        },
      ],
    },
    en: {
      badge: "STEP-BY-STEP USER WALKTHROUGH",
      title: "How to Use Suraksha AI in 4 Simple Steps",
      subtitle: "Zero technical friction. Designed specifically for senior citizens and everyday smartphone users.",
      steps: [
        {
          num: "01",
          icon: Mic,
          title: "Select or Stream Audio Call",
          badge: "Audio Ingestion",
          desc: "Choose an authentic benchmark call preset (Tier 1/2/3) or switch to Live Microphone mode. Strict single-stream playback prevents overlapping sound.",
          tip: "Global Sound Manager terminates prior audio instantaneously.",
        },
        {
          num: "02",
          icon: Cpu,
          title: "Gemini 2.5 Flash Native Processing",
          desc: "Audio stream is sliced into 5-second overlapping WAV chunks and evaluated by Gemini's native audio model for red flags and extortion urgency.",
          tip: "Bypasses error-prone Web Speech APIs for true native tone understanding.",
        },
        {
          num: "03",
          icon: Volume2,
          title: "Mid-Call Human Voice Alert",
          badge: "Mid-Call Intervention",
          desc: "A calm, reassuring female neural voice speaks aloud in your language (Gujarati, Hindi, or English) before you make an irreversible financial error.",
          tip: "Explains WHY the call is dangerous, not just an arbitrary score.",
        },
        {
          num: "04",
          icon: Lock,
          title: "Aadhaar Biometric Freeze & Family SOS",
          badge: "Actionable Isolation",
          desc: "Defeat Digital Arrest extortion by freezing UIDAI fingerprint/iris records in 1 click, while auto-alerting designated family emergency contacts.",
          tip: "Includes 10-minute temporary unlock for authentic bank visits.",
        },
      ],
    },
  };

  const t = content[language] || content.gu;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Background Neon Horizon Decor */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 relative z-10">
        <div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-500 dark:text-yellow-300" />
            <span>{t.badge}</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t.subtitle}
          </p>
        </div>

        {/* Step Indicator Badges & Voice Explainer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
          <VoiceExplainerButton
            textToSpeak={TRANSLATIONS[language]?.voiceExplainer?.howItWorks || TRANSLATIONS.gu.voiceExplainer.howItWorks}
            language={language}
            variant="blue"
            size="md"
            testId="voice-explain-how-it-works"
          />

          <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-700/60 flex-shrink-0 self-start sm:self-auto">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-black transition-all ${
                  activeStep === step
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/40 scale-105'
                    : 'text-slate-600 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                0{step}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Interactive Animated Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {t.steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCurrent = activeStep === stepNum;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(stepNum)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isCurrent
                  ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-500 shadow-md ring-2 ring-blue-400/40 scale-[1.02]'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-mono font-black text-slate-400">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-black text-sm sm:text-base text-navy-950 dark:text-white mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60">
                <p className="text-[11px] text-blue-600 dark:text-blue-300 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 animate-ping" />
                  <span>{step.tip}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
