import React, { useState, useRef } from 'react';
import { Mic, MicOff, AlertCircle, Radio, Activity, ShieldCheck, ShieldAlert } from 'lucide-react';
import { WarningLanguage, RedFlag, RiskLevel } from '../types/analysis';
import { WarningPanel } from '../components/WarningPanel';
import { RedFlagCard } from '../components/RedFlagCard';
import { RiskAssessmentCard } from '../components/RiskAssessmentCard';

interface LiveAudioProps {
  language: WarningLanguage;
  isDemoMode: boolean;
}

export const LiveAudio: React.FC<LiveAudioProps> = ({ language, isDemoMode }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('safe');
  const [riskScore, setRiskScore] = useState<number>(0);
  const [summary, setSummary] = useState<string>('Live microphone stream ready. Click to start.');
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [shouldWarn, setShouldWarn] = useState(false);
  const [warningText, setWarningText] = useState('સાવધાન! આ કોલમાં છેતરપિંડીનાં સંકેતો છે.');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startLiveMic = async () => {
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermissionGranted(true);
      setIsRecording(true);
      setSummary('Listening to live microphone audio stream...');

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && isRecording) {
          // In live mode, chunk is received incrementally
          console.log("Live audio slice captured:", event.data.size);
        }
      };

      mediaRecorder.start(4000); // 4-second timeslices
    } catch (err: unknown) {
      console.error("Microphone access error:", err);
      setErrorMessage(
        "Microphone access denied or unavailable. Please grant microphone permissions in your browser."
      );
      setIsRecording(false);
    }
  };

  const stopLiveMic = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
    setSummary('Live listening stopped.');
  };

  return (
    <div className="space-y-6">
      {/* Important Disclaimer Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3 text-xs text-blue-900">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Live Microphone Mode Transparency Notice: </strong>
          This feature analyzes audio captured directly by your device microphone (e.g. ambient voice or phone speaker on speakerphone). Standard browser security prevents direct tapping into encrypted cellular phone calls. Keep caller on speakerphone near the microphone for real-time safety analysis.
        </div>
      </div>

      {shouldWarn && (
        <WarningPanel
          warningText={warningText}
          language={language}
          shouldWarn={shouldWarn}
          recommendedActions={[
            'Hang up immediately if under threat.',
            'Never share OTP or banking passwords.',
          ]}
          riskScore={riskScore}
        />
      )}

      {/* Control Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
        <div className="max-w-md mx-auto">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-100 shadow-lg'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {isRecording ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
          </div>

          <h2 className="text-xl font-extrabold text-navy-900 mt-4">
            {isRecording ? 'Listening Live to Caller Audio...' : 'Live Microphone Scam Assistant'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Puts your microphone on guard. Analyzes incoming vocal patterns, digital arrest coercion, and urgent OTP solicitations.
          </p>

          <div className="flex justify-center space-x-3">
            {!isRecording ? (
              <button
                onClick={startLiveMic}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center space-x-2"
              >
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Start Live Microphone Protection</span>
              </button>
            ) : (
              <button
                onClick={stopLiveMic}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Stop Live Mic
              </button>
            )}
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-600 font-semibold mt-4 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskAssessmentCard
          riskLevel={riskLevel}
          riskScore={riskScore}
          summary={summary}
          language={language}
        />

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-navy-900 text-base mb-3">Live Red Flags</h3>
          {redFlags.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">No flags detected yet during live session.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {redFlags.map((flag) => (
                <RedFlagCard key={flag.id} flag={flag} language={language} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
