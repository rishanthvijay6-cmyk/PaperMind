import React from 'react';
import { 
  Sparkles, 
  Upload, 
  FileText, 
  FolderKanban, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  X, 
  ArrowRight,
  Zap
} from 'lucide-react';

interface OnboardingWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpload: () => void;
}

export const OnboardingWelcomeModal: React.FC<OnboardingWelcomeModalProps> = ({
  isOpen,
  onClose,
  onOpenUpload,
}) => {
  if (!isOpen) return null;

  const handleStartUpload = () => {
    onClose();
    onOpenUpload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 overflow-hidden">
        
        {/* Glow Blob */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-extrabold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            <span>WELCOME TO PAPERMIND</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Think Less. Find Faster.
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
            Let's organize your first document. Your private document intelligence workspace is ready.
          </p>
        </div>

        {/* 4 Feature Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 py-2">
          
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/5 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                <Upload className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">1. Upload Any Document</h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">
              Drag &amp; drop PDFs, images, receipts, warranties, or insurance policies.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/5 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">2. Gemini AI Auto-OCR</h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">
              Extracts spend amounts, GST, merchants, and standardizes file names.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/5 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
                <FolderKanban className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">3. Auto Smart Folders</h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">
              Categorized instantly with warranty &amp; renewal reminder tracking.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/5 space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">4. Natural Language Search</h3>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">
              Query your vault in natural language or 18 world languages.
            </p>
          </div>

        </div>

        {/* Security Assurance Footer */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 dark:text-slate-400 bg-gray-100/80 dark:bg-white/5 py-2 px-3 rounded-xl">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Zero-Knowledge AES-256 Storage • Isolated Private Workspace</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleStartUpload}
            className="w-full sm:flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Upload className="h-4 w-4" />
            <span>Upload First Document</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 bg-gray-100 dark:bg-[#1C1D22] hover:bg-gray-200 dark:hover:bg-[#25262c] text-gray-700 dark:text-slate-300 font-bold rounded-2xl text-xs transition-all border border-gray-200 dark:border-white/10"
          >
            Explore Workspace
          </button>
        </div>

      </div>
    </div>
  );
};
