export type RiskLevel = 'safe' | 'low' | 'suspicious' | 'high' | 'critical';

export type SpamClassification = 'definite_spam' | 'partially_spam' | 'no_spam';

export type ScamCategory =
  | 'DIGITAL_ARREST'
  | 'OTP_FRAUD'
  | 'BANK_KYC_FRAUD'
  | 'COURIER_FRAUD'
  | 'PAYMENT_FRAUD'
  | 'AUTHORITY_IMPERSONATION'
  | 'SOCIAL_ENGINEERING'
  | 'BENIGN_OR_UNCLEAR';

export type WarningLanguage = 'gu' | 'hi' | 'en';

export interface RedFlag {
  id: string;
  category: ScamCategory;
  evidence: string;
  timestamp_seconds: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  recommended_action: string;
  confidence?: number;
}

export interface StructuredAIResponse {
  language: string;
  risk_level: RiskLevel;
  risk_score: number; // 0-100
  spam_classification?: SpamClassification;
  summary: string;
  red_flags: RedFlag[];
  warning_text: string;
  recommended_actions: string[];
  should_warn: boolean;
  context_summary?: string;
  scam_type?: string;
  degraded?: boolean;
}

export interface AudioChunk {
  chunkIndex: number;
  startTime: number;
  endTime: number;
  audioBlob: Blob;
  audioBase64: string;
}

export interface TimelineEvent {
  id: string;
  timestampSeconds: number;
  label: string;
  category?: ScamCategory;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'info';
  type: 'flag' | 'warning' | 'info' | 'action';
  details?: string;
}

export interface DemoCallPreset {
  id: string;
  name: string;
  spamTier: SpamClassification;
  tierBadge: string;
  description: string;
  expectedCategory: ScamCategory;
  expectedRisk: RiskLevel;
  audioUrl: string;
  durationSeconds: number;
}
