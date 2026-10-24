import React from 'react';
import { RedFlag, WarningLanguage } from '../types/analysis';
import { CATEGORY_LABELS } from '../utils/riskAssessment';
import { formatTime } from '../utils/audioValidation';
import { ShieldAlert, KeyRound, Landmark, PackageX, CreditCard, UserX, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RedFlagCardProps {
  flag: RedFlag;
  language: WarningLanguage;
  onSeekTo?: (timeSec: number) => void;
}

export const RedFlagCard: React.FC<RedFlagCardProps> = ({ flag, language, onSeekTo }) => {
  const meta = CATEGORY_LABELS[flag.category] || CATEGORY_LABELS.SOCIAL_ENGINEERING;
  const label = meta[language] || meta.en;

  const renderIcon = () => {
    switch (flag.category) {
      case 'DIGITAL_ARREST': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'OTP_FRAUD': return <KeyRound className="w-5 h-5 text-amber-600" />;
      case 'BANK_KYC_FRAUD': return <Landmark className="w-5 h-5 text-purple-600" />;
      case 'COURIER_FRAUD': return <PackageX className="w-5 h-5 text-indigo-600" />;
      case 'PAYMENT_FRAUD': return <CreditCard className="w-5 h-5 text-rose-600" />;
      case 'AUTHORITY_IMPERSONATION': return <UserX className="w-5 h-5 text-blue-600" />;
      case 'BENIGN_OR_UNCLEAR': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    }
  };

  const getSeverityBadge = () => {
    switch (flag.severity) {
      case 'critical': return 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'high': return 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800';
      case 'medium': return 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              {renderIcon()}
            </div>
            <span className="font-bold text-sm text-navy-900 dark:text-white">{label}</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border uppercase ${getSeverityBadge()}`}>
              {flag.severity}
            </span>
            <button
              onClick={() => onSeekTo?.(flag.timestamp_seconds)}
              className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:text-blue-800 font-bold bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded cursor-pointer"
              title="Jump audio to this timestamp"
            >
              {formatTime(flag.timestamp_seconds)}
            </button>
          </div>
        </div>

        {/* Evidence Heard */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 my-2 border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
            Evidence Heard in Call:
          </span>
          <p className="text-xs font-medium text-slate-800 dark:text-slate-200 italic">
            "{flag.evidence}"
          </p>
        </div>

        {/* Reason */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
          <strong className="text-slate-800 dark:text-slate-200">Why suspicious: </strong>
          {flag.reason}
        </p>
      </div>

      {/* Recommended Action */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-blue-900 dark:text-blue-200 bg-blue-50/60 dark:bg-blue-950/40 p-2 rounded-lg font-medium">
        <strong>Action: </strong>{flag.recommended_action}
      </div>
    </div>
  );
};
