import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { speechWarningService } from '../services/speechWarningService';
import { soundManager } from '../utils/soundManager';

interface VoiceExplainerButtonProps {
  textToSpeak: string;
  language: WarningLanguage;
  label?: string;
  size?: 'sm' | 'md';
  variant?: 'blue' | 'amber' | 'purple' | 'emerald';
  className?: string;
  testId?: string;
  compact?: boolean;
}

export const VoiceExplainerButton: React.FC<VoiceExplainerButtonProps> = ({
  textToSpeak,
  language,
  label,
  size = 'sm',
  variant = 'blue',
  className = '',
  testId,
  compact = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    // If text or language changes while speaking, stop
    return () => {
      if (isSpeaking) {
        speechWarningService.stop();
      }
    };
  }, [textToSpeak, language]);

  const defaultLabels = {
    gu: {
      listen: "કુદરતી અવાજમાં સમજો",
      stop: "અવાજ રોકો",
    },
    hi: {
      listen: "महिला स्वर में समझें",
      stop: "स्वर रोकें",
    },
    en: {
      listen: "Explain with Voice",
      stop: "Stop Voice",
    },
  };

  const compactLabels = {
    gu: {
      listen: "અવાજ AI",
      stop: "રોકો",
    },
    hi: {
      listen: "स्वर AI",
      stop: "रोकें",
    },
    en: {
      listen: "Voice AI",
      stop: "Stop",
    },
  };

  const t = defaultLabels[language] || defaultLabels.gu;
  const c = compactLabels[language] || compactLabels.gu;
  const currentLabel = isSpeaking ? (compact ? c.stop : t.stop) : label || (compact ? c.listen : t.listen);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      speechWarningService.stop();
      setIsSpeaking(false);
    } else {
      soundManager.stopAll();
      setIsSpeaking(true);
      await speechWarningService.speak(textToSpeak, language);
      // Wait for audio length estimation or fallback reset
      const estimatedSec = Math.max(3, Math.min(25, textToSpeak.length / 14));
      setTimeout(() => {
        setIsSpeaking(false);
      }, estimatedSec * 1000);
    }
  };

  const variantStyles = {
    blue: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-rose-500/20'
      : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    amber: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-rose-500/20'
      : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    purple: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-rose-500/20'
      : 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700',
    emerald: isSpeaking
      ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-rose-500/20'
      : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  };

  const sizeStyles = compact
    ? 'px-2 sm:px-2.5 py-1.5 text-xs'
    : size === 'sm'
    ? 'px-2.5 py-1.5 text-xs'
    : 'px-3.5 py-2 text-xs sm:text-sm font-bold';

  return (
    <button
      type="button"
      onClick={handleToggle}
      data-testid={testId || `voice-explain-btn-${language}`}
      className={`inline-flex items-center space-x-1 sm:space-x-1.5 rounded-xl border font-bold transition-all duration-200 active:scale-95 shadow-sm whitespace-nowrap flex-shrink-0 ${variantStyles[variant]} ${sizeStyles} ${className}`}
      title={isSpeaking ? t.stop : `${t.listen} (Natural Female Neural Voice)`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-3.5 h-3.5 animate-pulse text-white flex-shrink-0" />
          <span className="font-black text-white">{currentLabel}</span>
          {!compact && (
            <span className="flex space-x-0.5 items-center">
              <span className="w-1 h-2.5 bg-white rounded-full animate-bounce"></span>
              <span className="w-1 h-3.5 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </span>
          )}
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span className={compact ? 'text-xs font-bold' : ''}>{currentLabel}</span>
          {!compact && (
            <span className="text-[9px] px-1 rounded bg-black/10 dark:bg-white/10 uppercase font-black tracking-tight">
              Female AI
            </span>
          )}
        </>
      )}
    </button>
  );
};
