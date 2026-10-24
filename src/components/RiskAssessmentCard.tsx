import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { RiskLevel, SpamClassification } from '../types/analysis';
import { getRiskColor } from '../utils/riskAssessment';

interface RiskAssessmentCardProps {
  riskLevel: RiskLevel;
  riskScore: number;
  summary: string;
  spamTier?: SpamClassification;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  riskLevel,
  riskScore,
  summary,
  spamTier,
}) => {
  const colors = getRiskColor(riskLevel);

  const getTierLabel = () => {
    if (spamTier === 'definite_spam' || riskScore >= 70) {
      return {
        badge: 'Definite Spam (Scam Call)',
        color: 'bg-red-600 text-white',
      };
    } else if (spamTier === 'partially_spam' || (riskScore >= 25 && riskScore < 70)) {
      return {
        badge: 'Partially Spam (Suspicious Push)',
        color: 'bg-amber-500 text-white',
      };
    } else {
      return {
        badge: 'No Spam (Verified Genuine)',
        color: 'bg-emerald-600 text-white',
      };
    }
  };

  const tier = getTierLabel();

  return (
    <div className={`rounded-2xl p-5 sm:p-6 border-2 transition-all ${colors.bg} ${colors.border} dark:bg-slate-900/90 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
            Real-Time Scam &amp; Spam Assessment
          </span>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${tier.color}`}>
              {tier.badge}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              Risk: {riskScore}/100
            </span>
          </div>
        </div>

        {/* Dynamic Icon */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
          {riskScore >= 70 ? (
            <ShieldAlert className="w-8 h-8 text-red-600 animate-bounce" />
          ) : riskScore >= 25 ? (
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          ) : (
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          )}
        </div>
      </div>

      {/* Meter Bar */}
      <div className="mt-5">
        <div className="w-full bg-slate-200/80 dark:bg-slate-700 rounded-full h-3.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${colors.progress}`}
            style={{ width: `${Math.max(5, Math.min(100, riskScore))}%` }}
          />
        </div>
      </div>

      {/* Summary Explanation */}
      <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700">
        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
          <span className="font-bold text-navy-900 dark:text-white">Why this classification: </span>
          {summary || 'Analyzing incoming voice context. Results will update dynamically.'}
        </p>
      </div>
    </div>
  );
};
