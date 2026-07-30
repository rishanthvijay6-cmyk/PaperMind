import React, { useState } from 'react';
import { 
  VaultDocument, 
  Category, 
  SmartTag 
} from '../types';
import { 
  FileText, 
  Sparkles, 
  Calendar, 
  Tag, 
  Download, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  CheckSquare, 
  Building2, 
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface DocumentGridProps {
  documents: VaultDocument[];
  selectedCategory: Category | 'ALL';
  setSelectedCategory: (cat: Category | 'ALL') => void;
  searchQuery: string;
  onSelectDocument: (doc: VaultDocument) => void;
  onDeleteDocument: (id: string) => void;
  onExportCSV: (docs: VaultDocument[]) => void;
  onOpenUpload?: () => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onSelectDocument,
  onDeleteDocument,
  onExportCSV,
  onOpenUpload,
}) => {
  const { t, formatCurrency } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedTag, setSelectedTag] = useState<SmartTag | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'merchant'>('date-desc');
  const [filterBusinessOnly, setFilterBusinessOnly] = useState(false);
  const [filterTaxOnly, setFilterTaxOnly] = useState(false);
  const [filterExpiringOnly, setFilterExpiringOnly] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    // Category filter
    if (selectedCategory !== 'ALL' && doc.category !== selectedCategory) return false;

    // Smart Tag filter
    if (selectedTag !== 'ALL' && !doc.smartTags.includes(selectedTag)) return false;

    // Toggles
    if (filterBusinessOnly && !doc.isBusinessExpense) return false;
    if (filterTaxOnly && !doc.isTaxEligible) return false;
    if (filterExpiringOnly) {
      const hasExpiringRem = doc.reminders?.some((r) => r.daysRemaining <= 30 && r.status === 'active');
      const hasExpiringWarranty = doc.warrantyExpiryDate && new Date(doc.warrantyExpiryDate).getTime() - Date.now() < 30 * 86400000;
      if (!hasExpiringRem && !hasExpiringWarranty) return false;
    }

    // Text search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.autoRenamedFileName.toLowerCase().includes(q);
      const matchMerchant = doc.merchant.toLowerCase().includes(q);
      const matchProduct = doc.productOrService.toLowerCase().includes(q);
      const matchCategory = doc.category.toLowerCase().includes(q);
      const matchGST = doc.gstNumber?.toLowerCase().includes(q);
      const matchTags = doc.smartTags.some((t) => t.toLowerCase().includes(q));
      const matchNotes = doc.importantNotes?.toLowerCase().includes(q);
      if (!matchName && !matchMerchant && !matchProduct && !matchCategory && !matchGST && !matchTags && !matchNotes) {
        return false;
      }
    }

    return true;
  });

  // Sort documents
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
    if (sortBy === 'date-asc') return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
    if (sortBy === 'amount-desc') return b.totalAmount - a.totalAmount;
    if (sortBy === 'amount-asc') return a.totalAmount - b.totalAmount;
    if (sortBy === 'merchant') return a.merchant.localeCompare(b.merchant);
    return 0;
  });

  const allTags: SmartTag[] = [
    'Apple', 'Electronics', 'Warranty', 'GST', 'Business Expense', 'Tax Eligible', 'Urgent Renewal', 'Reimbursable', 'Utility', 'Health', 'Automobile', 'Subscribed'
  ];

  const handleSelectAll = () => {
    if (selectedDocIds.length === sortedDocs.length) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(sortedDocs.map((d) => d.id));
    }
  };

  const toggleSelectDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedDocIds.includes(id)) {
      setSelectedDocIds(selectedDocIds.filter((item) => item !== id));
    } else {
      setSelectedDocIds([...selectedDocIds, id]);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filters Header Bar */}
      <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{selectedCategory === 'ALL' ? 'Document Vault' : selectedCategory}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {sortedDocs.length} items
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-[#1C1D22] p-1 rounded-xl border border-gray-200 dark:border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Table View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-800 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
              <option value="merchant">Merchant A-Z</option>
            </select>

            {/* Export Selection CSV */}
            <button
              onClick={() => onExportCSV(selectedDocIds.length > 0 ? sortedDocs.filter(d => selectedDocIds.includes(d.id)) : sortedDocs)}
              className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#1C1D22] hover:bg-gray-100 dark:hover:bg-[#25262c] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span>Export {selectedDocIds.length > 0 ? `(${selectedDocIds.length})` : 'All'} CSV</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Toggles & Smart Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200 dark:border-white/10">
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" /> Tags:
          </span>

          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedTag === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200'
            }`}
          >
            All Tags
          </button>

          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(selectedTag === t ? 'ALL' : t)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedTag === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-[#1C1D22] text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200'
              }`}
            >
              #{t}
            </button>
          ))}
        </div>

        {/* Special Status Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filterBusinessOnly}
              onChange={(e) => setFilterBusinessOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-50"
            />
            <span>Business Expenses</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={filterTaxOnly}
              onChange={(e) => setFilterTaxOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-50"
            />
            <span>Tax Claim Eligible (GST/80D)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 cursor-pointer font-semibold">
            <input
              type="checkbox"
              checked={filterExpiringOnly}
              onChange={(e) => setFilterExpiringOnly(e.target.checked)}
              className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 bg-gray-50"
            />
            <span>Expiring Soon (&lt; 30 Days)</span>
          </label>
        </div>

      </div>

      {/* Empty State */}
      {sortedDocs.length === 0 && (
        <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-3xl p-10 md:p-14 text-center space-y-4 shadow-sm">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="h-8 w-8" />
          </div>
          
          {documents.length === 0 ? (
            <>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">No documents uploaded yet</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Upload your first receipt, invoice, or warranty PDF to get started. PaperMind AI will automatically extract details, assign smart categories, and track expiry dates.
              </p>
              {onOpenUpload && (
                <button
                  onClick={onOpenUpload}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Upload First Document</span>
                </button>
              )}
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No documents match your filter</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto">
                Try resetting your search query or tag selection, or upload a new receipt or invoice.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedTag('ALL');
                  setFilterBusinessOnly(false);
                  setFilterTaxOnly(false);
                  setFilterExpiringOnly(false);
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all"
              >
                Reset All Filters
              </button>
            </>
          )}
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && sortedDocs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedDocs.map((doc) => {
            const isExpiringSoon = doc.reminders?.some((r) => r.daysRemaining <= 30 && r.status === 'active');
            const isSelected = selectedDocIds.includes(doc.id);

            return (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className={`group relative bg-white dark:bg-[#1C1D22] border ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20'
                    : isExpiringSoon
                    ? 'border-amber-400 hover:border-amber-500'
                    : 'border-gray-200 dark:border-white/10 hover:border-blue-400'
                } rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
              >
                
                {/* Card Top Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800">
                        {doc.category}
                      </span>
                      {doc.isBusinessExpense && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300 text-[10px] font-semibold flex items-center gap-1 border border-gray-200 dark:border-white/10">
                          <Building2 className="h-3 w-3 text-cyan-600" /> Biz
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => toggleSelectDoc(doc.id, e)}
                        className={`p-1 rounded-lg transition-colors ${
                          isSelected ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-700'
                        }`}
                        aria-label="Select Document"
                      >
                        <CheckSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail / Document Card Header */}
                  <div className="relative h-36 w-full rounded-xl bg-gray-100 dark:bg-[#15161A] overflow-hidden mb-3 border border-gray-200 dark:border-white/10">
                    <img
                      src={doc.fileUrl}
                      alt={doc.autoRenamedFileName}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                    
                    {/* Auto Renamed Title Badge over Image */}
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <p className="text-[11px] font-mono font-bold truncate bg-gray-900/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-white">
                        {doc.autoRenamedFileName}
                      </p>
                    </div>

                    {/* Expiring Soon Banner */}
                    {isExpiringSoon && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-black px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-md">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Action Required</span>
                      </div>
                    )}
                  </div>

                  {/* Product & Merchant Info */}
                  <div className="space-y-1 mb-3">
                    <h3 className="font-extrabold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {doc.merchant}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1">
                      {doc.productOrService}
                    </p>
                  </div>

                  {/* Smart Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.smartTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-300 text-[10px] font-semibold border border-gray-200 dark:border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                    {doc.smartTags.length > 3 && (
                      <span className="text-[10px] text-gray-400 self-center">
                        +{doc.smartTags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Stats */}
                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>{doc.purchaseDate}</span>
                  </div>
                  
                  <div className="font-extrabold text-gray-900 dark:text-white text-sm">
                    {formatCurrency(doc.totalAmount)}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && sortedDocs.length > 0 && (
        <div className="bg-white dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#15161A] text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-white/10 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={selectedDocIds.length === sortedDocs.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 bg-gray-50"
                    />
                  </th>
                  <th className="p-3.5">AI Auto-Renamed Document</th>
                  <th className="p-3.5">Merchant</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">GST / Tax</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {sortedDocs.map((doc) => {
                  const isSelected = selectedDocIds.includes(doc.id);
                  return (
                    <tr
                      key={doc.id}
                      onClick={() => onSelectDocument(doc)}
                      className={`hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${
                        isSelected ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => toggleSelectDoc(doc.id, e as any)}
                          className="rounded border-gray-300 text-blue-600 bg-gray-50"
                        />
                      </td>

                      <td className="p-3.5 font-mono font-semibold text-gray-900 dark:text-white max-w-xs truncate">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="truncate">{doc.autoRenamedFileName}</span>
                        </div>
                      </td>

                      <td className="p-3.5 font-bold text-gray-800 dark:text-slate-200">
                        {doc.merchant}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800">
                          {doc.category}
                        </span>
                      </td>

                      <td className="p-3.5 text-gray-500 dark:text-slate-400">
                        {doc.purchaseDate}
                      </td>

                      <td className="p-3.5 font-extrabold text-gray-900 dark:text-white">
                        {formatCurrency(doc.totalAmount)}
                      </td>

                      <td className="p-3.5">
                        {doc.gstAmount ? (
                          <span className="text-emerald-600 font-bold">
                            ₹{doc.gstAmount.toLocaleString()} (ITC)
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectDocument(doc)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-white/10"
                            title="View AI Metadata"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteDocument(doc.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-white/10"
                            title="Delete Document"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
