import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Clock, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { VaultDocument, GmailConfig } from '../types';

interface EmailNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document?: VaultDocument | null;
  gmailConfig: GmailConfig;
  onConnectGmail: () => void;
  onSendEmail: (type: string, recipient: string) => void;
}

export type EmailTemplateType = 
  | 'warranty_expiry' 
  | 'tax_deadline' 
  | 'bill_due' 
  | 'insurance_renewal' 
  | 'passport_expiry' 
  | 'weekly_summary' 
  | 'monthly_report';

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({
  isOpen,
  onClose,
  document,
  gmailConfig,
  onConnectGmail,
  onSendEmail,
}) => {
  const { t, formatCurrency, currentCountryMeta } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateType>('warranty_expiry');
  const [recipientEmail, setRecipientEmail] = useState(gmailConfig.email || 'rishanthr50@gmail.com');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onSendEmail(selectedTemplate, recipientEmail);
      setTimeout(() => setSentSuccess(false), 4000);
    }, 1200);
  };

  const templatesList: { id: EmailTemplateType; title: string; badge: string; desc: string }[] = [
    { 
      id: 'warranty_expiry', 
      title: 'Warranty Expiry Alert (7 Days)', 
      badge: 'Urgent', 
      desc: 'Notifies user that product warranty is expiring soon with serial number & invoice link.' 
    },
    { 
      id: 'tax_deadline', 
      title: `${currentCountryMeta.taxLabel} Tax Deadline`, 
      badge: 'Compliance', 
      desc: 'Reminds finance/tax team of upcoming filing deadline with claimable breakdown.' 
    },
    { 
      id: 'bill_due', 
      title: 'Utility Bill & Renewal Due', 
      badge: 'Billing', 
      desc: 'Alerts before auto-pay or due date with total amount & account details.' 
    },
    { 
      id: 'insurance_renewal', 
      title: 'Insurance & Vehicle Renewal', 
      badge: 'Policy', 
      desc: 'Alert for auto/health insurance policy renewal to prevent gaps in coverage.' 
    },
    { 
      id: 'passport_expiry', 
      title: 'Passport & Identity Expiry', 
      badge: 'Government', 
      desc: 'Sends advance notice 6 months prior to passport or visa expiration.' 
    },
    { 
      id: 'weekly_summary', 
      title: 'AI Weekly Vault Summary', 
      badge: 'Digest', 
      desc: 'AI-generated weekly roundup of new documents uploaded & active reminders.' 
    },
    { 
      id: 'monthly_report', 
      title: 'Monthly Expense Intelligence', 
      badge: 'Report', 
      desc: 'Comprehensive monthly category breakdown & top vendor expense analysis.' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-[#1C1D22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-xs">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                PaperMind Email Dispatcher &amp; Templates
                {gmailConfig.isConnected ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Gmail OAuth Connected
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> OAuth Standby
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Automated responsive HTML email dispatch with explicit user approval
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Column: Template Selector & Settings */}
          <div className="md:col-span-5 p-4 border-r border-gray-200 dark:border-white/10 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-[#111114]">
            
            {/* Gmail OAuth Banner if disconnected */}
            {!gmailConfig.isConnected && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
                  <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Connect Gmail via OAuth</span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-slate-300">
                  Seamlessly dispatch reminders directly through your primary Gmail inbox.
                </p>
                <button
                  onClick={onConnectGmail}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                >
                  Authorize Gmail Integration
                </button>
              </div>
            )}

            {/* Recipient Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 dark:text-slate-300">
                Send To Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Template Selection List */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                Select Notification Type
              </label>

              <div className="space-y-1.5">
                {templatesList.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      selectedTemplate === tmpl.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-[#1C1D22] border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold leading-tight">{tmpl.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase ${
                        selectedTemplate === tmpl.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-slate-400'
                      }`}>
                        {tmpl.badge}
                      </span>
                    </div>
                    <p className={`text-[10px] leading-snug ${
                      selectedTemplate === tmpl.id ? 'text-blue-100' : 'text-gray-500 dark:text-slate-400'
                    }`}>
                      {tmpl.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: HTML Email Template Live Preview */}
          <div className="md:col-span-7 p-4 overflow-y-auto bg-gray-100 dark:bg-[#0B0B0F] flex flex-col">
            <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold">
                <Eye className="h-3.5 w-3.5 text-blue-600" /> HTML Email Live Template Preview
              </span>
              <span className="font-mono text-[10px]">PaperMind-Mailer-v2.4</span>
            </div>

            {/* Email Canvas Box */}
            <div className="flex-1 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-md p-6 max-w-lg mx-auto w-full space-y-4 font-sans text-xs">
              
              {/* PaperMind Email Header */}
              <div className="flex items-center justify-between border-b pb-3 border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">
                    P
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">PaperMind</h3>
                    <p className="text-[10px] text-gray-400">Think Less. Find Faster.</p>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium">
                  Verified Alert
                </span>
              </div>

              {/* Dynamic Email Content by Template */}
              {selectedTemplate === 'warranty_expiry' && (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                    <p className="font-bold">⚠️ Action Required: Warranty Expiring in 7 Days</p>
                    <p className="text-[11px] mt-0.5">Your coverage for <strong>{document?.productOrService || 'MacBook Pro M3 Max'}</strong> ends on <strong>Aug 15, 2026</strong>.</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Merchant:</span>
                      <span className="font-semibold">{document?.merchant || 'Apple Store Flagship'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Serial Number:</span>
                      <span className="font-mono font-semibold">{document?.serialNumber || 'C02G89X4MD6M'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purchase Amount:</span>
                      <span className="font-semibold">{formatCurrency(document?.totalAmount || 2499)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    If you experience hardware faults or require AMC renewal, claim before expiry.
                  </p>
                </div>
              )}

              {selectedTemplate === 'tax_deadline' && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-xs">
                    <p className="font-bold">🏛️ {currentCountryMeta.taxLabel} Filing Notice</p>
                    <p className="text-[11px] mt-0.5">Your quarterly tax reconciliation export is prepared for automated filing.</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Jurisdiction:</span>
                      <span className="font-semibold">{currentCountryMeta.name} ({currentCountryMeta.flag})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Business Expenses:</span>
                      <span className="font-semibold">{formatCurrency(18420)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Claimable Input Credit:</span>
                      <span className="font-semibold text-emerald-700">{formatCurrency(2640)}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplate === 'bill_due' && (
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-900 text-xs">
                    <p className="font-bold">⚡ Utility / Subscription Due Tomorrow</p>
                    <p className="text-[11px] mt-0.5">AWS Cloud Hosting Invoice #INV-9821 is scheduled for processing.</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vendor:</span>
                      <span className="font-semibold">Amazon Web Services</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Due Amount:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(340)}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedTemplate === 'weekly_summary' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs">
                    <p className="font-bold">✨ PaperMind AI Weekly Document Digest</p>
                    <p className="text-[11px] mt-0.5">You added <strong>5 new documents</strong> this week with 100% OCR extraction accuracy.</p>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-gray-600 space-y-0.5">
                    <li>Renamed: 2026_AppleStore_MacBookPro.pdf</li>
                    <li>Renamed: 2026_Starbucks_CoffeeReceipt.jpg</li>
                    <li>Auto-categorized: Electronics &amp; Food</li>
                  </ul>
                </div>
              )}

              {selectedTemplate === 'monthly_report' && (
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 text-xs">
                    <p className="font-bold">📊 Monthly Spend Intelligence Report</p>
                    <p className="text-[11px] mt-0.5">Total processed volume this month: <strong>{formatCurrency(5420)}</strong>.</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span>Electronics &amp; IT:</span>
                      <span className="font-semibold">{formatCurrency(3200)} (59%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel &amp; Food:</span>
                      <span className="font-semibold">{formatCurrency(1420)} (26%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Email Footer Button */}
              <div className="pt-3 border-t border-gray-100 text-center">
                <a
                  href="#vault"
                  className="inline-block py-2 px-5 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-xs hover:bg-blue-700 transition"
                >
                  View Document in PaperMind Vault
                </a>
                <p className="text-[9px] text-gray-400 mt-2">
                  PaperMind Inc. • Enterprise Encrypted Document Intelligence • Unsubscribe
                </p>
              </div>

            </div>

            {/* Bottom Dispatch Button */}
            <div className="mt-4 flex items-center justify-between">
              {sentSuccess ? (
                <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 font-semibold w-full justify-center">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Email dispatched successfully to {recipientEmail}!</span>
                </div>
              ) : (
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Dispatching Email via Gmail API...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send {templatesList.find((t) => t.id === selectedTemplate)?.title} Now</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
