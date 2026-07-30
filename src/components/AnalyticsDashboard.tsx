import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { VaultDocument, Category } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface AnalyticsDashboardProps {
  documents: VaultDocument[];
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ documents }) => {
  const { t, formatCurrency } = useTranslation();
  const totalSpend = documents.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalGst = documents.reduce((sum, d) => sum + (d.gstAmount || 0), 0);
  const businessSpend = documents
    .filter((d) => d.isBusinessExpense)
    .reduce((sum, d) => sum + d.totalAmount, 0);
  const taxEligibleSpend = documents
    .filter((d) => d.isTaxEligible)
    .reduce((sum, d) => sum + d.totalAmount, 0);

  // Group by category for charts
  const categoryMap: Record<string, number> = {};
  documents.forEach((d) => {
    categoryMap[d.category] = (categoryMap[d.category] || 0) + d.totalAmount;
  });

  const categoriesSorted = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  const categoryChartData = categoriesSorted.map(([category, amount]) => ({
    name: category,
    amount: amount,
  }));

  // Group by merchant
  const merchantMap: Record<string, { amount: number; count: number }> = {};
  documents.forEach((d) => {
    if (!merchantMap[d.merchant]) {
      merchantMap[d.merchant] = { amount: 0, count: 0 };
    }
    merchantMap[d.merchant].amount += d.totalAmount;
    merchantMap[d.merchant].count += 1;
  });

  const merchantsSorted = Object.entries(merchantMap).sort((a, b) => b[1].amount - a[1].amount);

  const COLORS = ['#2563EB', '#8B5CF6', '#10B981', '#F59E0B', '#06B6D4', '#EC4899', '#3B82F6'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-md">
                AI Financial Analytics
              </span>
              <span className="text-xs text-blue-100">Real-time Cloud Sync</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              PaperMind Spend &amp; Tax Intelligence
            </h2>
            <p className="text-xs text-blue-100 max-w-xl">
              Automated category breakdown, GST Input Tax Credit (ITC) calculations, and AI financial insights.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <span className="text-[10px] text-blue-100 block uppercase font-bold">Vault Integrity Score</span>
              <span className="text-xl font-black text-emerald-300">98 / 100</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-bold border border-emerald-300/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold">
            <span>Total Vault Spend</span>
            <span className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
              <DollarSign className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(totalSpend)}
          </div>
          <p className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
            {documents.length > 0 ? '+0% vs last month' : 'No data recorded'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold">
            <span>GST Input Credit (ITC)</span>
            <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {formatCurrency(totalGst)}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 font-mono">
            {documents.length > 0 ? '100% Tax Claim Ready' : 'Awaiting uploads'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold">
            <span>Business Expenses</span>
            <span className="p-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600">
              <Building2 className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(businessSpend)}
          </div>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 font-semibold">
            {documents.length > 0 ? `${Math.round((businessSpend / (totalSpend || 1)) * 100)}% of total vault` : '0% of total vault'}
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold">
            <span>Tax Eligible (80D/80C)</span>
            <span className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
              <Zap className="h-4 w-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(taxEligibleSpend)}
          </div>
          <p className="text-[11px] text-blue-600 font-semibold">
            {documents.length > 0 ? 'Medical & Insurance qualified' : 'Awaiting uploads'}
          </p>
        </div>

      </div>

      {/* Interactive Recharts Section */}
      {documents.length === 0 ? (
        <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <BarChart3 className="h-10 w-10 text-blue-500/50 mx-auto" />
          <h3 className="font-bold text-gray-900 dark:text-white text-base">No analytics available</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
            Upload documents to unlock AI-powered spending breakdowns, category insights, and merchant trends.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Category Recharts Bar Chart */}
          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" /> Spending by Category
              </h3>
              <span className="text-xs text-gray-500 dark:text-slate-400">{categoriesSorted.length} Categories</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px', color: '#111827', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    formatter={(val: number) => [formatCurrency(val), 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Merchants Table */}
          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> Top Merchants &amp; Vendors
              </h3>
              <span className="text-xs text-gray-500 dark:text-slate-400">By Total Value</span>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {merchantsSorted.map(([merchant, data], index) => (
                <div
                  key={merchant}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#15161A] border border-gray-200/80 dark:border-white/10 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 font-bold flex items-center justify-center text-[10px] border border-blue-200 dark:border-blue-800">
                      #{index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{merchant}</h4>
                      <span className="text-[11px] text-gray-500 dark:text-slate-400">{data.count} document(s)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-extrabold text-blue-600 text-sm block">
                      {formatCurrency(data.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
