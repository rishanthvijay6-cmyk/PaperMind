import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Bell, 
  ShieldAlert, 
  Plus, 
  FileText,
  Zap,
  Check
} from 'lucide-react';
import { VaultDocument, AIReminder } from '../types';

interface RemindersViewProps {
  documents: VaultDocument[];
  onSelectDocument: (doc: VaultDocument) => void;
}

export const RemindersView: React.FC<RemindersViewProps> = ({
  documents,
  onSelectDocument,
}) => {
  // Aggregate all reminders
  const allReminders: { reminder: AIReminder; doc: VaultDocument }[] = [];
  documents.forEach((doc) => {
    doc.reminders?.forEach((rem) => {
      allReminders.push({ reminder: rem, doc });
    });
  });

  const [remindersState, setRemindersState] = useState(allReminders);
  const [filterType, setFilterType] = useState<'ALL' | 'URGENT' | 'RESOLVED'>('URGENT');

  const handleToggleResolve = (remId: string) => {
    setRemindersState((prev) =>
      prev.map((item) => {
        if (item.reminder.id === remId) {
          const newStatus = item.reminder.status === 'resolved' ? 'active' : 'resolved';
          return {
            ...item,
            reminder: { ...item.reminder, status: newStatus },
          };
        }
        return item;
      })
    );
  };

  const filtered = remindersState.filter((item) => {
    if (filterType === 'URGENT') {
      return item.reminder.status === 'active' && item.reminder.daysRemaining <= 30;
    }
    if (filterType === 'RESOLVED') {
      return item.reminder.status === 'resolved';
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-50 dark:bg-rose-500/15 text-red-600 dark:text-rose-400 border border-red-100 dark:border-rose-500/20">
              <Clock className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Reminders &amp; Expiry Tracker
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            PaperMind scans document terms to generate automated alerts for warranties, insurance, utility bills, and ID expiries.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center bg-gray-100 dark:bg-[#1C1D22] p-1 rounded-xl border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setFilterType('URGENT')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'URGENT'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Expiring Soon (&lt; 30d)
          </button>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All Active
          </button>
          <button
            onClick={() => setFilterType('RESOLVED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'RESOLVED'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Reminder Cards List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl space-y-2 shadow-xs">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              {documents.length === 0 ? 'No reminders created yet' : 'All clear! No urgent reminders'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              {documents.length === 0 
                ? 'Upload receipts, warranties, or insurance contracts to let PaperMind AI generate renewal alerts automatically.'
                : 'Your warranties, insurance policies, and bills are up to date.'}
            </p>
          </div>
        ) : (
          filtered.map(({ reminder, doc }) => {
            const isUrgent = reminder.daysRemaining <= 30 && reminder.status === 'active';
            const isResolved = reminder.status === 'resolved';

            return (
              <div
                key={reminder.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${
                  isResolved
                    ? 'bg-gray-50 dark:bg-[#15161A]/50 border-gray-200 dark:border-white/5 opacity-60'
                    : isUrgent
                    ? 'bg-amber-50/60 dark:bg-[#1C1D22] border-amber-300 dark:border-amber-500/40'
                    : 'bg-white dark:bg-[#1C1D22] border-gray-200 dark:border-white/10'
                }`}
              >
                
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-bold ${
                      isResolved
                        ? 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-slate-400'
                        : isUrgent
                        ? 'bg-amber-500 text-white dark:text-black font-bold animate-pulse'
                        : 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {isUrgent ? <AlertTriangle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                        {reminder.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300">
                        {reminder.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">
                      <span>Linked Document:</span>
                      <button
                        onClick={() => onSelectDocument(doc)}
                        className="font-mono font-semibold text-blue-600 dark:text-[#4F8CFF] hover:underline flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        <span>{doc.autoRenamedFileName}</span>
                      </button>
                    </p>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 dark:text-slate-400 uppercase font-bold block">Due Date</span>
                    <span className={`text-xs font-bold ${isUrgent ? 'text-amber-700 dark:text-amber-400' : 'text-gray-800 dark:text-slate-200'}`}>
                      {reminder.dueDate} ({reminder.daysRemaining} days left)
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleResolve(reminder.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isResolved
                        ? 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-slate-300'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                    <span>{isResolved ? 'Re-open' : 'Mark Done'}</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
