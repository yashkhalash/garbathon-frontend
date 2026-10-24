import { AudioChunk, StructuredAIResponse, WarningLanguage, DemoCallPreset } from '../types/analysis';
import { validateAndSanitizeAIResponse, createFallbackResponse } from '../utils/responseValidation';

export const DEMO_PRESETS: DemoCallPreset[] = [
  // 1. DEFINITE SPAM / HIGH-RISK SCAM (RED)
  {
    id: 'tier1_definite_spam_digital_arrest',
    name: '1. Definite Spam (પૂર્ણ છેતરપિંડી) — Gujarati Digital Arrest',
    spamTier: 'definite_spam',
    tierBadge: '🔴 Definite Spam (Scam Call)',
    description: 'Fake Mumbai Police Cyber Crime, parcel narcotics allegation, coercive digital arrest threat, and urgent ₹50,000 transfer extortion.',
    expectedCategory: 'DIGITAL_ARREST',
    expectedRisk: 'critical',
    audioUrl: '/demo-calls/tier1_definite_spam_digital_arrest.wav',
    durationSeconds: 15,
  },

  // 2. PARTIALLY SPAM / SUSPICIOUS UNSOLICITED SALES & IDENTITY PHISHING (AMBER)
  {
    id: 'tier2_partially_spam_loan_push',
    name: '2. Partially Spam (શંકાસ્પદ / સાવચેત) — Pre-Approved Loan Phishing',
    spamTier: 'partially_spam',
    tierBadge: '🟡 Partially Spam (Suspicious)',
    description: 'High-pressure unsolicited quick loan offer creating urgency with expiring deadline to extract PAN number and Date of Birth.',
    expectedCategory: 'SOCIAL_ENGINEERING',
    expectedRisk: 'suspicious',
    audioUrl: '/demo-calls/tier2_partially_spam_loan_push.wav',
    durationSeconds: 16,
  },

  // 3. NO SPAM / SAFE ROUTINE CALL (GREEN)
  {
    id: 'tier3_no_spam_swiggy_delivery',
    name: '3. No Spam (સામાન્ય સુરક્ષિત કોલ) — Swiggy Food Delivery',
    spamTier: 'no_spam',
    tierBadge: '🟢 No Spam (Genuine Call)',
    description: 'Polite delivery partner asking which apartment gate to enter. Zero threats, zero requests for OTPs, PINs, or sensitive credentials.',
    expectedCategory: 'BENIGN_OR_UNCLEAR',
    expectedRisk: 'safe',
    audioUrl: '/demo-calls/tier3_no_spam_swiggy_delivery.wav',
    durationSeconds: 8,
  },
];

export async function checkBackendHealth(): Promise<{ status: string; has_gemini_key: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check non-200');
    return await res.json();
  } catch {
    return { status: 'offline', has_gemini_key: false };
  }
}

/**
 * Analyzes an audio chunk via the backend Gemini service (Gemini 2.5 Flash Native Audio)
 */
export async function analyzeAudioChunk(
  chunk: AudioChunk,
  contextSummary: string,
  language: WarningLanguage,
  isDemoMode: boolean,
  activePresetId?: string
): Promise<StructuredAIResponse> {
  // If in explicitly simulated Demo Mode or no backend available
  if (isDemoMode && activePresetId) {
    return simulateChunkAnalysis(chunk, language, activePresetId);
  }

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audio_b64: chunk.audioBase64,
        mime_type: 'audio/wav',
        context_summary: contextSummary,
        elapsed_sec: chunk.startTime,
        language: language,
      }),
    });

    if (!response.ok) {
      throw new Error(`API server error: ${response.status}`);
    }

    const data = await response.json();
    return validateAndSanitizeAIResponse(data, language);
  } catch (err) {
    console.warn("Backend analysis error, falling back:", err);
    return createFallbackResponse('AI processing temporarily unavailable.', language);
  }
}

/**
 * High-fidelity deterministic simulation for demo mode that accurately mirrors
 * real-time incremental detection for the 3 Tiers across Gujarati, Hindi, and English:
 */
