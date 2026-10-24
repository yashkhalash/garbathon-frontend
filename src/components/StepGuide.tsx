import React from 'react';
import { Upload, PlayCircle, Eye, AlertOctagon, PhoneForwarded } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';

interface StepGuideProps {
  currentStep: number;
  language: WarningLanguage;
}

export const StepGuide: React.FC<StepGuideProps> = ({ currentStep, language }) => {
  const steps = [
    {
      num: 1,
      icon: <Upload className="w-4 h-4" />,
      title_gu: "૧. કોલ પસંદ કરો",
      title_hi: "1. कॉल चुनें",
      title_en: "1. Select Call",
      desc_gu: "સ્કેમ, શંકાસ્પદ કે સુરક્ષિત કોલ પસંદ કરો",
      desc_hi: "स्पैम, संदिग्ध या सुरक्षित कॉल चुनें",
      desc_en: "Choose 1 of 3 tiered benchmark WAVs",
    },
    {
      num: 2,
      icon: <PlayCircle className="w-4 h-4" />,
      title_gu: "૨. વિશ્લેષણ શરૂ કરો",
      title_hi: "2. विश्लेषण शुरू करें",
      title_en: "2. Start Analysis",
      desc_gu: "૫ સેકન્ડના ટુકડાઓમાં સ્કેન થશે",
      desc_hi: "5 सेकंड के टुकड़ों में स्कैन होगा",
      desc_en: "Streams audio in 5s chunks",
    },
    {
      num: 3,
      icon: <Eye className="w-4 h-4" />,
      title_gu: "૩. મિડ-કોલ ચેતવણી",
      title_hi: "3. मिड-कॉल चेतावनी",
      title_en: "3. Mid-Call Warning",
      desc_gu: "ધમકી ઓળખી તરત અવાજમાં ચેતવશે",
      desc_hi: "धमकी पहचानकर तुरंत अलर्ट देगा",
      desc_en: "Spoken Gujarati/Hindi alert appears mid-call",
    },
    {
      num: 4,
      icon: <PhoneForwarded className="w-4 h-4" />,
      title_gu: "૪. પરિવારને એલર્ટ",
      title_hi: "4. परिवार को अलर्ट",
      title_en: "4. Alert Contact",
      desc_gu: "એકલતા તોડી પરિવારને સંદેશો મોકલો",
      desc_hi: "अलगाव तोड़कर परिजन को SMS भेजें",
      desc_en: "Breaks isolation with emergency SMS",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {language === 'gu' ? 'સરળ ઉપયોગ પદ્ધતિ (૪ સ્ટેપ)' : language === 'hi' ? 'सरल 4-चरणीय गाइड' : 'How Suraksha AI Works (4 Simple Steps)'}
        </span>
        <span className="text-[11px] font-bold text-slate-400">
          Step {currentStep} of 4 Active
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((st) => {
          const isActive = currentStep === st.num;
          const isDone = currentStep > st.num;

          const title = language === 'gu' ? st.title_gu : language === 'hi' ? st.title_hi : st.title_en;
          const desc = language === 'gu' ? st.desc_gu : language === 'hi' ? st.desc_hi : st.desc_en;

          return (
            <div
              key={st.num}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                  : isDone
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isDone
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isDone ? '✓' : st.num}
                </div>
                <span className="text-xs font-bold text-navy-900 dark:text-slate-100">
                  {title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
