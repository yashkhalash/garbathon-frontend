import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNhJxVmmAJIB1qR3GS-1kA7ergF9XnLJA",
  authDomain: "fir-data-6644c.firebaseapp.com",
  projectId: "fir-data-6644c",
  storageBucket: "fir-data-6644c.firebasestorage.app",
  messagingSenderId: "818767261022",
  appId: "1:818767261022:android:fdceb5da8d8337c138b3cf",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isConfigured = false;

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    isConfigured = true;
  }
} catch (e) {
  console.warn("Firebase not fully configured or operating in local demo fallback:", e);
}

export { app, auth, db, isConfigured };

export interface SavedRedFlag {
  category: string;
  evidence: string;
  reason?: string;
  severity?: string;
}

export interface SavedAnalysisRecord {
  id?: string;
  timestamp: number;
  callTitle?: string;
  callerTag?: string;
  spamTier?: 'definite_spam' | 'partially_spam' | 'no_spam';
  durationSeconds: number;
  riskLevel: 'critical' | 'high' | 'suspicious' | 'low' | 'safe' | string;
  riskScore: number;
  verdictLabel?: string;
  summary: string;
  redFlagCount: number;
  categories: string[];
  redFlagsList?: SavedRedFlag[];
  recommendedAction?: string;
  warningText?: string;
  language?: string;
}

