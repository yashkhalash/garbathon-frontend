import { RiskLevel, ScamCategory } from '../types/analysis';

export function getRiskColor(level: RiskLevel): {
  bg: string;
  border: string;
  text: string;
  badge: string;
  progress: string;
} {
  switch (level) {
    case 'critical':
      return {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-700',
        badge: 'bg-red-600 text-white',
        progress: 'bg-red-600',
      };
    case 'high':
      return {
        bg: 'bg-rose-50',
        border: 'border-rose-400',
        text: 'text-rose-700',
        badge: 'bg-rose-500 text-white',
        progress: 'bg-rose-500',
      };
    case 'suspicious':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-400',
        text: 'text-amber-700',
        badge: 'bg-amber-500 text-white',
        progress: 'bg-amber-500',
      };
    case 'low':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        text: 'text-blue-700',
        badge: 'bg-blue-500 text-white',
        progress: 'bg-blue-500',
      };
    case 'safe':
    default:
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-400',
        text: 'text-emerald-700',
        badge: 'bg-emerald-600 text-white',
        progress: 'bg-emerald-600',
      };
  }
}

export const CATEGORY_LABELS: Record<ScamCategory, { en: string; gu: string; hi: string; icon: string }> = {
  DIGITAL_ARREST: {
    en: 'Digital Arrest Threat',
    gu: 'ડિજિટલ ધરપકડની ધમકી',
    hi: 'डिजिटल अरेस्ट की धमकी',
    icon: 'ShieldAlert',
  },
  OTP_FRAUD: {
    en: 'OTP / Verification Scam',
    gu: 'OTP / વેરિફિકેશન છેતરપિંડી',
    hi: 'OTP / सत्यापन धोखाधड़ी',
    icon: 'KeyRound',
  },
  BANK_KYC_FRAUD: {
    en: 'Bank Account / KYC Scam',
    gu: 'બેંક એકાઉન્ટ / KYC ફ્રોડ',
    hi: 'बैंक खाता / KYC धोखाधड़ी',
    icon: 'Landmark',
  },
  COURIER_FRAUD: {
    en: 'Fake Courier / Customs Threat',
    gu: 'ખોટું કુરિયર / કસ્ટમ્સ ડરાવવું',
    hi: 'फर्जी कूरियर / कस्टम धमकी',
    icon: 'PackageX',
  },
  PAYMENT_FRAUD: {
    en: 'Coerced Money Transfer',
    gu: 'પૈસા ટ્રાન્સફરનું દબાણ',
    hi: 'पैसे ट्रांसफर करने का दबाव',
    icon: 'CreditCard',
  },
  AUTHORITY_IMPERSONATION: {
    en: 'Police / Official Impersonation',
    gu: 'પોલીસ કે અધિકારીનું નકલી રૂપ',
    hi: 'पुलिस या अधिकारी का फर्जी रूप',
    icon: 'UserX',
  },
  SOCIAL_ENGINEERING: {
    en: 'Fear, Urgency & Isolation',
    gu: 'ડર, ઉતાવળ અને એકલતાનું દબાણ',
    hi: 'डर, हड़बड़ी और अलगाव का दबाव',
    icon: 'AlertTriangle',
  },
  BENIGN_OR_UNCLEAR: {
    en: 'Normal Conversation',
    gu: 'સામાન્ય વાતચીત',
    hi: 'सामान्य बातचीत',
    icon: 'CheckCircle2',
  },
};
