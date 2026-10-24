import { StructuredAIResponse, RedFlag, RiskLevel } from '../types/analysis';

export function validateAndSanitizeAIResponse(raw: unknown, defaultLang: 'gu' | 'hi' | 'en' = 'gu'): StructuredAIResponse {
  if (!raw || typeof raw !== 'object') {
    return createFallbackResponse('Empty or invalid response from AI model.', defaultLang);
  }

  const data = raw as Record<string, unknown>;

  const riskScore = typeof data.risk_score === 'number' 
    ? Math.max(0, Math.min(100, Math.round(data.risk_score))) 
    : (typeof data.risk === 'number' ? Math.max(0, Math.min(100, Math.round(data.risk))) : 0);

  let riskLevel: RiskLevel = 'safe';
  if (data.risk_level && typeof data.risk_level === 'string') {
    const lvl = data.risk_level.toLowerCase();
    if (['safe', 'low', 'suspicious', 'high', 'critical'].includes(lvl)) {
      riskLevel = lvl as RiskLevel;
    }
  } else {
    if (riskScore >= 75) riskLevel = 'critical';
    else if (riskScore >= 50) riskLevel = 'high';
    else if (riskScore >= 25) riskLevel = 'suspicious';
    else riskLevel = 'safe';
  }

  const redFlags: RedFlag[] = [];
  if (Array.isArray(data.red_flags)) {
    data.red_flags.forEach((flagItem: unknown, idx: number) => {
      if (flagItem && typeof flagItem === 'object') {
        const item = flagItem as Record<string, unknown>;
        redFlags.push({
          id: `flag_${idx}_${Date.now()}`,
          category: (item.category as RedFlag['category']) || 'SOCIAL_ENGINEERING',
          evidence: String(item.evidence || 'Suspicious cue identified in audio'),
          timestamp_seconds: Number(item.timestamp_seconds ?? item.at_sec ?? 0),
          severity: (['low', 'medium', 'high', 'critical'].includes(String(item.severity)) 
            ? item.severity 
            : 'high') as RedFlag['severity'],
          reason: String(item.reason || 'Pattern correlates with high fraud probability.'),
          recommended_action: String(item.recommended_action || 'Do not disclose any OTP or personal info.'),
        });
      }
    });
  }

  const warningText = String(
    data.warning_text || 
    (data.counter_script && typeof data.counter_script === 'object' ? (data.counter_script as Record<string, unknown>).text : '') ||
    'સાવધાન! આ કોલમાં છેતરપિંડીનાં સંકેતો છે.'
  );

  const actions = Array.isArray(data.recommended_actions) 
    ? (data.recommended_actions as string[]).map(String) 
    : [
        'Do not share any OTP or passwords.',
        'Do not transfer money under urgency or fear.',
        'Hang up and verify using the official website or toll-free number.'
      ];

  return {
    language: String(data.language || defaultLang),
    risk_level: riskLevel,
    risk_score: riskScore,
    summary: String(data.summary || (data.explanation && typeof data.explanation === 'object' ? (data.explanation as Record<string, unknown>).text : 'Analysis complete.')),
    red_flags: redFlags,
    warning_text: warningText,
    recommended_actions: actions,
    should_warn: Boolean(data.should_warn ?? (riskScore >= 40 || redFlags.length > 0)),
    context_summary: typeof data.context_summary === 'string' ? data.context_summary : '',
    scam_type: typeof data.scam_type === 'string' ? data.scam_type : undefined,
    degraded: Boolean(data.degraded),
  };
}

export function createFallbackResponse(reason: string, lang: 'gu' | 'hi' | 'en' = 'gu'): StructuredAIResponse {
  const warningMap = {
    gu: 'સાવધાન: કોલ ચકાસણી ચાલુ છે. અજાણી વ્યક્તિ સાથે OTP કે પૈસા શેર કરશો નહીં.',
    hi: 'सावधान: कॉल सत्यापन जारी है। किसी अनजान व्यक्ति के साथ OTP या पैसा साझा न करें।',
    en: 'Caution: Call verification in progress. Never share OTP or transfer money.',
  };

  return {
    language: lang,
    risk_level: 'safe',
    risk_score: 0,
    summary: reason,
    red_flags: [],
    warning_text: warningMap[lang] || warningMap.gu,
    recommended_actions: [
      'Do not disclose OTP or banking details.',
      'Verify caller credentials through official channels.'
    ],
    should_warn: false,
    degraded: true,
  };
}
