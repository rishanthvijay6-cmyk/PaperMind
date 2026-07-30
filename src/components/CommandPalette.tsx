import React, { useState, useEffect } from 'react';
import { 
  Search, 
  FileText, 
  Sparkles, 
  Upload, 
  Bell, 
  BarChart3, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  X, 
  Zap,
  FolderOpen,
  DollarSign
} from 'lucide-react';
import { VaultDocument, Category } from '../types';
import { ActiveTab } from './Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  documents: VaultDocument[];
  onSelectDocument: (doc: VaultDocument) => void;
  onNavigate: (tab: ActiveTab) => void;
  onOpenUpload: () => void;
  onOpenChat: () => void;
  setSelectedCategory: (cat: Category | 'ALL') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  documents,
  onSelectDocument,
  onNavigate,
  onOpenUpload,
  onOpenChat,
  setSelectedCategory,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape or shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via document event if listener added
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDocs = query.trim()
    ? documents.filter(d => 
        d.autoRenamedFileName.toLowerCase().includes(query.toLowerCase()) ||
        d.merchant.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase()) ||
        d.productOrService.toLowerCase().includes(query.toLowerCase()) ||
        d.smartTags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : documents.slice(0, 4);

  const quickActions = [
    {
      id: 'upload',
      title: 'Upload New Document or Invoice',
      subtitle: 'Run instant AI OCR & auto-renaming',
      icon: <Upload className="h-4 w-4 text-[#4F8CFF]" />,
      action: () => { onOpenUpload(); onClose(); }
    },
    {
      id: 'chat',
      title: 'Ask AI Chat Assistant',
      subtitle: 'Natural language search across all documents',
      icon: <Sparkles className="h-4 w-4 text-purple-400" />,
      action: () => { onOpenChat(); onClose(); }
    },
    {
      id: 'analytics',
      title: 'View Spend Analytics Dashboard',
      subtitle: 'Category breakdowns, ITC tax credits & graphs',
      icon: <BarChart3 className="h-4 w-4 text-emerald-400" />,
      action: () => { onNavigate('analytics'); onClose(); }
    },
    {
      id: 'reminders',
      title: 'Check Expiry & Warranty Reminders',
      subtitle: 'Upcoming warranty, policy & license renewals',
      icon: <Bell className="h-4 w-4 text-amber-400" />,
      action: () => { onNavigate('reminders'); onClose(); }
    },
    {
      id: 'security',
      title: 'Vault Security & Audit Logs',
      subtitle: 'SOC2 Compliance, encryption & real-time logs',
      icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />,
      action: () => { onNavigate('security'); onClose(); }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1C1D22]/80">
          <Search className="h-5 w-5 text-blue-600 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, merchants, categories, or ask AI (Cmd+K)..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none"
            autoFocus
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          
          {/* Matching Documents Section */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
              <FileText className="h-3 w-3 text-blue-600" />
              {query ? 'Matching Documents' : 'Recent Documents'}
            </div>
            <div className="space-y-1">
              {filteredDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    onSelectDocument(doc);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1C1D22] text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-white/5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 text-blue-600 dark:text-slate-300 transition-colors shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                        {doc.autoRenamedFileName}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{doc.merchant}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {doc.currency}{doc.totalAmount.toLocaleString()}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
              {filteredDocs.length === 0 && (
                <div className="p-6 text-center text-xs text-gray-500 dark:text-slate-400">
                  No documents matching "{query}". Try searching by vendor, category or amount.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500" />
              Quick Actions
            </div>
            <div className="space-y-1">
              {quickActions.map((act) => (
                <button
                  key={act.id}
                  onClick={act.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1C1D22] text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 transition-colors shrink-0">
                      {act.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400">{act.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-slate-500 font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 font-semibold">Action</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0B0B0F]/90 flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-white/10 rounded font-mono text-[10px] text-gray-700 dark:text-slate-300 font-bold">ESC</span> to close
            <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-white/10 rounded font-mono text-[10px] text-gray-700 dark:text-slate-300 font-bold">↑↓</span> to navigate
          </div>
          <span className="flex items-center gap-1 text-blue-600 font-semibold">
            <Sparkles className="h-3 w-3" /> PaperMind Command Engine
          </span>
        </div>

      </div>
    </div>
  );
};
