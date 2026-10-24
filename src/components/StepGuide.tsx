import React from 'react';
import { Upload, PlayCircle, Eye, PhoneForwarded } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';

interface StepGuideProps {
  currentStep: number;
  language: WarningLanguage;
}

export const StepGuide: React.FC<StepGuideProps> = ({ currentStep, language }) => {
  const t = TRANSLATIONS[language]?.steps || TRANSLATIONS.gu.steps;

  const steps = [
    {
      num: 1,
      icon: <Upload className="w-4 h-4" />,
      title: t.step1.title,
      desc: t.step1.desc,
    },
    {
      num: 2,
      icon: <PlayCircle className="w-4 h-4" />,
      title: t.step2.title,
      desc: t.step2.desc,
    },
    {
      num: 3,
      icon: <Eye className="w-4 h-4" />,
      title: t.step3.title,
      desc: t.step3.desc,
    },
    {
      num: 4,
      icon: <PhoneForwarded className="w-4 h-4" />,
      title: t.step4.title,
      desc: t.step4.desc,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
        <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t.headerTitle}
        </span>
        <span className="text-[11px] font-bold text-slate-400">
          Step {currentStep} of 4 {t.stepActive}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((st) => {
          const isActive = currentStep === st.num;
          const isDone = currentStep > st.num;

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
                  {st.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
