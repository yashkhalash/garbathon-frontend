import React, { useState, useRef, useEffect } from 'react';
import { AadhaarVaultBanner } from "../components/AadhaarVaultBanner";
import { StepGuide } from '../components/StepGuide';
import { AudioUploader } from '../components/AudioUploader';
import { AudioPlayer } from '../components/AudioPlayer';
import { LiveMonitoringPanel } from '../components/LiveMonitoringPanel';
import { RiskAssessmentCard } from '../components/RiskAssessmentCard';
import { RedFlagCard } from '../components/RedFlagCard';
import { WarningPanel } from '../components/WarningPanel';
import { AnalysisTimeline } from '../components/AnalysisTimeline';
import { PrivacyNotice } from '../components/PrivacyNotice';
import { IndiaScamAnalytics } from '../components/IndiaScamAnalytics';
import { AnimatedHowItWorks } from '../components/AnimatedHowItWorks';
import { DashboardSkeleton } from '../components/DashboardSkeleton';
import { NewFeaturesGrid } from '../components/features/NewFeaturesGrid';
import {
  StructuredAIResponse,
  WarningLanguage,
  AudioChunk,
  RedFlag,
  TimelineEvent,
  RiskLevel,
  SpamClassification,
  DemoCallPreset,
} from '../types/analysis';
import { splitAudioIntoWavChunks } from '../services/audioProcessor';
import { analyzeAudioChunk, DEMO_PRESETS } from '../services/scamAnalysisService';
import { speechWarningService } from '../services/speechWarningService';
import { saveAnalysisSummary } from '../services/firebase';
import { TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundManager';

interface DashboardProps {
  language: WarningLanguage;
  isDemoMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ language, isDemoMode }) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Audio playback states
  const [audioUrl, setAudioUrl] = useState<string | null>(DEMO_PRESETS[0].audioUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(DEMO_PRESETS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(DEMO_PRESETS[0].durationSeconds);

  // Analysis engine states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<AudioChunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isProcessingChunk, setIsProcessingChunk] = useState<boolean>(false);
  const [lastAnalysisTimestamp, setLastAnalysisTimestamp] = useState<number | null>(null);

  // Analysis Results
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('safe');
  const [riskScore, setRiskScore] = useState<number>(0);
  const [spamTier, setSpamTier] = useState<SpamClassification>('definite_spam');
  const [summary, setSummary] = useState<string>('Select an audio recording to start real-time scam assessment.');
  const [warningText, setWarningText] = useState<string>('સાવધાન! આ કોલમાં છેતરપિંડીનાં સંકેતો છે.');
  const [shouldWarn, setShouldWarn] = useState<boolean>(false);
  const [recommendedActions, setRecommendedActions] = useState<string[]>([
    'Do not share an OTP or banking passwords.',
    'Do not transfer money under urgency or fear.',
    'Verify caller claims independently through an official channel.',
  ]);
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [contextSummary, setContextSummary] = useState<string>('');

  // Emergency contact preferences
  const [relationship, setRelationship] = useState<string>('father');
  const [contactName, setContactName] = useState<string>('Ramesh Kumar');

  const t = TRANSLATIONS[language] || TRANSLATIONS.gu;

  useEffect(() => {
    const savedRel = localStorage.getItem('suraksha_relationship');
    const savedName = localStorage.getItem('suraksha_contact_name');
    if (savedRel) setRelationship(savedRel);
    if (savedName) setContactName(savedName);

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const isAnalyzingRef = useRef(isAnalyzing);
  isAnalyzingRef.current = isAnalyzing;
  const activePresetIdRef = useRef(selectedPresetId);
  activePresetIdRef.current = selectedPresetId;

  // Handle Preset or File Selection
  const handleAudioSelected = async (file: File | null, presetUrl?: string, preset?: DemoCallPreset) => {
    soundManager.stopAll();
    stopAnalysis();
    setIsPlaying(false);
    setCurrentTime(0);
    setRedFlags([]);
    setTimelineEvents([]);
    setRiskScore(0);
    setRiskLevel('safe');
    setShouldWarn(false);
    setContextSummary('');
    setCurrentStep(1);

    if (preset) {
      setAudioUrl(preset.audioUrl);
      setSelectedFile(null);
      setSelectedPresetId(preset.id);
      setDuration(preset.durationSeconds);
      setSpamTier(preset.spamTier);
      setSummary(`Ready to analyze: ${preset.name}`);
    } else if (file) {
      setSelectedFile(file);
      setSelectedPresetId(null);
      const objectUrl = URL.createObjectURL(file);
      setAudioUrl(objectUrl);
      setSummary(`Uploaded ${file.name}. Ready for chunked streaming analysis.`);
    }
  };

  // Start Real-Time AI Analysis
  const startAnalysis = async () => {
    if (!audioUrl) return;

    setIsAnalyzing(true);
    setIsPlaying(true);
    setCurrentStep(2);
    setSummary('Splitting incoming voice stream into short 5s chunks for mid-call detection...');

    try {
      let fileOrBlob: Blob;
      if (selectedFile) {
        fileOrBlob = selectedFile;
      } else {
        const resp = await fetch(audioUrl);
        fileOrBlob = await resp.blob();
      }

      const chunks = await splitAudioIntoWavChunks(fileOrBlob, 5, 1.2);
      setAudioChunks(chunks);
      setCurrentChunkIndex(0);

      setTimelineEvents([
        {
          id: `evt_start_${Date.now()}`,
          timestampSeconds: 0,
          label: 'Audio stream initiated. Gemini Native Audio analysis listening live.',
          severity: 'info',
          type: 'info',
        },
      ]);

      processChunkSequentially(chunks, 0, '');
    } catch (err) {
      console.error("Error splitting or starting chunks:", err);
      setIsAnalyzing(false);
      setSummary('Failed to process audio file for analysis.');
    }
  };

  const processChunkSequentially = async (
    chunks: AudioChunk[],
    index: number,
    runningContext: string
  ) => {
    if (!isAnalyzingRef.current || index >= chunks.length) {
      if (index >= chunks.length && chunks.length > 0) {
        finishAnalysis();
      }
      return;
    }

    const chunk = chunks[index];
    setCurrentChunkIndex(index);
    setIsProcessingChunk(true);

    try {
      const response: StructuredAIResponse = await analyzeAudioChunk(
        chunk,
        runningContext,
        language,
        isDemoMode,
        activePresetIdRef.current || undefined
      );

      setRiskLevel(response.risk_level);
      setRiskScore(response.risk_score);
      if (response.spam_classification) {
        setSpamTier(response.spam_classification);
      }
      setSummary(response.summary);
      setWarningText(response.warning_text);
      setShouldWarn(response.should_warn);
      if (response.recommended_actions?.length > 0) {
        setRecommendedActions(response.recommended_actions);
      }

      if (response.should_warn) {
        setCurrentStep(3);
      }

      // Add newly detected red flags without duplicates
      if (response.red_flags && response.red_flags.length > 0) {
        setRedFlags((prev) => {
          const existingEvidence = new Set(prev.map((f) => f.evidence));
          const newUnique = response.red_flags.filter((f) => !existingEvidence.has(f.evidence));
          return [...prev, ...newUnique];
        });

        const newEvts: TimelineEvent[] = response.red_flags.map((rf) => ({
          id: `evt_flag_${Date.now()}_${Math.random()}`,
          timestampSeconds: rf.timestamp_seconds,
          label: `${rf.category}: ${rf.evidence}`,
          category: rf.category,
          severity: rf.severity,
          type: 'flag',
          details: rf.reason,
        }));

        setTimelineEvents((prev) => [...prev, ...newEvts]);
      }

      // Speak natural female voice warning aloud automatically mid-call if high risk
      if (response.should_warn && response.risk_score >= 65 && !shouldWarn) {
        speechWarningService.speak(response.warning_text, language);
        setTimelineEvents((prev) => [
          ...prev,
          {
            id: `evt_warn_${Date.now()}`,
            timestampSeconds: Math.round(chunk.startTime),
            label: `Spoken Mid-Call Safety Warning (Female Voice): "${response.warning_text}"`,
            severity: 'critical',
            type: 'warning',
          },
        ]);
      }

      const nextContext = response.context_summary || runningContext;
      setContextSummary(nextContext);
      setLastAnalysisTimestamp(Date.now());
    } catch (e) {
      console.warn("Chunk processing step error:", e);
    } finally {
      setIsProcessingChunk(false);
    }

    const delay = Math.max(1200, (chunk.endTime - chunk.startTime) * 450);
    setTimeout(() => {
      if (isAnalyzingRef.current) {
        processChunkSequentially(chunks, index + 1, runningContext);
      }
    }, delay);
  };

  const stopAnalysis = () => {
    soundManager.stopAll();
    setIsAnalyzing(false);
    setIsPlaying(false);
    setIsProcessingChunk(false);
    speechWarningService.stop();
  };

  const finishAnalysis = () => {
    setIsAnalyzing(false);
    setIsPlaying(false);
    setIsProcessingChunk(false);

    saveAnalysisSummary({
      timestamp: Date.now(),
      durationSeconds: Math.round(duration),
      riskLevel: riskLevel,
      riskScore: riskScore,
      summary: summary,
      redFlagCount: redFlags.length,
      categories: Array.from(new Set(redFlags.map((r) => r.category))),
    });

    setTimelineEvents((prev) => [
      ...prev,
      {
        id: `evt_finish_${Date.now()}`,
        timestampSeconds: Math.round(duration),
        label: `Call finished. Final risk assessment: ${riskLevel.toUpperCase()} (${riskScore}/100)`,
        severity: riskLevel === 'critical' || riskLevel === 'high' ? 'critical' : 'info',
        type: 'action',
      },
    ]);
  };

  const handleSeekTo = (timeSec: number) => {
    setCurrentTime(timeSec);
  };

  const handleSendFamilyAlert = async () => {
    setCurrentStep(4);
    try {
      await fetch('/api/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          call_id: `call_${Date.now()}`,
          risk: riskScore,
          scam_type: redFlags[0]?.category || 'DIGITAL_ARREST',
          contact_name: `${relationship} (${contactName})`,
        }),
      });
    } catch (err) {
      console.warn("Family alert API note:", err);
    }
  };

  if (isInitialLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Unique Feature: Aadhaar Vault Banner */}
      <AadhaarVaultBanner language={language} />

      {/* Animated Walkthrough: How To Use Suraksha AI in 4 Steps */}
      <AnimatedHowItWorks language={language} />

      {/* 4-Step Visual Progress Guide */}
      <StepGuide currentStep={currentStep} language={language} />

      {/* Top Banner: Immediate Safety Warning displayed mid-call */}
      {shouldWarn && (
        <WarningPanel
          warningText={warningText}
          language={language}
          shouldWarn={shouldWarn}
          recommendedActions={recommendedActions}
          riskScore={riskScore}
          onSendFamilyAlert={handleSendFamilyAlert}
          relationship={relationship}
          contactName={contactName}
        />
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio Input & Playback Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AudioUploader
            onAudioSelected={handleAudioSelected}
            selectedPresetId={selectedPresetId}
            setSelectedPresetId={setSelectedPresetId}
            isAnalyzing={isAnalyzing}
            language={language}
          />

          <AudioPlayer
            audioUrl={audioUrl}
            isPlaying={isPlaying}
            isAnalyzing={isAnalyzing}
            currentTime={currentTime}
            duration={duration}
            language={language}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onRestart={() => {
              setCurrentTime(0);
              setIsPlaying(true);
            }}
            onTimeUpdate={(t) => setCurrentTime(t)}
            onDurationChange={(d) => setDuration(d)}
            onEnded={() => {
              setIsPlaying(false);
              if (isAnalyzing) finishAnalysis();
            }}
            onStartAnalysis={startAnalysis}
            onStopAnalysis={stopAnalysis}
          />

          <LiveMonitoringPanel
            currentChunkIndex={currentChunkIndex}
            totalChunks={audioChunks.length}
            isProcessingChunk={isProcessingChunk}
            currentTime={currentTime}
            lastAnalysisTimestamp={lastAnalysisTimestamp}
          />
        </div>

        {/* Right Column: Live Risk Meter & Red Flags (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <RiskAssessmentCard
            riskLevel={riskLevel}
            riskScore={riskScore}
            summary={summary}
            spamTier={spamTier}
            language={language}
          />

          {/* Red Flags Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                {t.redFlags.title} ({redFlags.length})
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {t.redFlags.evidenceTitle}
              </span>
            </div>

            {redFlags.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.redFlags.emptyText}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {redFlags.map((flag) => (
                  <RedFlagCard
                    key={flag.id}
                    flag={flag}
                    language={language}
                    onSeekTo={handleSeekTo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Government Cybercrime Analytics (I4C & NCRB Demographics) */}
      <IndiaScamAnalytics language={language} />

      {/* 5 Unique Features Suite with Animated NEW badges (GenZ & Older Persons) */}
      <NewFeaturesGrid
        language={language}
        contactName={contactName}
        relationship={relationship}
      />

      {/* Chronological Timeline */}
      <AnalysisTimeline
        events={timelineEvents}
        onSeekTo={handleSeekTo}
      />

      {/* Privacy Notice */}
      <PrivacyNotice />
    </div>
  );
};
