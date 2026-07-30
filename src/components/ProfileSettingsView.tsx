import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Bell, 
  ShieldCheck, 
  HardDrive, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Zap, 
  Laptop, 
  Smartphone, 
  Lock, 
  SlidersHorizontal,
  Mail,
  RefreshCw
} from 'lucide-react';
import { UserPlan, VaultDocument } from '../types';

interface ProfileSettingsViewProps {
  userPlan: UserPlan;
  documents: VaultDocument[];
  userEmail: string;
  onOpenPricing: () => void;
  onExportCSV: (docs: VaultDocument[]) => void;
  onLogout?: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  userPlan,
  documents,
  userEmail,
  onOpenPricing,
  onExportCSV,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api' | 'reminders'>('profile');
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('vlt_live_9f88e1a74c20b410d8a5bc9002e11a');

  const userInitials = userEmail
    ? userEmail.split('@')[0].substring(0, 2).toUpperCase()
    : 'PM';
  const userName = userEmail
    ? userEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'PaperMind User';
  
  // Custom reminder intervals
  const [reminderDays, setReminderDays] = useState({
    d90: true,
    d60: true,
    d30: true,
    d15: true,
    d7: true,
    d1: true,
  });

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `vlt_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
  };

  const storagePct = Math.min(100, Math.round((userPlan.storageUsedMB / userPlan.storageLimitMB) * 100));

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-xs shrink-0">
            {userInitials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {userName} <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] border border-blue-200 dark:border-blue-800 font-semibold">{userPlan.tier} Member</span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-slate-400">{userEmail || 'user@papermind.ai'} • Private Storage Vault</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => onExportCSV(documents)}
            className="px-4 py-2.5 bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-800 dark:text-white rounded-xl text-xs font-semibold hover:bg-gray-100 dark:hover:bg-[#25262c] transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4 text-blue-600" />
            <span>Export Full Vault Data</span>
          </button>
          
          <button
            onClick={onOpenPricing}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <Zap className="h-4 w-4" />
            <span>Upgrade Plan</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-900/40 rounded-xl text-xs font-bold transition-all"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-gray-200 dark:border-white/10 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile &amp; Storage</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'api'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Developer API Keys</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'reminders'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Reminder Intervals</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'security'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Security &amp; Sessions</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & STORAGE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-blue-600" /> Vault Storage Usage
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-slate-300">
                <span>Storage Occupied</span>
                <span className="font-bold text-gray-900 dark:text-white">{userPlan.storageUsedMB} MB / {userPlan.storageLimitMB} MB</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 p-0.5">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${storagePct}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">
                Includes original file attachments, OCR vector indexes, and document thumbnails.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 dark:text-slate-300">Processed Documents Count</span>
                <span className="font-bold text-gray-900 dark:text-white">{documents.length} / {userPlan.documentsLimit}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 dark:text-slate-300">Auto-OCR Precision Level</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">99.8% High Accuracy</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="h-4 w-4 text-purple-600 dark:text-purple-400" /> Personal Account Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-gray-500 dark:text-slate-400 font-semibold">Full Display Name</label>
                <input 
                  type="text" 
                  defaultValue="Rishanth R" 
                  className="w-full bg-gray-50 dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600" 
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-500 dark:text-slate-400 font-semibold">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="rishanthr50@gmail.com" 
                  className="w-full bg-gray-50 dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600" 
                />
              </div>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-xs">
                Save Account Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: API KEYS */}
      {activeTab === 'api' && (
        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-amber-600 dark:text-amber-400" /> PaperMind REST API Keys
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Use your secret API keys to integrate OCR extraction, automated uploads, and document chat directly into your apps or Webhooks.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-slate-300">Live Secret Key</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 font-bold">Active</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full bg-white dark:bg-[#0B0B0F] border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 font-mono text-xs text-blue-600 font-bold focus:outline-none"
              />
              <button
                onClick={handleCopyApiKey}
                className="px-3 py-2 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-xl text-xs font-semibold text-gray-800 dark:text-white flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copiedApiKey ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copiedApiKey ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleRegenerateKey}
                className="p-2 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-xl text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white shrink-0 transition-colors"
                title="Regenerate Key"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-2xl text-xs space-y-1">
            <p className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" /> SDK Endpoint Quickstart
            </p>
            <p className="font-mono text-[11px] text-gray-700 dark:text-slate-300">
              curl -X POST "https://papermind.ai/api/v1/extract" -H "Authorization: Bearer {apiKey}" -F "file=@invoice.pdf"
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: REMINDER INTERVALS */}
      {activeTab === 'reminders' && (
        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-600 dark:text-amber-400" /> Custom Lead-Time Notification Thresholds
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Select when PaperMind should dispatch email, in-app dashboard, and push notifications prior to warranty or document expiry.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { id: 'd90', label: '90 Days Prior', desc: 'Quarterly Heads Up' },
              { id: 'd60', label: '60 Days Prior', desc: 'Early Renewal Window' },
              { id: 'd30', label: '30 Days Prior', desc: 'Standard Notice' },
              { id: 'd15', label: '15 Days Prior', desc: 'Urgent Alert' },
              { id: 'd7', label: '7 Days Prior', desc: 'Final Week Warning' },
              { id: 'd1', label: '1 Day Prior', desc: 'Last Chance Reminder' },
            ].map((item) => {
              const key = item.id as keyof typeof reminderDays;
              const isChecked = reminderDays[key];
              return (
                <button
                  key={item.id}
                  onClick={() => setReminderDays((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isChecked
                      ? 'bg-blue-50/60 dark:bg-[#4F8CFF]/10 border-blue-500 dark:border-[#4F8CFF] text-gray-900 dark:text-white shadow-xs'
                      : 'bg-gray-50 dark:bg-[#15161A] border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-400 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{item.label}</span>
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-gray-300 dark:border-white/20'}`}>
                      {isChecked && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-slate-400">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Active Connected Sessions
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 dark:bg-[#15161A] rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Laptop className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Chrome on macOS (Current)</p>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">San Francisco, USA • 192.168.1.45</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">Active Now</span>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-[#15161A] rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">PaperMind iOS App</p>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400">iPhone 15 Pro • 3 hours ago</p>
                  </div>
                </div>
                <button className="text-[11px] text-red-600 hover:underline font-semibold">Revoke</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-600 dark:text-cyan-400" /> Security Controls
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#15161A] rounded-2xl border border-gray-200 dark:border-white/10">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">Authenticator App or YubiKey</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">Enabled</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#15161A] rounded-2xl border border-gray-200 dark:border-white/10">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Automated Daily Encryption Backup</p>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">Encrypted snapshot to cloud cold storage</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-[#4F8CFF]/10 text-blue-700 dark:text-[#4F8CFF] text-[11px] font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
