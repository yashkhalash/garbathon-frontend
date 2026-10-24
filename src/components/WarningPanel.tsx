import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ShieldAlert, PhoneCall } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { speechWarningService } from '../services/speechWarningService';

interface WarningPanelProps {
  warningText: string;
  language: WarningLanguage;
  shouldWarn: boolean;
  recommendedActions: string[];
  riskScore: number;
  onSendFamilyAlert?: () => void;
  relationship?: string;
  contactName?: string;
}

export const WarningPanel: React.FC<WarningPanelProps> = ({
  warningText,
  language,
  shouldWarn,
  recommendedActions,
  riskScore,
  onSendFamilyAlert,
  relationship = "father",
  contactName = "Ramesh Kumar",
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      speechWarningService.stop();
      setIsSpeaking(false);
    } else {
      speechWarningService.speak(warningText, language);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 6000);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(warningText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAlertFamily = () => {
    if (onSendFamilyAlert) onSendFamilyAlert();
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  if (!shouldWarn) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-5 sm:p-6 border-2 border-emerald-300 dark:border-emerald-700 shadow-sm transition-colors duration-300">
        <h3 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-base mb-1 flex items-center space-x-2">
          <span>✓ Call Appears Genuine (Safe)</span>
        </h3>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
          No coercive threats, manufactured urgency, or credential requests detected. Suraksha AI continues monitoring in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-red-500 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-yellow-300 animate-pulse" />
          <span className="font-extrabold text-sm uppercase tracking-wider text-red-100">
            STEP 3: Immediate Voice Safety Intervention (Mid-Call)
          </span>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/25 text-white border border-white/20 font-mono">
          Risk: {riskScore}/100
        </span>
      </div>

      {/* Primary Bold Warning (Large high-contrast text) */}
      <div className="bg-black/25 rounded-xl p-4 sm:p-5 backdrop-blur-sm border border-white/20 mb-4">
        <p className="text-xl sm:text-2xl font-black leading-snug tracking-tight text-white">
          {warningText}
        </p>
      </div>

      {/* Emergency Contact SMS Message Preview */}
      <div className="bg-yellow-400/20 border border-yellow-300/40 rounded-xl p-3 mb-4 text-xs font-semibold text-yellow-100">
        <span className="text-yellow-300 font-bold uppercase tracking-wider block mb-0.5">
          STEP 4: Emergency Isolation Breaker (Family Alert Preview):
        </span>
        "Your {relationship} ({contactName}) may be on a scam call right now. Call flagged for digital arrest/OTP coercion. Please call him immediately."
      </div>

      {/* Recommended Safety Moves Checklist */}
      <div className="space-y-1.5 mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-red-100 block mb-1">
          Recommended Protective Counter-Moves:
        </span>
        {recommendedActions.map((action, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-white/95">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-300"></span>
            <span>{action}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/20">
        <button
          onClick={handleSpeak}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white text-navy-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition-all active:scale-95"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
          <span>{isSpeaking ? 'Stop Voice' : 'Speak Warning Aloud'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-all active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        {/* Message User's Emergency Contact */}
        <button
          onClick={handleAlertFamily}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-yellow-400 text-navy-900 font-black text-xs shadow-md hover:bg-yellow-300 transition-all active:scale-95 ml-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{alertSent ? 'Emergency SMS Dispatched!' : `Dispatch Step 4 Alert to ${contactName}`}</span>
        </button>
      </div>
    </div>
  );
};