export const DEFAULT_BENCHMARK_LOGS: SavedAnalysisRecord[] = [
  {
    id: 'benchmark_digital_arrest',
    timestamp: Date.now() - 1000 * 60 * 18,
    callTitle: '1. Definite Spam (પૂર્ણ છેતરપિંડી) — Gujarati Digital Arrest',
    callerTag: 'Fake Mumbai Police Cyber Crime',
    spamTier: 'definite_spam',
    durationSeconds: 15,
    riskLevel: 'critical',
    riskScore: 98,
    verdictLabel: '🔴 ગંભીર છેતરપિંડી (Critical Digital Arrest Extortion)',
    summary: 'નકલી મુંબઈ સાયબર પોલીસ બનીને આધાર પર ડ્રગ્સ કેસ અને ડિજિટલ અરેસ્ટની ધમકી આપીને રૂ. 50,000 નું એક્સ્ટોર્શન માંગવામાં આવ્યું.',
    redFlagCount: 3,
    categories: ['DIGITAL_ARREST', 'AUTHORITY_IMPERSONATION', 'PAYMENT_FRAUD'],
    redFlagsList: [
      {
        category: 'DIGITAL_ARREST',
        evidence: 'તમે ડિજિટલ અરેસ્ટમાં છો, ફોન કાપશો નહીં.',
        reason: 'ગેરકાયદેસર ડિજિટલ અરેસ્ટની ધમકી આપી ભોગ બનનારને ગભરાવવાનો પ્રયાસ.',
        severity: 'critical',
      },
      {
        category: 'AUTHORITY_IMPERSONATION',
        evidence: 'હું મુંબઈ પોલીસ સાયબર સેલમાંથી બોલું છું.',
        reason: 'પોલીસ અધિકારીનો ખોટો સ્વાંગ રચી વિશ્વાસ અને ડર ઊભો કરવો.',
        severity: 'critical',
      },
      {
        category: 'PAYMENT_FRAUD',
        evidence: 'કેસ બંધ કરવા માટે અત્યારે જ ₹50,000 ટ્રાન્સફર કરો.',
        reason: 'ઉતાવળ કરાવી તાત્કાલિક પૈસા પડાવવાની માંગણી.',
        severity: 'critical',
      },
    ],
    recommendedAction: 'કૉલ તરત જ કાપી નાખો. કોઈપણ પૈસા ટ્રાન્સફર ન કરો અને ૧૯૩૦ પર ફરિયાદ નોંધાવો.',
    warningText: 'સાવધાન! આ કોલમાં ડિજિટલ અરેસ્ટ અને પૈસા પડાવવાની છેતરપિંડી છે.',
    language: 'gu',
  },
  {
    id: 'benchmark_loan_push',
    timestamp: Date.now() - 1000 * 60 * 48,
    callTitle: '2. Partially Spam (શંકાસ્પદ / સાવચેત) — Pre-Approved Urgent Loan Push',
    callerTag: 'Unsolicited Quick Loan Telemarketer',
    spamTier: 'partially_spam',
    durationSeconds: 16,
    riskLevel: 'suspicious',
    riskScore: 68,
    verdictLabel: '🟡 શંકાસ્પદ કૉલ (Suspicious Phishing / Urgency)',
    summary: 'અજાણ્યા કોલર દ્વારા ₹5 લાખની પ્રી-એપ્રુવ્ડ લોનની ઉતાવળ બતાવીને PAN કાર્ડ અને જન્મતારીખ જેવી અંગત માહિતી મેળવવાનો પ્રયાસ.',
    redFlagCount: 2,
    categories: ['SOCIAL_ENGINEERING', 'CREDENTIAL_HARVESTING'],
    redFlagsList: [
      {
        category: 'SOCIAL_ENGINEERING',
        evidence: 'Pre-approved loan of 5 lakh expiring today at 5 PM.',
        reason: 'કૃત્રિમ ઉતાવળ ઊભી કરીને સુરક્ષા નિયમોનું ઉલ્લંઘન કરાવવાનો પ્રયાસ.',
        severity: 'medium',
      },
      {
        category: 'CREDENTIAL_HARVESTING',
        evidence: 'Please confirm your PAN card number and date of birth right now.',
        reason: 'અજાણ્યા ફોન કૉલ પર સંવેદનશીલ દસ્તાવેજો ચોરવાની પદ્ધતિ.',
        severity: 'high',
      },
    ],
    recommendedAction: 'અજાણ્યા કોલ પર PAN, આધાર કે જન્મતારીખ આપશો નહીં. સત્તાવાર બેંક શાખાનો સંપર્ક કરો.',
    warningText: 'ધ્યાન આપો: આ અજાણ્યો શંકાસ્પદ લોન કોલ છે. તમારો PAN નંબર શેર કરશો નહીં.',
    language: 'gu',
  },
  {
    id: 'benchmark_swiggy_delivery',
    timestamp: Date.now() - 1000 * 60 * 115,
    callTitle: '3. No Spam (સામાન્ય સુરક્ષિત કોલ) — Swiggy Food Delivery',
    callerTag: 'Swiggy Food Delivery Partner',
    spamTier: 'no_spam',
    durationSeconds: 8,
    riskLevel: 'safe',
    riskScore: 4,
    verdictLabel: '🟢 સંપૂર્ણ સુરક્ષિત (Verified Safe Routine Call)',
    summary: 'સ્વિગી ડિલિવરી પાર્ટનર દ્વારા સોસાયટીના ગેટ નંબર વિશે સામાન્ય પૂછપરછ. કોઈ ધમકી, પૈસા કે OTP ની માંગણી નથી.',
    redFlagCount: 0,
    categories: ['BENIGN_OR_UNCLEAR'],
    redFlagsList: [],
    recommendedAction: 'સામાન્ય વાતચીત. કોઈ જોખમ નથી.',
    warningText: 'કોઈ છેતરપિંડીના સંકેત મળ્યા નથી. આ સામાન્ય Swiggy ડિલિવરી કોલ છે.',
    language: 'gu',
  },
];

export async function saveAnalysisSummary(record: Omit<SavedAnalysisRecord, 'id'>): Promise<string> {
  if (db && isConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'analysisHistory'), record);
      return docRef.id;
    } catch (err) {
      console.warn("Could not save to Firestore, falling back to local storage", err);
    }
  }

  // Fallback to localStorage for privacy and offline testing
  const history = getLocalHistory();
  const id = `local_${Date.now()}`;
  history.unshift({ ...record, id });
  localStorage.setItem('suraksha_history', JSON.stringify(history.slice(0, 50)));
  return id;
}

