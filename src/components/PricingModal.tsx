import React from 'react';
import { 
  X, 
  Check, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Users, 
  Crown 
} from 'lucide-react';
import { UserPlan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPlan: UserPlan;
  onSelectTier: (tier: UserPlan['tier']) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  userPlan,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Free' as UserPlan['tier'],
      price: '₹0',
      period: 'forever',
      docsLimit: '50 Documents',
      features: ['50 Document Storage', 'Basic OCR Extraction', 'Auto Renaming', 'Single User'],
      buttonText: 'Current Free Tier',
      highlight: false,
    },
    {
      name: 'Premium' as UserPlan['tier'],
      price: '₹299',
      period: 'per month',
      docsLimit: 'Unlimited Documents',
      features: ['Unlimited Documents', 'Gemini 3.6 Flash OCR', 'Smart AI Reminders', 'Natural Language AI Chat', '10 GB Cloud Storage'],
      buttonText: 'Upgrade to Premium',
      highlight: false,
    },
    {
      name: 'Business' as UserPlan['tier'],
      price: '₹999',
      period: 'per month',
      docsLimit: '10,000 Documents',
      features: ['Everything in Premium', 'GST ITC Reconciliation', 'Expense Reports & Reimbursements', 'Duplicate Invoice Detection', 'API Access Key', 'Audit Trail Logs'],
      buttonText: 'Current Active Plan',
      highlight: true,
    },
    {
      name: 'Enterprise' as UserPlan['tier'],
      price: '₹2,499',
      period: 'per month',
      docsLimit: 'Unlimited Custom',
      features: ['Custom Enterprise SLA', 'Dedicated Vault Instance', 'Custom AI Prompt Models', 'Zero-Knowledge Encryption Key', '24/7 Priority Support'],
      buttonText: 'Contact Enterprise',
      highlight: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#111114] rounded-2xl border border-gray-200 dark:border-[#1E1E24] shadow-xl p-6 my-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                PaperMind SaaS Plans &amp; Subscriptions
              </h2>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Choose the right plan for personal document management or business tax reconciliation.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((t) => {
            const isCurrent = userPlan.tier === t.name;
            return (
              <div
                key={t.name}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  t.highlight
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-gray-50 dark:bg-slate-800/60 text-gray-900 dark:text-white border-gray-200 dark:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{t.name}</span>
                    {t.highlight && (
                      <span className="bg-white text-blue-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-2xl font-black">{t.price}</span>
                    <span className={`text-xs ml-1 ${t.highlight ? 'text-blue-100' : 'text-gray-500 dark:text-slate-400'}`}>/{t.period}</span>
                  </div>

                  <p className={`text-xs font-semibold ${t.highlight ? 'text-blue-100' : 'text-blue-600'}`}>{t.docsLimit}</p>

                  <div className={`space-y-2 pt-3 border-t text-xs ${t.highlight ? 'border-blue-500/50' : 'border-gray-200 dark:border-slate-700'}`}>
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-1.5">
                        <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${t.highlight ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectTier(t.name);
                    onClose();
                  }}
                  disabled={isCurrent}
                  className={`w-full mt-6 py-2.5 rounded-xl font-bold text-xs transition ${
                    isCurrent
                      ? 'bg-emerald-600 text-white cursor-default'
                      : t.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-xs'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : `Switch to ${t.name}`}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
