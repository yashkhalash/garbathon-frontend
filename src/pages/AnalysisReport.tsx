import React, { useState, useEffect } from 'react';
import {
  History,
  Shield,
  Trash2,
  CheckCircle2,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  Clock,
  Calendar,
  Volume2,
  X,
  Sparkles,
  FileText,
  Search,
  Filter,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  fetchAnalysisHistory,
  subscribeToRealtimeAnalysisHistory,
  clearLocalHistory,
  restoreDefaultBenchmarkLogs,
  SavedAnalysisRecord,
} from '../services/firebase';
import { WarningLanguage } from '../types/analysis';
import { TRANSLATIONS } from '../utils/translations';
import { speechWarningService } from '../services/speechWarningService';

interface AnalysisReportProps {
  language?: WarningLanguage;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({ language = 'gu' }) => {
  const [history, setHistory] = useState<SavedAnalysisRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<SavedAnalysisRecord | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'scam' | 'suspicious' | 'safe'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[language]?.analysisReport || TRANSLATIONS.gu.analysisReport;

  const loadHistory = async () => {
    const records = await fetchAnalysisHistory();
    setHistory(records);
  };

  useEffect(() => {
    loadHistory();
    const unsubscribe = subscribeToRealtimeAnalysisHistory((records) => {
      setHistory(records);
    });
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleClear = () => {
    if (window.confirm('ખરેખર બધા લૉગ્સ સાફ કરવા માંગો છો? (Are you sure you want to clear all analysis history?)')) {
      clearLocalHistory();
      setHistory([]);
    }
  };

  const handleRestoreExamples = () => {
    const restored = restoreDefaultBenchmarkLogs();
    setHistory(restored);
  };

  const handleSpeakWarning = (text?: string) => {
    if (text) {
      speechWarningService.speak(text, language);
    }
  };

  // Filter records
  const filteredHistory = history.filter((rec) => {
    const isScam = rec.riskLevel === 'critical' || rec.riskLevel === 'high' || rec.riskScore >= 75;
    const isSuspicious = (rec.riskLevel === 'suspicious' || (rec.riskScore >= 35 && rec.riskScore < 75)) && !isScam;
    const isSafe = rec.riskLevel === 'safe' || rec.riskScore < 35;

    if (filterType === 'scam' && !isScam) return false;
    if (filterType === 'suspicious' && !isSuspicious) return false;
    if (filterType === 'safe' && !isSafe) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (rec.callTitle || '').toLowerCase().includes(q);
      const matchSummary = (rec.summary || '').toLowerCase().includes(q);
      const matchEvidence = (rec.redFlagsList || []).some((f) => f.evidence.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchEvidence) return false;
    }

    return true;
  });

  const totalCalls = history.length;
  const scamCount = history.filter((r) => r.riskLevel === 'critical' || r.riskLevel === 'high' || r.riskScore >= 75).length;
  const suspiciousCount = history.filter((r) => (r.riskLevel === 'suspicious' || (r.riskScore >= 35 && r.riskScore < 75))).length;
  const safeCount = history.filter((r) => r.riskLevel === 'safe' || r.riskScore < 35).length;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {language === 'gu' ? 'વિશ્લેષણ ઇતિહાસ અને સુરક્ષા લૉગ્સ' : (language === 'hi' ? 'विश्लेषण इतिहास और सुरक्षा लॉग्स' : 'Analysis History & Security Audit Logs')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'gu'
                  ? 'કૉલનું જોખમ, સંભળાયેલા પુરાવા અને સુરક્ષા પગલાં સરળ ભાષામાં અહીં જુઓ.'
                  : (language === 'hi'
                  ? 'कॉल का जोखिम, सुने गए सबूत और सुरक्षा कदम सरल भाषा में यहाँ देखें।'
                  : 'Plain-language audit records of verified calls, evidence heard, and protective counter-measures.')}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Realtime Database: fir-data-6644c-default-rtdb.firebaseio.com</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto flex-wrap gap-2">
          <button
            onClick={handleRestoreExamples}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
            title="Restore authentic demo benchmark calls"
          >
            <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
            <span>{language === 'gu' ? 'ડેમો લૉગ્સ લોડ કરો' : 'Load Demo Logs'}</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-bold transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearBtn}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Top Stats Overview Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {language === 'gu' ? 'કુલ કૉલ્સ' : 'Total Calls'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalCalls}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 shadow-sm flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              {language === 'gu' ? 'છેતરપિંડી કૉલ્સ' : 'Scams Detected'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-rose-700 dark:text-rose-300">
              {scamCount}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 shadow-sm flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {language === 'gu' ? 'શંકાસ્પદ કૉલ્સ' : 'Suspicious Calls'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300">
              {suspiciousCount}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-sm flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {language === 'gu' ? 'સુરક્ષિત કૉલ્સ' : 'Safe Calls'}
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300">
              {safeCount}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'gu' ? 'બધા કૉલ' : 'All'} ({totalCalls})
          </button>

          <button
            onClick={() => setFilterType('scam')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'scam'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'છેતરપિંડી' : 'Scams'} ({scamCount})</span>
          </button>

          <button
            onClick={() => setFilterType('suspicious')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'suspicious'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'શંકાસ્પદ' : 'Suspicious'} ({suspiciousCount})</span>
          </button>

          <button
            onClick={() => setFilterType('safe')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === 'safe'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'સુરક્ષિત' : 'Safe'} ({safeCount})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'gu' ? 'કૉલ અથવા પુરાવા શોધો...' : 'Search calls or evidence...'}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Main Records List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <History className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            {language === 'gu' ? 'કોઈ કૉલ લૉગ્સ મળ્યા નથી' : 'No Call Logs Found'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {language === 'gu'
              ? 'તમે ફિલ્ટર બદલી શકો છો અથવા ઉપરથી "ડેમો લૉગ્સ લોડ કરો" પર ક્લિક કરી શકો છો.'
              : 'Try selecting a different filter or click "Load Demo Logs" above to view realistic examples.'}
          </p>
          <button
            onClick={handleRestoreExamples}
            className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'ડેમો લૉગ્સ લોડ કરો' : 'Load Demo Logs'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredHistory.map((rec) => {
            const isScam = rec.riskLevel === 'critical' || rec.riskLevel === 'high' || rec.riskScore >= 75;
            const isSuspicious = (rec.riskLevel === 'suspicious' || (rec.riskScore >= 35 && rec.riskScore < 75)) && !isScam;
            const isSafe = !isScam && !isSuspicious;

            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border-2 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group ${
                  isScam
                    ? 'border-rose-200 dark:border-rose-900/60 hover:border-rose-400'
                    : isSuspicious
                    ? 'border-amber-200 dark:border-amber-900/60 hover:border-amber-400'
                    : 'border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400'
                }`}
              >
                {/* Header Row: Verdict Status + Score Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                  <div className="flex items-center space-x-2.5">
                    {isScam ? (
                      <span className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                        <ShieldAlert className="w-5 h-5" />
                      </span>
                    ) : isSuspicious ? (
                      <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                      </span>
                    )}

                    <div>
                      <span
                        className={`text-xs sm:text-sm font-black uppercase tracking-wide px-3 py-1 rounded-full border ${
                          isScam
                            ? 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
                            : isSuspicious
                            ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
                        }`}
                      >
                        {rec.verdictLabel || (isScam ? '🔴 Definite Scam' : isSuspicious ? '🟡 Suspicious Phishing' : '🟢 Safe Routine Call')}
                      </span>
                    </div>
                  </div>

                  {/* Risk Score Pill */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl border ${
                        isScam
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : isSuspicious
                          ? 'bg-amber-500 text-slate-950 border-amber-600 font-black'
                          : 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      }`}
                    >
                      {rec.riskScore}/100 {language === 'gu' ? 'જોખમ સ્કોર' : 'Risk Score'}
                    </span>
                  </div>
                </div>

                {/* Call Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {rec.callTitle || 'Analyzed Call'}
                </h3>

                {/* Section 1: Plain Explanation of what happened */}
                <div className="mb-3.5 p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <span>📌</span>
                    <span>{language === 'gu' ? 'આ કૉલમાં શું બન્યું? (What Happened in this Call):' : 'What Happened in this Call:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {rec.summary}
                  </p>
                </div>

                {/* Section 2: Concrete Evidence Heard (Red Flags) */}
                {rec.redFlagsList && rec.redFlagsList.length > 0 ? (
                  <div className="mb-3.5">
                    <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>{language === 'gu' ? 'કૉલમાં સંભળાયેલા વાંધાજનક શબ્દો / પુરાવા:' : 'Exact Threats & Evidence Heard:'}</span>
                    </div>

                    <div className="space-y-1.5">
                      {rec.redFlagsList.map((flag, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs gap-1"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-mono text-[10px] font-black uppercase">
                              {flag.category.replace('_', ' ')}
                            </span>
                            <span className="font-semibold text-rose-950 dark:text-rose-100">
                              "{flag.evidence}"
                            </span>
                          </div>
                          {flag.reason && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {flag.reason}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-3.5 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>
                      {language === 'gu'
                        ? 'કોઈ ધમકી, પૈસા કે OTP ની માંગણી સંભળાઈ નથી (સંપૂર્ણ સામાન્ય વાતચીત).'
                        : 'No coercive threats, arrest claims, or OTP demands detected (verified safe routine inquiry).'}
                    </span>
                  </div>
                )}

                {/* Section 3: Recommended Action */}
                {rec.recommendedAction && (
                  <div className="mb-3.5 p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs">
                    <div className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-0.5 flex items-center space-x-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{language === 'gu' ? 'વપરાશકર્તા માટે સુરક્ષા સલાહ:' : 'Recommended Protective Action:'}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {rec.recommendedAction}
                    </p>
                  </div>
                )}

                {/* Card Footer: Metadata & Inspect Button */}
                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(rec.timestamp).toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{rec.durationSeconds}s</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {rec.warningText && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeakWarning(rec.warningText);
                        }}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px] transition-colors"
                        title="Listen to spoken safety warning"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{language === 'gu' ? 'ચેતવણી સાંભળો' : 'Hear Warning'}</span>
                      </button>
                    )}

                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                      <span>{language === 'gu' ? 'વિગતો જુઓ' : 'View Audit'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Detailed Forensic Inspection Modal */}
      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedRecord(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {selectedRecord.callTitle || 'Call Assessment Details'}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Logged on {new Date(selectedRecord.timestamp).toLocaleString()} • Duration: ~{selectedRecord.durationSeconds}s
                </p>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              {/* Verdict Banner */}
              <div
                className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
                  selectedRecord.riskScore >= 75
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-950 dark:text-rose-100'
                    : selectedRecord.riskScore >= 35
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 text-amber-950 dark:text-amber-100'
                    : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                }`}
              >
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider opacity-75">
                    Final Classification Verdict
                  </div>
                  <div className="text-base sm:text-lg font-black mt-0.5">
                    {selectedRecord.verdictLabel || (selectedRecord.riskScore >= 75 ? 'Critical Scam' : 'Safe Call')}
                  </div>
                </div>
                <div className="text-2xl font-black">
                  {selectedRecord.riskScore}/100
                </div>
              </div>

              {/* Forensic Summary */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                  Plain-Language Forensic Summary
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  {selectedRecord.summary}
                </p>
              </div>

              {/* Evidence Heard */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">
                  Exact Audio Evidence Extracted Mid-Call
                </h4>
                {selectedRecord.redFlagsList && selectedRecord.redFlagsList.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRecord.redFlagsList.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                            {f.category}
                          </span>
                          {f.severity && (
                            <span className="text-[10px] uppercase font-bold text-rose-600">
                              {f.severity} severity
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white text-xs">
                          "{f.evidence}"
                        </div>
                        {f.reason && (
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                            {f.reason}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
                    No fraud red flags detected. The conversation was genuine and non-coercive.
                  </div>
                )}
              </div>

              {/* Protective Recommendation */}
              {selectedRecord.recommendedAction && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    Protective Counter-Measures
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 font-medium">
                    {selectedRecord.recommendedAction}
                  </p>
                </div>
              )}

              {/* Spoken Warning Text */}
              {selectedRecord.warningText && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                      Spoken Safety Warning Script
                    </div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 text-xs mt-0.5">
                      "{selectedRecord.warningText}"
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeakWarning(selectedRecord.warningText)}
                    className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    title="Play voice warning"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero-Knowledge: Audio ephemeral, privacy preserved.</span>
              </span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-xs font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
