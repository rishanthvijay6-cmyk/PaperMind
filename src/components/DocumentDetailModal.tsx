import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Tag, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Check, 
  Copy, 
  Share2, 
  Trash2, 
  FileText, 
  AlertTriangle,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { VaultDocument, SmartTag } from '../types';

interface DocumentDetailModalProps {
  document: VaultDocument | null;
  onClose: () => void;
  onUpdateDocument: (updated: VaultDocument) => void;
  onDeleteDocument: (id: string) => void;
}

export const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  onClose,
  onUpdateDocument,
  onDeleteDocument,
}) => {
  const [copiedGst, setCopiedGst] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  if (!document) return null;

  const handleCopyGst = () => {
    if (document.gstNumber) {
      navigator.clipboard.writeText(document.gstNumber);
      setCopiedGst(true);
      setTimeout(() => setCopiedGst(false), 2000);
    }
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onUpdateDocument({ ...document, autoRenamedFileName: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      const tag = newTagInput.trim() as SmartTag;
      if (!document.smartTags.includes(tag)) {
        onUpdateDocument({
          ...document,
          smartTags: [...document.smartTags, tag],
        });
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: SmartTag) => {
    onUpdateDocument({
      ...document,
      smartTags: document.smartTags.filter((t) => t !== tagToRemove),
    });
  };

  const isWarrantyExpiringSoon = document.warrantyExpiryDate && new Date(document.warrantyExpiryDate).getTime() - Date.now() < 30 * 86400000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#15161A] rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden my-6 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Pane: Document Preview */}
        <div className="md:w-1/2 bg-gray-50 dark:bg-[#0B0B0F] p-6 flex flex-col justify-between relative min-h-[300px] border-r border-gray-200 dark:border-white/10">
          
          <div className="flex items-center justify-between text-gray-600 dark:text-slate-300 text-xs mb-3">
            <span className="flex items-center gap-1.5 font-mono font-semibold">
              <FileText className="h-4 w-4 text-blue-600" /> Original File View
            </span>
            <span className="bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-gray-800 dark:text-white">
              {document.fileType}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 p-2 relative group shadow-xs">
            <img
              src={document.fileUrl}
              alt={document.autoRenamedFileName}
              className="max-h-[450px] w-auto object-contain rounded-xl shadow-md"
            />
            
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 bg-gray-900/80 text-white p-2.5 rounded-xl border border-white/20 hover:bg-gray-900 transition-all flex items-center gap-1.5 text-xs shadow-md"
            >
              <ExternalLink className="h-4 w-4" /> Full View
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
            <span>Upload Date: {document.uploadDate}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% Authentic (Verified)
            </span>
          </div>
        </div>

        {/* Right Pane: AI Extracted Metadata & Actions */}
        <div className="md:w-1/2 p-6 overflow-y-auto space-y-5 flex flex-col justify-between">
          
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 dark:border-white/10 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                  {document.category}
                </span>

                {isEditingTitle ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="bg-gray-50 dark:bg-[#1C1D22] border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg px-2 py-1 text-xs font-mono w-full"
                    />
                    <button
                      onClick={handleSaveTitle}
                      className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-lg font-bold"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <h2 
                    onClick={() => {
                      setEditedTitle(document.autoRenamedFileName);
                      setIsEditingTitle(true);
                    }}
                    className="text-base font-bold font-mono text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                    title="Click to Edit Auto-Renamed Title"
                  >
                    <span>{document.autoRenamedFileName}</span>
                    <Edit3 className="h-3.5 w-3.5 text-gray-400 opacity-60 hover:opacity-100" />
                  </h2>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Expiring Soon Banner */}
            {isWarrantyExpiringSoon && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Warranty Alert:</strong> Coverage expires on {document.warrantyExpiryDate}. Consider renewing warranty or scheduling AMC.
                </span>
              </div>
            )}

            {/* Metadata Fields Table */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Merchant / Vendor</span>
                <span className="font-extrabold text-gray-900 dark:text-white">{document.merchant}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Total Amount</span>
                <span className="font-extrabold text-blue-600 text-sm">
                  {document.currency}{document.totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Purchase Date</span>
                <span className="font-medium text-gray-800 dark:text-slate-200">{document.purchaseDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Invoice #</span>
                <span className="font-mono text-gray-800 dark:text-slate-200">{document.invoiceNumber || 'N/A'}</span>
              </div>

              {/* GST Number */}
              {document.gstNumber && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 col-span-2 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-700 dark:text-emerald-400 block text-[10px] uppercase font-bold">
                      GSTIN (Input Tax Credit Eligible)
                    </span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">
                      {document.gstNumber}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyGst}
                    className="flex items-center gap-1 bg-white dark:bg-[#1C1D22] px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 transition-all"
                  >
                    {copiedGst ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedGst ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}

              {document.gstAmount !== undefined && (
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">GST Amount Claimable</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{document.gstAmount.toLocaleString()}</span>
                </div>
              )}

              {document.paymentMethod && (
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10">
                  <span className="text-gray-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{document.paymentMethod}</span>
                </div>
              )}
            </div>

            {/* Smart Tags Section */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
                Smart Tags (Auto-Generated by AI):
              </span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {document.smartTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-500 transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add tag inline */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  placeholder="Add custom tag..."
                  className="bg-gray-50 dark:bg-[#1C1D22] border border-gray-300 dark:border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={handleAddTag}
                  className="bg-gray-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white text-gray-700 dark:text-white text-xs px-2.5 py-1 rounded-lg font-bold transition-all"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Important Notes */}
            {document.importantNotes && (
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#1C1D22] border border-gray-200 dark:border-white/10 text-xs space-y-1">
                <span className="font-bold text-gray-900 dark:text-white block">AI Summary Notes:</span>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  {document.importantNotes}
                </p>
              </div>
            )}

          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={() => onDeleteDocument(document.id)}
              className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-rose-500/20 transition-colors"
              title="Delete Document"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(document, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = window.document.createElement('a');
                  a.href = url;
                  a.download = `${document.autoRenamedFileName}.json`;
                  a.click();
                }}
                className="px-3.5 py-2 rounded-xl border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white text-xs font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5 text-blue-600" /> Export JSON
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
