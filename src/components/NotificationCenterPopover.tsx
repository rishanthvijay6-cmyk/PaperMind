import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertCircle, 
  Clock, 
  Mail, 
  ShieldAlert, 
  FileText, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { NotificationItem, VaultDocument } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationCenterPopover: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onSelectNotification,
}) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'urgent') return n.type === 'urgent';
    return !n.archived;
  });

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
      
      {/* Header */}
      <div className="p-3.5 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1C1D22] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              Notification Center
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-slate-400">
              Live PaperMind system &amp; document alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {notifications.length > 0 && (
            <button
              onClick={onMarkAllAsRead}
              title="Mark all as read"
              className="p-1 rounded-lg text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#111114] text-[11px] font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 text-center transition border-b-2 ${
            filter === 'all'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`flex-1 py-1.5 text-center transition border-b-2 ${
            filter === 'unread'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter('urgent')}
          className={`flex-1 py-1.5 text-center transition border-b-2 ${
            filter === 'urgent'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Urgent ({notifications.filter((n) => n.type === 'urgent').length})
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500 dark:text-slate-400 space-y-1">
            <Sparkles className="h-5 w-5 mx-auto text-blue-500/40" />
            <p className="font-semibold text-gray-700 dark:text-slate-300">No notifications here</p>
            <p className="text-[10px]">You are completely caught up with all document alerts!</p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-3 transition cursor-pointer flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-[#1C1D22] ${
                !item.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {item.type === 'urgent' && (
                  <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                )}
                {item.type === 'reminder' && (
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <Clock className="h-4 w-4" />
                  </div>
                )}
                {item.type === 'email_sent' && (
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    <Mail className="h-4 w-4" />
                  </div>
                )}
                {item.type === 'system' && (
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold truncate ${!item.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-300'}`}>
                    {item.title}
                  </span>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-1">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-slate-400 line-clamp-2 leading-snug mt-0.5">
                  {item.message}
                </p>
              </div>

              {!item.read && (
                <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-2 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1C1D22] flex items-center justify-between text-[10px]">
          <button
            onClick={onClearAll}
            className="text-gray-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 flex items-center gap-1 transition font-semibold"
          >
            <Trash2 className="h-3 w-3" /> Clear Notifications
          </button>
          <span className="text-gray-400 font-mono">PaperMind Realtime Engine</span>
        </div>
      )}

    </div>
  );
};