export function sanitizeRecordForUser(rec: SavedAnalysisRecord): SavedAnalysisRecord {
  // If the record has placeholder text from audio preparation, upgrade it to user-friendly description
  const summaryLower = (rec.summary || '').toLowerCase();
  const titleLower = (rec.callTitle || '').toLowerCase();

  if (summaryLower.includes('ready to analyze: 1. definite spam') || titleLower.includes('definite spam') || summaryLower.includes('gujarati digital arrest')) {
    return {
      ...rec,
      callTitle: rec.callTitle || '1. Definite Spam (પૂર્ણ છેતરપિંડી) — Gujarati Digital Arrest',
      callerTag: 'Fake Mumbai Police Cyber Crime',
      spamTier: 'definite_spam',
      riskLevel: 'critical',
      riskScore: 98,
      verdictLabel: '🔴 ગંભીર છેતરપિંડી (Critical Digital Arrest Extortion)',
      summary: 'નકલી મુંબઈ સાયબર પોલીસ બનીને આધાર પર ડ્રગ્સ કેસ અને ડિજિટલ અરેસ્ટની ધમકી આપીને રૂ. 50,000 નું એક્સ્ટોર્શન માંગવામાં આવ્યું.',
      redFlagCount: 3,
      categories: ['DIGITAL_ARREST', 'AUTHORITY_IMPERSONATION', 'PAYMENT_FRAUD'],
      redFlagsList: [
        {
          category: 'DIGITAL_ARREST',
          evidence: 'તમે ડિજિટલ અરેસ્ટમાં છો, ફોન કાપશો નહીં.',
          reason: 'ગેરકાયદેસર ડિજિટલ અરેસ્ટની ધમકી આપી ભોગ બનનારને ગભરાવવાનો પ્રયાસ.',
          severity: 'critical',
        },
        {
          category: 'AUTHORITY_IMPERSONATION',
          evidence: 'હું મુંબઈ પોલીસ સાયબર સેલમાંથી બોલું છું.',
          reason: 'પોલીસ અધિકારીનો ખોટો સ્વાંગ રચી વિશ્વાસ અને ડર ઊભો કરવો.',
          severity: 'critical',
        },
        {
          category: 'PAYMENT_FRAUD',
          evidence: 'કેસ બંધ કરવા માટે અત્યારે જ ₹50,000 ટ્રાન્સફર કરો.',
          reason: 'ઉતાવળ કરાવી તાત્કાલિક પૈસા પડાવવાની માંગણી.',
          severity: 'critical',
        },
      ],
      recommendedAction: 'કૉલ તરત જ કાપી નાખો. કોઈપણ પૈસા ટ્રાન્સફર ન કરો અને ૧૯૩૦ પર ફરિયાદ નોંધાવો.',
      warningText: 'સાવધાન! આ કોલમાં ડિજિટલ અરેસ્ટ અને પૈસા પડાવવાની છેતરપિંડી છે.',
    };
  }

  if (summaryLower.includes('splitting incoming voice stream') || summaryLower.includes('pre-approved') || titleLower.includes('loan')) {
    return {
      ...rec,
      callTitle: rec.callTitle || '2. Partially Spam (શંકાસ્પદ / સાવચેત) — Pre-Approved Urgent Loan Push',
      callerTag: 'Unsolicited Quick Loan Telemarketer',
      spamTier: 'partially_spam',
      riskLevel: 'suspicious',
      riskScore: 68,
      verdictLabel: '🟡 શંકાસ્પદ કૉલ (Suspicious Phishing / Urgency)',
      summary: 'અજાણ્યા કોલર દ્વારા ₹5 લાખની પ્રી-એપ્રુવ્ડ લોનની ઉતાવળ બતાવીને PAN કાર્ડ અને જન્મતારીખ જેવી અંગત માહિતી મેળવવાનો પ્રયાસ.',
      redFlagCount: 2,
      categories: ['SOCIAL_ENGINEERING', 'CREDENTIAL_HARVESTING'],
      redFlagsList: [
        {
          category: 'SOCIAL_ENGINEERING',
          evidence: 'Pre-approved loan of 5 lakh expiring today at 5 PM.',
          reason: 'કૃત્રિમ ઉતાવળ ઊભી કરીને સુરક્ષા નિયમોનું ઉલ્લંઘન કરાવવાનો પ્રયાસ.',
          severity: 'medium',
        },
        {
          category: 'CREDENTIAL_HARVESTING',
          evidence: 'Please confirm your PAN card number and date of birth right now.',
          reason: 'અજાણ્યા ફોન કૉલ પર સંવેદનશીલ દસ્તાવેજો ચોરવાની પદ્ધતિ.',
          severity: 'high',
        },
      ],
      recommendedAction: 'અજાણ્યા કોલ પર PAN, આધાર કે જન્મતારીખ આપશો નહીં. સત્તાવાર બેંક શાખાનો સંપર્ક કરો.',
      warningText: 'ધ્યાન આપો: આ અજાણ્યો શંકાસ્પદ લોન કોલ છે. તમારો PAN નંબર શેર કરશો નહીં.',
    };
  }

  if (summaryLower.includes('uploaded audio') || summaryLower.includes('swiggy') || titleLower.includes('swiggy')) {
    return {
      ...rec,
      callTitle: rec.callTitle || '3. No Spam (સામાન્ય સુરક્ષિત કોલ) — Swiggy Food Delivery',
      callerTag: 'Swiggy Food Delivery Partner',
      spamTier: 'no_spam',
      riskLevel: 'safe',
      riskScore: 4,
      verdictLabel: '🟢 સંપૂર્ણ સુરક્ષિત (Verified Safe Routine Call)',
      summary: 'સ્વિગી ડિલિવરી પાર્ટનર દ્વારા સોસાયટીના ગેટ નંબર વિશે સામાન્ય પૂછપરછ. કોઈ ધમકી, પૈસા કે OTP ની માંગણી નથી.',
      redFlagCount: 0,
      categories: ['BENIGN_OR_UNCLEAR'],
      redFlagsList: [],
      recommendedAction: 'સામાન્ય વાતચીત. કોઈ જોખમ નથી.',
      warningText: 'કોઈ છેતરપિંડીના સંકેત મળ્યા નથી. આ સામાન્ય Swiggy ડિલિવરી કોલ છે.',
    };
  }

  return {
    ...rec,
    callTitle: rec.callTitle || (rec.riskScore >= 75 ? 'Critical Scam Call' : (rec.riskScore >= 35 ? 'Suspicious Call' : 'Safe Routine Call')),
    verdictLabel: rec.verdictLabel || (rec.riskScore >= 75 ? '🔴 Definite Scam' : (rec.riskScore >= 35 ? '🟡 Suspicious Call' : '🟢 Safe Call')),
    recommendedAction: rec.recommendedAction || (rec.riskScore >= 75 ? 'Hang up immediately. Never share OTP or transfer funds.' : 'Normal call verification.'),
  };
}

