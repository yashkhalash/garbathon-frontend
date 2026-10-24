import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, Bell, Check, UserCheck, Shield } from 'lucide-react';
import { WarningLanguage } from '../types/analysis';
import { speechWarningService } from '../services/speechWarningService';

interface SettingsProps {
  language: WarningLanguage;
  setLanguage: (lang: WarningLanguage) => void;
}

export const Settings: React.FC<SettingsProps> = ({ language, setLanguage }) => {
  const [spokenEnabled, setSpokenEnabled] = useState(speechWarningService.getIsEnabled());
  const [relationship, setRelationship] = useState(localStorage.getItem('suraksha_relationship') || 'father');
  const [contactName, setContactName] = useState(localStorage.getItem('suraksha_contact_name') || 'Ramesh Kumar');
  const [familyPhone, setFamilyPhone] = useState(localStorage.getItem('suraksha_family_phone') || '+91 98250 12345');
  const [saved, setSaved] = useState(false);

  const handleToggleVoice = (checked: boolean) => {
    setSpokenEnabled(checked);
    speechWarningService.setEnabled(checked);
  };

  const handleSave = () => {
    localStorage.setItem('suraksha_relationship', relationship);
    localStorage.setItem('suraksha_contact_name', contactName);
    localStorage.setItem('suraksha_family_phone', familyPhone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-extrabold text-navy-900 mb-1 flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-blue-600" />
          <span>Suraksha AI Safety Settings</span>
        </h2>
        <p className="text-xs text-slate-500">
          Configure preferred language for scam intervention, voice speech alerts, and emergency contact details to break victim isolation.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        {/* Intervention Language */}
        <div>
          <label className="block text-sm font-bold text-navy-900 mb-1">
            Intervention Warning Language
          </label>
          <p className="text-xs text-slate-500 mb-2">
            On-screen safety alerts and spoken voice warnings will be rendered in this language.
          </p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as WarningLanguage)}
            className="w-full sm:w-80 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="gu">ગુજરાતી (Gujarati) — ભલામણ કરેલ</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="en">English (Universal)</option>
          </select>
        </div>

        {/* Spoken Alerts Toggle */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-navy-900">
                Spoken Voice Safety Warnings (Mid-Call)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
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
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-bold text-navy-900">
              Emergency Contact &amp; Family Relationship
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            When a Digital Arrest or OTP theft is identified, Suraksha AI breaks the scammer's isolation by drafting an urgent message:
            <br />
            <em className="text-slate-700 font-medium">"Your {relationship} ({contactName}) may be on a scam call right now. Please call him immediately."</em>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Relationship
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Ramesh Kumar"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Emergency Phone Number
              </label>
              <input
                type="text"
                value={familyPhone}
                onChange={(e) => setFamilyPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98250 12345"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
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
