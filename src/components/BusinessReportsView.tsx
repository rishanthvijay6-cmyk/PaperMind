import React, { useState } from 'react';
import { 
  Briefcase, 
  Download, 
  FileCheck, 
  Building2, 
  CheckCircle2, 
  AlertOctagon, 
  DollarSign, 
  Users, 
  Search,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { VaultDocument } from '../types';

interface BusinessReportsViewProps {
  documents: VaultDocument[];
  onExportCSV: (docs: VaultDocument[]) => void;
}

export const BusinessReportsView: React.FC<BusinessReportsViewProps> = ({
  documents,
  onExportCSV,
}) => {
  const [activeTab, setActiveTab] = useState<'gst' | 'expenses' | 'duplicates'>('gst');

  const businessDocs = documents.filter((d) => d.isBusinessExpense || d.gstNumber);
  const totalBusinessAmount = businessDocs.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalGstCredit = businessDocs.reduce((sum, d) => sum + (d.gstAmount || 0), 0);

  // Duplicate detection simulation
  const duplicates = documents.filter(
    (doc, index, self) =>
      self.findIndex(
        (d) => d.id !== doc.id && d.totalAmount === doc.totalAmount && d.merchant === doc.merchant
      ) !== -1
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-[#4F8CFF]/15 text-blue-600 dark:text-[#4F8CFF] border border-blue-100 dark:border-[#4F8CFF]/30">
              <Briefcase className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Business Intelligence &amp; Tax Portal
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            GST Input Tax Credit (ITC) reconciliation, expense reimbursement approval, and 1-click Tax Ready export.
          </p>
        </div>

        <button
          onClick={() => onExportCSV(businessDocs)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Export Tax-Ready Report (CSV/Excel)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('gst')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'gst'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          GST Input Credit (ITC)
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'expenses'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Expense Claims
        </button>
        <button
          onClick={() => setActiveTab('duplicates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'duplicates'
              ? 'bg-amber-500 text-white dark:text-black shadow-xs font-extrabold'
              : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <AlertOctagon className="h-3.5 w-3.5" />
          <span>Duplicate Inspector ({duplicates.length})</span>
        </button>
      </div>

      {/* GST TAB */}
      {activeTab === 'gst' && (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">Total B2B Taxable Value</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">₹{totalBusinessAmount.toLocaleString()}</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Calculated GST ITC Credit</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{totalGstCredit.toLocaleString()}</span>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 shadow-xs space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-[#4F8CFF] uppercase tracking-wider block">GST Verified Invoices</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">{businessDocs.length} Documents</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs">
            {businessDocs.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <FileCheck className="h-10 w-10 text-blue-500/50 mx-auto" />
                <h3 className="font-bold text-gray-900 dark:text-white text-base">No Business &amp; GST Documents</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                  Upload invoices or receipts marked as business expenses to calculate tax claims and Input Tax Credit (ITC).
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-[#15161A] text-gray-500 dark:text-slate-400 font-bold uppercase border-b border-gray-200 dark:border-white/10">
                  <tr>
                    <th className="p-3.5">Vendor Name</th>
                    <th className="p-3.5">GSTIN Number</th>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Invoice Date</th>
                    <th className="p-3.5">Total Amount</th>
                    <th className="p-3.5">GST Credit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {businessDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-gray-900 dark:text-white">{doc.merchant}</td>
                      <td className="p-3.5 font-mono text-emerald-700 dark:text-emerald-400 font-semibold">{doc.gstNumber || 'Pending GSTIN'}</td>
                      <td className="p-3.5 font-mono text-gray-600 dark:text-slate-300">{doc.invoiceNumber}</td>
                      <td className="p-3.5 text-gray-500 dark:text-slate-400">{doc.purchaseDate}</td>
                      <td className="p-3.5 font-extrabold text-gray-900 dark:text-white">{doc.currency}{doc.totalAmount.toLocaleString()}</td>
                      <td className="p-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">₹{doc.gstAmount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}

      {/* DUPLICATE INSPECTOR TAB */}
      {activeTab === 'duplicates' && (
        <div className="space-y-4">
          {duplicates.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl space-y-2 shadow-xs">
              <ShieldCheck className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-bold text-gray-900 dark:text-white text-base">No Duplicate Invoices Detected</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">PaperMind fraud detection confirmed zero duplicate bill submissions in your database.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {duplicates.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/50 dark:bg-[#1C1D22] flex items-center justify-between text-xs shadow-xs">
                  <div className="flex items-center gap-3">
                    <AlertOctagon className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{doc.autoRenamedFileName}</h4>
                      <p className="text-gray-500 dark:text-slate-400">Matches amount {doc.currency}{doc.totalAmount} &amp; merchant {doc.merchant}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-400 rounded-lg font-bold">
                    Potential Duplicate
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