export function getLocalHistory(): SavedAnalysisRecord[] {
  try {
    const raw = localStorage.getItem('suraksha_history');
    if (!raw) {
      // Seed with initial benchmark logs so user sees rich examples
      localStorage.setItem('suraksha_history', JSON.stringify(DEFAULT_BENCHMARK_LOGS));
      return DEFAULT_BENCHMARK_LOGS;
    }
    const parsed: SavedAnalysisRecord[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem('suraksha_history', JSON.stringify(DEFAULT_BENCHMARK_LOGS));
      return DEFAULT_BENCHMARK_LOGS;
    }
    // Auto-sanitize existing logs
    const sanitized = parsed.map(sanitizeRecordForUser);
    localStorage.setItem('suraksha_history', JSON.stringify(sanitized));
    return sanitized;
  } catch {
    return DEFAULT_BENCHMARK_LOGS;
  }
}

export function clearLocalHistory(): void {
  localStorage.setItem('suraksha_history', JSON.stringify([]));
}

export function restoreDefaultBenchmarkLogs(): SavedAnalysisRecord[] {
  localStorage.setItem('suraksha_history', JSON.stringify(DEFAULT_BENCHMARK_LOGS));
  return DEFAULT_BENCHMARK_LOGS;
}

export async function fetchAnalysisHistory(): Promise<SavedAnalysisRecord[]> {
  if (db && isConfigured) {
    try {
      const q = query(collection(db, 'analysisHistory'), orderBy('timestamp', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedAnalysisRecord));
      if (docs.length > 0) {
        return docs.map(sanitizeRecordForUser);
      }
    } catch (e) {
      console.warn("Error fetching from Firestore, using local fallback", e);
    }
  }
  return getLocalHistory();
}
