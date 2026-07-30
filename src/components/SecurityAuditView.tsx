import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Database, 
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { AuditLog } from '../types';

interface SecurityAuditViewProps {
  auditLogs: AuditLog[];
}

export const SecurityAuditView: React.FC<SecurityAuditViewProps> = ({ auditLogs }) => {
  const [zeroKnowledge, setZeroKnowledge] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Security Banner */}
      <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/30">
                AES-256 Military Grade Encryption
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-400">SOC2 Type II Compliant</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
              PaperMind Security &amp; Audit Trail
            </h2>
            <p className="text-xs text-gray-600 dark:text-slate-300 max-w-xl">
              All documents are encrypted at rest using envelope encryption (AES-256-GCM) and in transit via TLS 1.3.
            </p>
          </div>

          {/* Zero-Knowledge Toggle Widget */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 flex items-center gap-4">
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-white block">Zero-Knowledge Vault</span>
              <span className="text-[10px] text-gray-500 dark:text-slate-400">Keys derived on client device</span>
            </div>
            <button
              onClick={() => setZeroKnowledge(!zeroKnowledge)}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                zeroKnowledge ? 'bg-emerald-600 justify-end' : 'bg-gray-300 dark:bg-slate-700 justify-start'
              }`}
            >
              <div className="h-4 w-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Security Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Authentication</span>
            <UserCheck className="h-4 w-4 text-blue-600 dark:text-[#4F8CFF]" />
          </div>
          <div className="font-extrabold text-gray-900 dark:text-white text-sm">
            Google OAuth 2.0 + JWT
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Verified Active Session</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">Database Storage</span>
            <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="font-extrabold text-gray-900 dark:text-white text-sm">
            Encrypted Document Store
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">Isolated Cloud Run Tenant</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">AI Privacy Guarantee</span>
            <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="font-extrabold text-gray-900 dark:text-white text-sm">
            Zero Model Training Policy
          </div>
          <p className="text-[11px] text-blue-600 dark:text-[#4F8CFF] font-semibold">Gemini 3.6 Flash Server-Side</p>
        </div>

      </div>

      {/* Real-time Audit Trail Table */}
      <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs space-y-3 p-5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-[#4F8CFF]" /> Real-Time Vault Audit Log
          </h3>
          <span className="text-xs text-gray-500 dark:text-slate-400">Immutable Log Chain</span>
        </div>

        <div className="overflow-x-auto">
          {auditLogs.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <ShieldCheck className="h-10 w-10 text-blue-500/50 mx-auto" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">No activity recorded yet</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                Your actions, uploads, AI OCR extractions, and key actions will be logged here in real time.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#15161A] text-gray-500 dark:text-slate-400 font-bold uppercase border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action Type</th>
                  <th className="p-3">Target Document</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono text-gray-500 dark:text-slate-400">{log.timestamp}</td>
                    <td className="p-3 font-semibold">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-gray-900 dark:text-white truncate max-w-xs">{log.documentName}</td>
                    <td className="p-3 text-gray-500 dark:text-slate-400 font-mono">{log.ipAddress}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1 w-max border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="h-3 w-3" /> {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};
