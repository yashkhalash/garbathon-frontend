import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Volume2,
  Bell,
  Check,
  Key,
  Sparkles,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { speechWarningService } from '../services/speechWarningService';
import {
  fetchGeminiSettings,
  updateGeminiSettings,
  deleteGeminiKey,
  testGeminiKey,
  GeminiSettings,
  TestKeyResult,
} from '../services/geminiSettingsService';

interface SettingsProps {
  language: WarningLanguage;
  setLanguage: (lang: WarningLanguage) => void;
}

export const Settings: React.FC<SettingsProps> = ({ language, setLanguage }) => {
  // Existing Preferences
  const [spokenEnabled, setSpokenEnabled] = useState(speechWarningService.getIsEnabled());
  const [relationship, setRelationship] = useState(localStorage.getItem('suraksha_relationship') || 'father');
  const [contactName, setContactName] = useState(localStorage.getItem('suraksha_contact_name') || 'Ramesh Kumar');
  const [familyPhone, setFamilyPhone] = useState(localStorage.getItem('suraksha_family_phone') || '+91 98250 12345');
  const [saved, setSaved] = useState(false);

  // Gemini Model & Key States
  const [geminiSettings, setGeminiSettings] = useState<GeminiSettings | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [isTestingKey, setIsTestingKey] = useState<boolean>(false);
  const [isSavingKey, setIsSavingKey] = useState<boolean>(false);
  const [isDeletingKey, setIsDeletingKey] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestKeyResult | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await fetchGeminiSettings();
    setGeminiSettings(data);
    setSelectedModel(data.model);
  };

  const handleToggleVoice = (checked: boolean) => {
    setSpokenEnabled(checked);
    speechWarningService.setEnabled(checked);
  };

  const handleSaveContactPrefs = () => {
    localStorage.setItem('suraksha_relationship', relationship);
    localStorage.setItem('suraksha_contact_name', contactName);
    localStorage.setItem('suraksha_family_phone', familyPhone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleModelChange = async (newModel: string) => {
    setSelectedModel(newModel);
    try {
      const updated = await updateGeminiSettings(newModel);
      setGeminiSettings(updated);
      setFeedbackMsg({
        type: 'success',
        text: `Active model switched to ${newModel}.`,
      });
      setTimeout(() => setFeedbackMsg(null), 3000);
    } catch {
      setFeedbackMsg({
        type: 'error',
        text: 'Failed to update model on backend.',
      });
    }
  };

  const handleSaveOrUpdateKey = async () => {
    if (!apiKeyInput.trim()) return;
    setIsSavingKey(true);
    setFeedbackMsg(null);
    try {
      const updated = await updateGeminiSettings(selectedModel, apiKeyInput.trim());
      setGeminiSettings(updated);
      setApiKeyInput('');
      if (updated.status === 'active') {
        setFeedbackMsg({
          type: 'success',
          text: `Gemini API key successfully saved and verified! ${updated.status_message}`,
        });
      } else if (updated.status === 'rate_limited') {
        setFeedbackMsg({
          type: 'warning',
          text: `Key saved, but: ${updated.status_message}`,
        });
      } else {
        setFeedbackMsg({
          type: 'error',
          text: `Key saved with warnings: ${updated.status_message}`,
        });
      }
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err?.message || 'Failed to save API key.',
      });
    } finally {
      setIsSavingKey(false);
    }
  };

  const handleDeleteKey = async () => {
    setIsDeletingKey(true);
    setFeedbackMsg(null);
    try {
      const updated = await deleteGeminiKey();
      setGeminiSettings(updated);
      setApiKeyInput('');
      setTestResult(null);
      setFeedbackMsg({
        type: 'success',
        text: 'Custom API key removed. Reverted to server default or demo mode.',
      });
      setTimeout(() => setFeedbackMsg(null), 4000);
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err?.message || 'Failed to delete key.',
      });
    } finally {
      setIsDeletingKey(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTestingKey(true);
    setTestResult(null);
    try {
      const targetKey = apiKeyInput.trim() ? apiKeyInput.trim() : undefined;
      const res = await testGeminiKey(targetKey, selectedModel);
      setTestResult(res);
      if (geminiSettings) {
        setGeminiSettings({
          ...geminiSettings,
          status: res.status as any,
          status_message: res.status_message,
          latency_ms: res.latency_ms,
        });
      }
    } catch (err: any) {
      setTestResult({
        is_active: false,
        status: 'error',
        status_message: err?.message || 'Connection test failed.',
        latency_ms: null,
        model: selectedModel,
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h2 className="text-xl sm:text-2xl font-black text-navy-900 dark:text-white mb-1 flex items-center space-x-2.5">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
          <span>Suraksha AI Settings &amp; Engine Configuration</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Manage Google Gemini model selection, custom API keys, real-time rate limit health checks, and emergency safety preferences.
        </p>
      </div>

      {/* 1. GOOGLE GEMINI MODEL & API KEY MANAGEMENT */}
      <div
        data-testid="gemini-settings-section"
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-6 transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-black text-navy-900 dark:text-white">
              Google Gemini AI Model Selection
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-400/30">
            Real AI Engine
          </span>
        </div>

        {/* Model Selection Options */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Model (Gemini 2.5 Flash is recommended for real-time scam audio streams):
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(geminiSettings?.supported_models || [
              {
                id: 'gemini-2.5-flash',
                name: 'Gemini 2.5 Flash',
                description: 'Recommended: Ultra-fast native audio understanding, lowest latency, high rate limits.',
                is_recommended: true,
              },
              {
                id: 'gemini-2.0-flash',
                name: 'Gemini 2.0 Flash',
                description: 'Fast multimodal reasoning model.',
                is_recommended: false,
              },
              {
                id: 'gemini-1.5-flash',
                name: 'Gemini 1.5 Flash',
                description: 'Standard lightweight audio model.',
                is_recommended: false,
              },
              {
                id: 'gemini-2.5-pro',
                name: 'Gemini 2.5 Pro',
                description: 'Deep thinking model for complex multi-party financial extortion calls.',
                is_recommended: false,
              },
            ]).map((m) => {
              const isSelected = selectedModel === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleModelChange(m.id)}
                  data-testid={`model-option-${m.id}`}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-sm text-navy-900 dark:text-white flex items-center space-x-1.5">
                      <span>{m.name}</span>
                      {m.is_recommended && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wide">
                          (Recommended)
                        </span>
                      )}
                    </span>
                    <input
                      type="radio"
                      name="gemini_model"
                      checked={isSelected}
                      onChange={() => handleModelChange(m.id)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. GOOGLE GEMINI API KEY MANAGEMENT (ADD, UPDATE, DELETE) */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="text-sm font-bold text-navy-900 dark:text-white">
                  Google Gemini API Key (Add, Update, Delete)
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage your API key directly in the web UI. You do not need to edit server <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">.env</code> files.
              </p>
            </div>

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 underline self-start sm:self-center"
            >
              <span>Get Free Key at Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Current Key Status Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Active Key Status
              </span>
              <div className="flex items-center space-x-2">
                {geminiSettings?.status === 'active' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : geminiSettings?.status === 'rate_limited' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                )}

                <span
                  data-testid="key-status-badge"
                  className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                    geminiSettings?.status === 'active'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300'
                      : geminiSettings?.status === 'rate_limited'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 animate-pulse'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                  }`}
                >
                  {geminiSettings?.status === 'active'
                    ? '🟢 Active & Operational'
                    : geminiSettings?.status === 'rate_limited'
                    ? '🟡 Rate Limit Reached (429)'
                    : geminiSettings?.has_active_key
                    ? '🔴 Invalid / Auth Error'
                    : '⚪ No Key (Demo Mode)'}
                </span>

                {geminiSettings?.has_custom_key && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200">
                    Custom Key Saved
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 font-medium">
                {geminiSettings?.status_message}
                {geminiSettings?.masked_key && (
                  <span className="ml-2 font-mono text-slate-500 dark:text-slate-400 font-bold">
                    ({geminiSettings.masked_key})
                  </span>
                )}
              </p>
            </div>

            {/* Delete / Clear Custom Key button */}
            {geminiSettings?.has_custom_key && (
              <button
                onClick={handleDeleteKey}
                disabled={isDeletingKey}
                data-testid="delete-gemini-key-btn"
                className="px-3.5 py-2 rounded-xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-all flex items-center space-x-1.5 self-start sm:self-center"
                title="Delete custom key and revert to system environment key"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeletingKey ? 'Deleting...' : 'Delete Key'}</span>
              </button>
            )}
          </div>

          {/* Input field to Add or Update Key */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Enter New or Updated Gemini API Key:
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                data-testid="gemini-api-key-input"
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl pl-4 pr-11 py-2.5 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title={showApiKey ? 'Hide key' : 'Show key'}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleSaveOrUpdateKey}
                disabled={isSavingKey || !apiKeyInput.trim()}
                data-testid="save-gemini-key-btn"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{isSavingKey ? 'Verifying & Saving...' : 'Add / Update API Key'}</span>
              </button>

              <button
                onClick={handleTestConnection}
                disabled={isTestingKey}
                data-testid="test-gemini-key-btn"
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-all active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingKey ? 'animate-spin' : ''}`} />
                <span>{isTestingKey ? 'Testing Limits...' : 'Test Connection & Limits'}</span>
              </button>
            </div>
          </div>

          {/* Test Result Callout */}
          {testResult && (
            <div
              data-testid="gemini-test-result"
              className={`p-4 rounded-2xl border-2 animate-in fade-in duration-200 ${
                testResult.is_active
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                  : testResult.status === 'rate_limited'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center space-x-2 font-black text-xs sm:text-sm">
                {testResult.is_active ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ) : testResult.status === 'rate_limited' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                )}
                <span>
                  {testResult.is_active
                    ? 'Connection Succeeded'
                    : testResult.status === 'rate_limited'
                    ? 'Rate Limit / Quota Limit Reached'
                    : 'Connection Failed'}
                </span>
                {testResult.latency_ms && (
                  <span className="font-mono text-xs font-bold opacity-80">
                    ({testResult.latency_ms}ms)
                  </span>
                )}
              </div>
              <p className="text-xs mt-1 leading-relaxed font-medium">
                {testResult.status_message}
              </p>
            </div>
          )}

          {/* Feedback notification toast */}
          {feedbackMsg && (
            <div
              className={`p-3 rounded-xl text-xs font-bold ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : feedbackMsg.type === 'warning'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}
            >
              {feedbackMsg.text}
            </div>
          )}
        </div>
      </div>

      {/* 3. INTERVENTION LANGUAGE & SPOKEN VOICE PREFERENCES */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        {/* Intervention Language */}
        <div>
          <label className="block text-sm font-bold text-navy-900 dark:text-white mb-1">
            Intervention Warning Language
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            On-screen safety alerts and spoken voice warnings will be rendered in this language.
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as WarningLanguage)}
            className="w-full sm:w-80 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="gu">ગુજરાતી (Gujarati) — ભલામણ કરેલ</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="en">English (Universal)</option>
          </select>
        </div>

        {/* Spoken Alerts Toggle */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-navy-900 dark:text-white">
                Spoken Voice Safety Warnings (Mid-Call)
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calmly speaks warnings aloud in Gujarati or Hindi for seniors who struggle reading small phone screens during panic.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={spokenEnabled}
              onChange={(e) => handleToggleVoice(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Emergency Contact & Relationship (Isolation Breaker) */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-navy-900 dark:text-white">
              Emergency Contact &amp; Family Relationship
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            When a Digital Arrest or OTP theft is identified, Suraksha AI breaks the scammer's isolation by drafting an urgent message:
            <br />
            <em className="text-slate-700 dark:text-slate-300 font-medium">
              "Your {relationship} ({contactName}) may be on a scam call right now. Please call him immediately."
            </em>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Relationship
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
              >
                <option value="father">Father (પિતા)</option>
                <option value="mother">Mother (માતા)</option>
                <option value="grandfather">Grandfather (દાદા)</option>
                <option value="grandmother">Grandmother (દાદી)</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="relative">Relative</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Ramesh Kumar"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Emergency Phone Number
              </label>
              <input
                type="text"
                value={familyPhone}
                onChange={(e) => setFamilyPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98250 12345"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={handleSaveContactPrefs}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
            <span>{saved ? 'Saved Successfully!' : 'Save Preferences'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
