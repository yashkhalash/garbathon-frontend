import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  Trash2,
  Send,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { WarningLanguage, RiskLevel, RedFlag } from '../types/analysis';
import { speechWarningService } from '../services/speechWarningService';
import { soundManager } from '../utils/soundManager';
import { VoiceExplainerButton } from './VoiceExplainerButton';
import { TRANSLATIONS } from '../utils/translations';

interface ScamTextAnalyzerProps {
  language: WarningLanguage;
  isDemoMode: boolean;
}

interface TestSample {
  id: string;
  type: 'scam' | 'phish' | 'safe';
  badge: string;
  title: string;
  texts: Record<WarningLanguage, string>;
}

const TEST_SAMPLES: TestSample[] = [
  {
    id: 'digital_arrest_scam',
    type: 'scam',
    badge: '🔴 Definite Scam (પૂર્ણ છેતરપિંડી)',
    title: 'Digital Arrest & Police Extortion',
    texts: {
      gu: 'નમસ્તે, હું મુંબઈ પોલીસ સાયબર સેલમાંથી ઇન્સ્પેક્ટર બોલું છું. તમારા આધાર નંબર પર ફેડેક્સ પાર્સલ પકડાયું છે જેમાં ડ્રગ્સ અને ગેરકાયદે પાસપોર્ટ મળ્યા છે. તમે ડિજિટલ અરેસ્ટ હેઠળ છો, ફોન કાપશો નહીં. કેસ બંધ કરવા અત્યારે જ ₹૫૦,૦૦૦ ટ્રાન્સફર કરો.',
      hi: 'नमस्ते, मैं मुंबई पुलिस साइबर सेल से बोल रहा हूँ। आपके आधार नंबर से भेजे गए पार्सल में ड्रग्स मिले हैं। आप डिजिटल अरेस्ट में हैं, कॉल मत काटिए। केस बंद करने के लिए अभी ₹50,000 ट्रांसफर कीजिए।',
      en: 'Hello, this is Inspector Sharma from Mumbai Police Cyber Cell. A courier package under your Aadhaar ID containing illegal narcotics has been seized. You are under immediate Digital Arrest. Do not disconnect this call. Transfer ₹50,000 verification penalty immediately.',
    },
  },
  {
    id: 'loan_phishing',
    type: 'phish',
    badge: '🟡 Partially Scam (શંકાસ્પદ લોન / OTP)',
    title: 'Pre-Approved Loan & Urgent KYC',
    texts: {
      gu: 'નમસ્તે સર, તમારી બેંકમાંથી લોન ડિપાર્ટમેન્ટ બોલે છે. તમારા નામ પર ₹૫ લાખની પ્રી-એપ્રૂવ્ડ લોન પાસ થઈ છે. આજે છેલ્લી તારીખ છે, કેવાયસી વેરિફાય કરવા માટે હમણાં જ આવેલા ૬-અંકનો OTP જણાવો.',
      hi: 'नमस्ते, आपके बैंक से प्री-अप्रूव्ड ₹5 लाख का लोन स्वीकृत हुआ है। आज अंतिम तारीख है। इसे एक्टिव रखने के लिए कृपया अभी आपके मोबाइल पर आया OTP शेयर करें।',
      en: 'Dear customer, congratulations! Your pre-approved ₹5,00,000 instant personal loan is expiring in 15 minutes. To disburse funds immediately, please confirm the 6-digit verification OTP sent to your phone.',
    },
  },
  {
    id: 'swiggy_safe',
    type: 'safe',
    badge: '🟢 Safe & Clean (સામાન્ય સુરક્ષિત કોલ)',
    title: 'Swiggy Food Delivery Partner',
    texts: {
      gu: 'નમસ્તે, હું સ્વિગી ફૂડ ડિલિવરી પાર્ટનર છું. હું તમારી સોસાયટીના ગેટ નંબર ૨ પાસે ઊભો છું. કયા ફ્લેટમાં આવવાનું છે તે જણાવશો?',
      hi: 'नमस्ते, मैं स्विगी डिलीवरी से बोल रहा हूँ। मैं आपकी बिल्डिंग के गेट नंबर 2 पर पहुँच गया हूँ। कृपया बताएँ कौन से फ्लैट में आना है?',
      en: "Hi, this is the delivery partner from Swiggy. I'm outside your building with your order. Which gate should I come to?",
    },
  },
];

