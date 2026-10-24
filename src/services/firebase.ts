import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, query, orderBy, limit, getDocs, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyMockSurakshaKeyForHackathonLocal",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "suraksha-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "suraksha-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "suraksha-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let isConfigured = false;

try {
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    isConfigured = true;
  }
} catch (e) {
  console.warn("Firebase not fully configured or operating in local demo fallback:", e);
}

export { app, auth, db, isConfigured };

export interface SavedAnalysisRecord {
  id?: string;
  timestamp: number;
  durationSeconds: number;
  riskLevel: string;
  riskScore: number;
  summary: string;
  redFlagCount: number;
  categories: string[];
}

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

export function getLocalHistory(): SavedAnalysisRecord[] {
  try {
    const raw = localStorage.getItem('suraksha_history');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearLocalHistory(): void {
  localStorage.removeItem('suraksha_history');
}

export async function fetchAnalysisHistory(): Promise<SavedAnalysisRecord[]> {
  if (db && isConfigured) {
    try {
      const q = query(collection(db, 'analysisHistory'), orderBy('timestamp', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedAnalysisRecord));
    } catch (e) {
      console.warn("Error fetching from Firestore, using local fallback", e);
    }
  }
  return getLocalHistory();
}