function simulateChunkAnalysis(
  chunk: AudioChunk,
  lang: WarningLanguage,
  presetId: string
): StructuredAIResponse {
  const at = chunk.startTime;

  // TIER 1: DEFINITE SPAM
  if (presetId === 'tier1_definite_spam_digital_arrest') {
    const warningGu = 'સાવધાન! આ કોલમાં છેતરપિંડીનાં ગંભીર સંકેતો છે. કોલ કરનાર પોલીસ હોવાનો દાવો કરે છે અને ડ્રગ્સનો ડર બતાવે છે. ફોન કાપી નાખો.';
    const warningHi = 'सावधान! इस कॉल में धोखाधड़ी के संकेत हैं। कॉल करने वाला पुलिस का दावा कर रहा है और गिरफ्तारी की धमकी दे रहा है। कॉल काट दें।';
    const warningEn = 'Warning: This call contains serious scam indicators. The caller is claiming to be police and threatening digital arrest. Hang up immediately.';

    const warningText = lang === 'gu' ? warningGu : (lang === 'hi' ? warningHi : warningEn);

    if (at < 5) {
      return {
        language: lang,
        risk_level: 'high',
        risk_score: 78,
        spam_classification: 'definite_spam',
        summary: lang === 'hi'
          ? 'कॉलर मुंबई पुलिस साइबर सेल होने का दावा कर रहा है और पार्सल में ड्रग्स का आरोप लगा रहा है।'
          : (lang === 'en' ? 'Caller claims to be from Mumbai Cyber Police alleging illegal narcotics in parcel.' : 'કોલ કરનાર મુંબઈ પોલીસ સાયબર સેલ હોવાનો દાવો કરે છે અને પાર્સલમાં ડ્રગ્સ મળ્યાનો આરોપ લગાવે છે.'),
        red_flags: [
          {
            id: `flag_${chunk.chunkIndex}_1`,
            category: 'AUTHORITY_IMPERSONATION',
            evidence: 'મુંબઈ પોલીસ સાયબર સેલ / Cyber Cell Police Claim',
            timestamp_seconds: 1.5,
            severity: 'high',
            reason: 'Law enforcement never conducts interrogations or arrests via ordinary phone calls.',
            recommended_action: 'Verify directly via the 1930 Cyber Crime Helpline.',
          },
          {
            id: `flag_${chunk.chunkIndex}_2`,
            category: 'COURIER_FRAUD',
            evidence: 'પાર્સલમાં ડ્રગ્સ / Narcotics in Aadhaar parcel',
            timestamp_seconds: 4.0,
            severity: 'critical',
            reason: 'Fabricated contraband parcels are engineered to create immediate panic.',
            recommended_action: 'Hang up the call without fear.',
          }
        ],
        warning_text: warningText,
        recommended_actions: [
          'Hang up immediately.',
          'Never transfer money or share credentials.',
          'Inform family members or dial 1930.'
        ],
        should_warn: true,
        context_summary: 'Police impersonation and parcel drug threat.',
        scam_type: 'digital_arrest',
      };
    } else {
      return {
        language: lang,
        risk_level: 'critical',
        risk_score: 98,
        spam_classification: 'definite_spam',
        summary: 'Digital arrest coercion and ₹50,000 extortion demand.',
        red_flags: [
          {
            id: `flag_${chunk.chunkIndex}_3`,
            category: 'DIGITAL_ARREST',
            evidence: 'ડિજિટલ અરેસ્ટ / You are under digital arrest',
            timestamp_seconds: 6.5,
            severity: 'critical',
            reason: 'Indian law recognizes no concept of "digital arrest". This is 100% fraud.',
            recommended_action: 'Disconnect the call immediately.',
          },
          {
            id: `flag_${chunk.chunkIndex}_4`,
            category: 'PAYMENT_FRAUD',
            evidence: '₹50,000 ટ્રાન્સફર કરો / Transfer ₹50,000 now',
            timestamp_seconds: 9.0,
            severity: 'critical',
            reason: 'Police or courts never demand online bank transfers to settle cases.',
            recommended_action: 'Transfer zero rupees.',
          }
        ],
        warning_text: warningText,
        recommended_actions: [
          'Under no circumstances send ₹50,000 or any funds.',
          'Disconnect the call immediately.',
          'Report incident to the National Cyber Crime Portal at 1930.'
        ],
        should_warn: true,
        context_summary: 'Digital arrest and extortion payment demand.',
        scam_type: 'digital_arrest',
      };
    }
  }

  // TIER 2: PARTIALLY SPAM / SUSPICIOUS UNSOLICITED CREDIT PUSH
  else if (presetId === 'tier2_partially_spam_loan_push') {
    return {
      language: lang,
      risk_level: 'suspicious',
      risk_score: 48,
      spam_classification: 'partially_spam',
      summary: 'Unsolicited loan telemarketing call creating artificial urgency and requesting sensitive PAN and Date of Birth details over an unverified call.',
      red_flags: [
        {
          id: `flag_${chunk.chunkIndex}_1`,
          category: 'SOCIAL_ENGINEERING',
          evidence: "Pre-approved loan of 5 lakh rupees expiring today at 5 PM",
          timestamp_seconds: 4.5,
          severity: 'medium',
          reason: 'Manufactured deadline designed to rush the listener into bypassing standard security verification.',
          recommended_action: 'Do not rush. Genuine lenders allow customers time to review loan terms.',
        },
        {
          id: `flag_${chunk.chunkIndex}_2`,
          category: 'SOCIAL_ENGINEERING',
          evidence: "Please confirm your PAN card number and date of birth right now",
          timestamp_seconds: 9.0,
          severity: 'high',
          reason: 'Unsolicited callers asking for PAN and DOB may be harvesting credentials for identity theft or unauthorized credit checks.',
          recommended_action: 'Never share PAN or Date of Birth on incoming unsolicited calls. Apply directly on official website.',
        }
      ],
      warning_text: lang === 'gu'
        ? 'ધ્યાન આપો: આ અજાણ્યો શંકાસ્પદ લોન કોલ છે. ઉતાવળમાં તમારો PAN નંબર કે જન્મતારીખ શેર કરશો નહીં.'
        : (lang === 'hi' ? 'ध्यान दें: यह संदिग्ध अनचाहा लोन कॉल है। जल्दबाजी में अपना PAN नंबर या जन्मतिथि न बताएं।' : 'Caution: Suspicious telemarketing push. Do not share your PAN card number or Date of Birth.'),
      recommended_actions: [
        'Do not share PAN, Aadhaar, or Date of Birth.',
        'Ask the caller to send formal details to your registered email.',
        'Verify loan offers independently inside official banking apps.'
      ],
      should_warn: true,
      context_summary: 'Unsolicited loan offer creating false urgency and soliciting PAN number.',
      scam_type: 'partially_spam',
    };
  }

  // TIER 3: NO SPAM / SAFE CALL
  else {
    return {
      language: lang,
      risk_level: 'safe',
      risk_score: 4,
      spam_classification: 'no_spam',
      summary: 'Normal Swiggy delivery partner call confirming apartment gate location. Zero coercive demands, zero OTP requests, and zero scam indicators.',
      red_flags: [],
      warning_text: lang === 'gu'
        ? 'કોઈ છેતરપિંડીના સંકેત મળ્યા નથી. આ સામાન્ય Swiggy ડિલિવરી કોલ છે (સુરક્ષિત).'
        : (lang === 'hi' ? 'कोई स्पैम संकेत नहीं मिले। यह सामान्य डिलीवरी कॉल है (सुरक्षित)।' : 'No spam indicators detected. Verified safe routine delivery call.'),
      recommended_actions: [
        'Normal conversation.',
        'Routine delivery logistics inquiry.'
      ],
      should_warn: false,
      context_summary: 'Benign delivery partner coordinate request.',
      scam_type: 'none',
    };
  }
}