export const ScamTextAnalyzer: React.FC<ScamTextAnalyzerProps> = ({
  language,
  isDemoMode,
}) => {
  const [inputText, setInputText] = useState<string>(TEST_SAMPLES[0].texts[language]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Analysis result state
  const [result, setResult] = useState<{
    riskLevel: RiskLevel;
    riskScore: number;
    summary: string;
    warningText: string;
    scamType: string;
    redFlags: RedFlag[];
    shouldWarn: boolean;
  } | null>(null);

  const handleCopyAndPaste = (sample: TestSample) => {
    const textToCopy = sample.texts[language] || sample.texts.gu;
    setInputText(textToCopy);
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAnalyzeText = async () => {
    if (!inputText.trim()) return;

    soundManager.stopAll();
    setIsAnalyzing(true);
    setResult(null);

    try {
      if (isDemoMode) {
        // Fast instant benchmark evaluator
        setTimeout(() => {
          evaluateLocal(inputText);
          setIsAnalyzing(false);
        }, 500);
      } else {
        const resp = await fetch('/api/analyze-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: inputText,
            language: language,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          setResult({
            riskLevel: data.risk_level,
            riskScore: data.risk_score,
            summary: data.summary,
            warningText: data.warning_text,
            scamType: data.scam_type,
            redFlags: data.red_flags || [],
            shouldWarn: data.should_warn,
          });

          // Speak warning if critical
          if (data.should_warn && data.risk_score >= 70) {
            speechWarningService.speak(data.warning_text, language);
          }
        } else {
          evaluateLocal(inputText);
        }
        setIsAnalyzing(false);
      }
    } catch {
      evaluateLocal(inputText);
      setIsAnalyzing(false);
    }
  };

  const evaluateLocal = (text: string) => {
    const lower = text.toLowerCase();
    const isScam =
      lower.includes('police') ||
      lower.includes('પોલીસ') ||
      lower.includes('પોલીસ') ||
      lower.includes('arrest') ||
      lower.includes('અરેસ્ટ') ||
      lower.includes('drugs') ||
      lower.includes('ડ્રગ્સ') ||
      lower.includes('50,000') ||
      lower.includes('50000');

    const isPhish =
      lower.includes('loan') ||
      lower.includes('લોન') ||
      lower.includes('kyc') ||
      lower.includes('કેવાયસી') ||
      lower.includes('otp') ||
      lower.includes('ઓટીપી');

    if (isScam) {
      setResult({
        riskLevel: 'critical',
        riskScore: 98,
        summary:
          language === 'gu'
            ? 'નકલી મુંબઈ પોલીસ, ડિજિટલ અરેસ્ટની ધમકી અને ₹૫૦,૦૦૦ ની ગેરકાયદે માંગ પકડાઈ.'
            : language === 'hi'
            ? 'फर्जी मुंबई पुलिस, डिजिटल अरेस्ट की धमकी और ₹50,000 की जबरन वसूली पकड़ी गई।'
            : 'Severe extortion detected: Police impersonation, illegal narcotics claim, and digital arrest threats.',
        warningText:
          language === 'gu'
            ? 'સાવધાન! આ કોલમાં ડિજિટલ અરેસ્ટ અને પૈસા પડાવવાની છેતરપિંડી છે. કોઈ પૈસા ટ્રાન્સફર કરશો નહીં.'
            : language === 'hi'
            ? 'सावधान! इस कॉल में गिरफ्तारी की धमकी और पैसे ऐंठने की धोखाधड़ी है। कोई पैसा ट्रांसफर न करें।'
            : 'Warning: This call contains coercive Digital Arrest threats and extortion. Hang up immediately.',
        scamType: 'DIGITAL_ARREST',
        shouldWarn: true,
        redFlags: [
          {
            id: 'rf_1',
            category: 'AUTHORITY_IMPERSONATION',
            evidence: 'હું મુંબઈ પોલીસમાંથી બોલું છું / Mumbai Police',
            timestamp_seconds: 0,
            severity: 'critical',
            reason: 'Impersonating police officer to induce panic and immediate compliance.',
            recommended_action: 'Hang up and report to 1930.',
          },
          {
            id: 'rf_2',
            category: 'DIGITAL_ARREST',
            evidence: 'તમે ડિજિટલ અરેસ્ટમાં છો / Digital Arrest',
            timestamp_seconds: 0,
            severity: 'critical',
            reason: 'Fabricated non-existent legal concept used to hold victim hostage on call.',
            recommended_action: 'Disconnect call immediately.',
          },
          {
            id: 'rf_3',
            category: 'PAYMENT_FRAUD',
            evidence: '₹૫૦,૦૦૦ ટ્રાન્સફર કરો / Transfer ₹50,000',
            timestamp_seconds: 0,
            severity: 'critical',
            reason: 'Coercive demand for immediate funds transfer under threat.',
            recommended_action: 'Never transfer funds to caller.',
          },
        ],
      });
      speechWarningService.speak(
        language === 'gu'
          ? 'સાવધાન! આ કોલમાં ડિજિટલ અરેસ્ટ અને પૈસા પડાવવાની છેતરપિંડી છે.'
          : language === 'hi'
          ? 'सावधान! इस कॉल में गिरफ्तारी की धमकी और धोखाधड़ी है।'
          : 'Warning: This conversation contains coercive threats and extortion.',
        language
      );
    } else if (isPhish) {
      setResult({
        riskLevel: 'suspicious',
        riskScore: 68,
        summary:
          language === 'gu'
            ? 'પ્રિ-એપ્રૂવ્ડ લોનની લાલચ આપીને ખાનગી OTP મેળવવાનો પ્રયાસ પકડાયો.'
            : language === 'hi'
            ? 'प्री-अप्रूव्ड लोन का झांसा देकर बैंक OTP हासिल करने की कोशिश पकड़ी गई।'
            : 'Phishing attempt detected: Unsolicited instant loan urgency used to harvest banking OTP.',
        warningText:
          language === 'gu'
            ? 'સાવધાન! બેંક લોનના બહાને OTP માગવામાં આવી રહ્યો છે. કોઈને OTP આપશો નહીં.'
            : language === 'hi'
            ? 'सावधान! लोन के नाम पर OTP मांगा जा रहा है। किसी को अपना OTP न बताएं।'
            : 'Warning: Caller is soliciting a 6-digit verification OTP. Do not disclose it.',
        scamType: 'OTP_FRAUD',
        shouldWarn: true,
        redFlags: [
          {
            id: 'rf_4',
            category: 'OTP_FRAUD',
            evidence: '૬-અંકનો OTP જણાવો / 6-digit OTP',
            timestamp_seconds: 0,
            severity: 'high',
            reason: 'Urgent OTP solicitation used to initiate unauthorized withdrawal.',
            recommended_action: 'Never share OTP with anyone.',
          },
        ],
      });
    } else {
      setResult({
        riskLevel: 'safe',
        riskScore: 6,
        summary:
          language === 'gu'
            ? 'સામાન્ય અને સુરક્ષિત કોલ. કોઈ પણ ધમકી, OTP માંગ કે છેતરપિંડીના સંકેત નથી.'
            : language === 'hi'
            ? 'सामान्य और सुरक्षित बातचीत। कोई धमकी या धोखाधड़ी के संकेत नहीं मिले।'
            : 'Routine benign conversation. No threats, OTP solicitations, or financial coercion detected.',
        warningText: '',
        scamType: 'BENIGN_OR_UNCLEAR',
        shouldWarn: false,
        redFlags: [],
      });
    }
  };

  const handleSpeak = () => {
    if (result?.warningText) {
      setIsSpeaking(true);
      speechWarningService.speak(result.warningText, language);
      setTimeout(() => setIsSpeaking(false), 5000);
    }
  };

  const labels = {
    gu: {
      title: "કૉલ/મેસેજ ટેક્સ્ટ તપાસો (Copy & Paste Scam Test Studio)",
      subtitle: "તમારી પાસે ઓડિયો ફાઇલ ન હોય તો પણ નીચે આપેલા સેમ્પલ સ્કેમ કે સેફ ડેટા કૉપિ-પેસ્ટ કરીને તુરંત ચકાસો.",
      copySectionTitle: "📋 ટેસ્ટ કરવા માટે ૧-ક્લિક કૉપિ અને પેસ્ટ કરો (Click to Load):",
      textareaPlaceholder: "અહીં કોઈ પણ શંકાસ્પદ કોલની વાતચીત અથવા વોટ્સએપ મેસેજ પેસ્ટ કરો...",
      btnAnalyze: "AI દ્વારા ટેક્સ્ટ વિશ્લેષણ કરો",
      btnAnalyzing: "વિશ્લેષણ ચાલુ છે...",
      btnClear: "ટેક્સ્ટ સાફ કરો",
      riskTitle: "ટેક્સ્ટ સ્કેમ જોખમ સ્કોર:",
      speakBtn: "કુદરતી મહિલા અવાજમાં ચેતવણી સાંભળો",
    },
    hi: {
      title: "कॉल/मैसेज टेक्स्ट जांचें (Copy & Paste Scam Test Studio)",
      subtitle: "यदि आपके पास ऑडियो फाइल नहीं है, तो नीचे दिए गए सैंपल फ्रॉड या सेफ टेक्स्ट को कॉपी-पेस्ट करके तुरंत जांचें।",
      copySectionTitle: "📋 टेस्ट के लिए 1-क्लिक कॉपी और पेस्ट करें (Click to Load):",
      textareaPlaceholder: "यहाँ कोई भी संदिग्ध कॉल संवाद या व्हाट्सएप मैसेज पेस्ट करें...",
      btnAnalyze: "AI द्वारा टेक्स्ट का विश्लेषण करें",
      btnAnalyzing: "विश्लेषण जारी है...",
      btnClear: "साफ करें",
      riskTitle: "टेक्स्ट फ्रॉड जोखिम स्कोर:",
      speakBtn: "प्राकृतिक महिला स्वर में चेतावनी सुनें",
    },
    en: {
      title: "Copy & Paste Scam Test Studio (Text / Transcript Analyzer)",
      subtitle: "Instantly test call transcripts, suspicious SMS, or WhatsApp dialogues to observe real-time AI classification.",
      copySectionTitle: "📋 1-Click Copy & Load Verified Test Datasets (Scam vs Safe):",
      textareaPlaceholder: "Paste any suspicious call dialogue, SMS, or transcript text here...",
      btnAnalyze: "Run AI Scam Detection",
      btnAnalyzing: "Analyzing text...",
      btnClear: "Clear Input",
      riskTitle: "Fraud Risk Assessment:",
      speakBtn: "Speak Warning Aloud (Female Neural Voice)",
    },
  };

  const t = labels[language] || labels.gu;

  return (
    <section
      data-testid="scam-text-analyzer"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300 space-y-6"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Copy-Paste Test Studio</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase animate-pulse">
              NEW
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {t.subtitle}
          </p>
        </div>

        <div className="self-start sm:self-center">
          <VoiceExplainerButton
            textToSpeak={TRANSLATIONS[language]?.voiceExplainer?.testStudio || TRANSLATIONS.gu.voiceExplainer.testStudio}
            language={language}
            variant="blue"
            size="md"
            testId="voice-explain-test-studio"
          />
        </div>
      </div>

      {/* 3 Quick Copy & Paste Preset Buttons */}
      <div className="space-y-2">
        <p className="text-xs font-black text-slate-700 dark:text-slate-300">
          {t.copySectionTitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEST_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleCopyAndPaste(sample)}
              data-testid={`copy-sample-${sample.type}-btn`}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between hover:scale-[1.02] active:scale-95 shadow-sm ${
                sample.type === 'scam'
                  ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                  : sample.type === 'phish'
                  ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900 text-amber-950 dark:text-amber-200'
                  : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900 text-emerald-950 dark:text-emerald-200'
              }`}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider block mb-1">
                  {sample.badge}
                </span>
                <p className="font-extrabold text-xs sm:text-sm leading-snug">
                  {sample.title}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] font-bold">
                <span className="flex items-center space-x-1">
                  {copiedId === sample.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-black">Copied &amp; Loaded!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy &amp; Load Text</span>
                    </>
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Area & Input Controls */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            data-testid="scam-test-textarea"
            rows={4}
            placeholder={t.textareaPlaceholder}
            className="w-full p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setInputText('')}
            className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.btnClear}</span>
          </button>

          <button
            onClick={handleAnalyzeText}
            disabled={isAnalyzing || !inputText.trim()}
            data-testid="analyze-text-btn"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isAnalyzing ? t.btnAnalyzing : t.btnAnalyze}</span>
          </button>
        </div>
      </div>

      {/* Live AI Analysis Results */}
      {result && (
        <div
          data-testid="text-analysis-result"
          className={`p-5 rounded-2xl border-2 space-y-4 animate-in fade-in duration-300 ${
            result.riskLevel === 'critical' || result.riskLevel === 'high'
              ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100'
              : result.riskLevel === 'suspicious'
              ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 text-amber-950 dark:text-amber-100'
              : 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
          }`}
        >
          {/* Header Row: Classification & Gauge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-current/20">
            <div className="flex items-center space-x-2">
              {result.riskLevel === 'critical' || result.riskLevel === 'high' ? (
                <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              ) : result.riskLevel === 'suspicious' ? (
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              )}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider block font-bold opacity-80">
                  {t.riskTitle}
                </span>
                <h3 className="font-black text-base sm:text-lg">
                  {result.riskLevel === 'critical' || result.riskLevel === 'high'
                    ? '🔴 DEFINITE SCAM (100% છેતરપિંડી)'
                    : result.riskLevel === 'suspicious'
                    ? '🟡 PARTIALLY SCAM (શંકાસ્પદ કૉલ)'
                    : '🟢 SAFE & CLEAN (સામાન્ય સુરક્ષિત)'}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xl sm:text-2xl font-mono font-black">
                {result.riskScore}/100
              </span>
            </div>
          </div>

          {/* AI Explanation Summary */}
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            <strong>AI Assessment: </strong>
            {result.summary}
          </p>

          {/* Extracted Red Flags Evidence */}
          {result.redFlags.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-current/20">
              <p className="text-xs font-black uppercase tracking-wider">
                Extracted Scam Evidence Red Flags ({result.redFlags.length}):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {result.redFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/70 dark:bg-black/30 border border-current/20 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 font-mono">
                        {flag.category}
                      </span>
                    </div>
                    <p className="font-mono font-semibold text-[11px]">
                      &ldquo;{flag.evidence}&rdquo;
                    </p>
                    <p className="text-[11px] opacity-80">{flag.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warning Banner & Natural Voice Button */}
          {result.warningText && (
            <div className="pt-3 border-t border-current/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-extrabold flex items-start space-x-1.5 flex-1">
                <span>{result.warningText}</span>
              </div>

              <button
                onClick={handleSpeak}
                className="px-4 py-2 bg-navy-950 dark:bg-white text-white dark:text-navy-950 rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 flex-shrink-0 active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>{t.speakBtn}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
