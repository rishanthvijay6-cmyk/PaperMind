import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Upload, 
  Bell, 
  Command,
  Zap,
  Moon,
  Sun,
  Globe,
  Mail,
  ChevronDown
} from 'lucide-react';
import { UserPlan, NotificationItem } from '../types';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGES, CURRENCIES } from '../i18n/translations';
import { NotificationCenterPopover } from './NotificationCenterPopover';

interface NavbarProps {
  userPlan: UserPlan;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenUpload: () => void;
  onOpenChat: () => void;
  onOpenPricing: () => void;
  onOpenReminders: () => void;
  onOpenEmailModal: () => void;
  onOpenCommandPalette?: () => void;
  onOpenAuth?: () => void;
  onToggleLanding?: () => void;
  activeRemindersCount: number;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onClearNotifications: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  userPlan,
  searchQuery,
  setSearchQuery,
  onOpenUpload,
  onOpenChat,
  onOpenPricing,
  onOpenReminders,
  onOpenEmailModal,
  onOpenCommandPalette,
  onOpenAuth,
  onToggleLanding,
  activeRemindersCount,
  notifications,
  onMarkAllNotificationsRead,
  onClearNotifications,
  onSelectNotification,
  darkMode = false,
  setDarkMode,
  userEmail = 'rishanthr50@gmail.com',
}) => {
  const { 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    currentLanguageMeta, 
    currentCurrencyMeta, 
    t 
  } = useTranslation();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#0B0B0F]/95 backdrop-blur-md transition-colors">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 gap-3">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onToggleLanding}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg text-gray-900 dark:text-white">
                  Paper<span className="text-blue-600 dark:text-blue-400">Mind</span>
                </span>
                <span className="hidden sm:inline-block rounded-full bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Global
                </span>
              </div>
              <p className="hidden md:block text-[10px] font-medium text-gray-500 dark:text-gray-400 -mt-0.5">
                {t('tagline')}
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar / Command Palette Trigger */}
        <div className="flex-1 max-w-lg relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={onOpenCommandPalette}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#15161A] pl-10 pr-20 py-2 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:bg-white dark:focus:bg-[#15161A] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
            />
            <button
              onClick={onOpenCommandPalette}
              className="absolute right-2.5 hidden sm:flex items-center gap-1 rounded-md bg-white dark:bg-white/10 px-2 py-0.5 text-[10px] font-mono font-medium text-gray-500 dark:text-gray-300 border border-gray-200 dark:border-white/10 shadow-xs hover:bg-gray-100"
            >
              <Command className="h-3 w-3" /> K
            </button>
          </div>
        </div>

        {/* Action Controls & Global i18n Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* i18n Language & Currency Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#15161A] hover:bg-gray-100 dark:hover:bg-white/10 text-xs font-semibold text-gray-800 dark:text-white transition shadow-xs"
              title="Change Language & Currency"
            >
              <span className="text-sm">{currentLanguageMeta.flag}</span>
              <span className="hidden md:inline">{currentLanguageMeta.code.toUpperCase()}</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold ml-0.5">{currentCurrencyMeta.symbol}</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-11 z-50 w-64 bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-3 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-blue-600" /> Language &amp; Locale
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">18 i18n Locales</span>
                </div>

                {/* Language Select */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-gray-500 dark:text-slate-400 uppercase">
                    Select Language
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-0.5 pr-1">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition ${
                          language === l.code
                            ? 'bg-blue-600 text-white font-bold'
                            : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.nativeName}</span>
                        </div>
                        {l.isRTL && (
                          <span className="text-[9px] px-1 bg-amber-500/20 text-amber-600 dark:text-amber-300 rounded">
                            RTL
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Currency Quick Switch */}
                <div className="space-y-1 border-t border-gray-100 dark:border-white/10 pt-2">
                  <label className="text-[10px] font-semibold text-gray-500 dark:text-slate-400 uppercase">
                    Primary Currency
                  </label>
                  <div className="grid grid-cols-3 gap-1 text-[11px]">
                    {Object.values(CURRENCIES).slice(0, 6).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code);
                          setIsLangOpen(false);
                        }}
                        className={`py-1 px-1.5 rounded text-center font-bold transition ${
                          currency === c.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-slate-200'
                        }`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Notification Dispatcher Trigger */}
          <button
            onClick={onOpenEmailModal}
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2.5 py-1.5 text-xs font-semibold transition-all shadow-xs"
            title="PaperMind Email Reminders & Digest"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden lg:inline">Email Dispatch</span>
          </button>

          {/* Ask AI Chat Button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 px-3 py-1.5 text-xs font-semibold transition-all shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">{t('aiChat')}</span>
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3.5 py-1.5 text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">{t('upload')}</span>
          </button>

          {/* Notification Center Popover Bell Icon */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="Notification Center"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0B0B0F]">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            <NotificationCenterPopover
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
              notifications={notifications}
              onMarkAllAsRead={onMarkAllNotificationsRead}
              onClearAll={onClearNotifications}
              onSelectNotification={(item) => {
                setIsNotifOpen(false);
                onSelectNotification(item);
              }}
            />
          </div>

          {/* SaaS Plan Tier */}
          <button
            onClick={onOpenPricing}
            className="hidden xl:flex items-center gap-1.5 rounded-xl bg-gray-50 dark:bg-[#15161A] border border-gray-200 dark:border-white/10 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:border-blue-500 transition-colors"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>{userPlan.tier}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          {setDarkMode && (
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-600" />}
            </button>
          )}

          {/* Profile / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-white/10"
            title="Account Settings"
          >
            <div className="h-8 w-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {userEmail.substring(0, 2).toUpperCase()}
            </div>
          </button>

        </div>
      </div>
    </header>
  );
};


