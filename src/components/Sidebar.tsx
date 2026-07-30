import React from 'react';
import { 
  FolderKanban, 
  Sparkles, 
  Clock, 
  BarChart3, 
  Briefcase, 
  ShieldCheck, 
  CreditCard,
  Laptop,
  Stethoscope,
  Utensils,
  Plane,
  Home,
  Armchair,
  GraduationCap,
  ShieldAlert,
  Landmark,
  FileCheck,
  Car,
  Tv,
  Building2,
  FileText,
  FolderOpen,
  HardDrive,
  Layout,
  User
} from 'lucide-react';
import { Category, UserPlan, VaultDocument } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

export type ActiveTab = 
  | 'landing'
  | 'vault' 
  | 'chat' 
  | 'reminders' 
  | 'analytics' 
  | 'business' 
  | 'security' 
  | 'profile'
  | 'pricing';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory: Category | 'ALL';
  setSelectedCategory: (cat: Category | 'ALL') => void;
  documents: VaultDocument[];
  userPlan: UserPlan;
  activeRemindersCount: number;
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Electronics: <Laptop className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  Medical: <Stethoscope className="h-4 w-4 text-rose-500" />,
  Food: <Utensils className="h-4 w-4 text-amber-500" />,
  Travel: <Plane className="h-4 w-4 text-cyan-500" />,
  Home: <Home className="h-4 w-4 text-emerald-500" />,
  Furniture: <Armchair className="h-4 w-4 text-orange-500" />,
  Education: <GraduationCap className="h-4 w-4 text-indigo-500" />,
  Insurance: <ShieldAlert className="h-4 w-4 text-purple-500" />,
  Finance: <Landmark className="h-4 w-4 text-emerald-600" />,
  Taxes: <FileCheck className="h-4 w-4 text-blue-500" />,
  Automobile: <Car className="h-4 w-4 text-red-500" />,
  Subscriptions: <Tv className="h-4 w-4 text-violet-500" />,
  Business: <Building2 className="h-4 w-4 text-gray-600 dark:text-slate-300" />,
  'Government Documents': <FileText className="h-4 w-4 text-teal-600" />,
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  documents,
  userPlan,
  activeRemindersCount,
}) => {
  const { t, currentCountryMeta } = useTranslation();

  const getCategoryCount = (cat: Category) => {
    return documents.filter((d) => d.category === cat).length;
  };

  const navItems = [
    { id: 'vault' as ActiveTab, label: t('vault'), icon: <FolderKanban className="h-4 w-4" />, count: documents.length },
    { id: 'chat' as ActiveTab, label: t('aiChat'), icon: <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />, badge: 'AI' },
    { id: 'reminders' as ActiveTab, label: t('reminders'), icon: <Clock className="h-4 w-4" />, count: activeRemindersCount, badgeColor: 'bg-red-500' },
    { id: 'analytics' as ActiveTab, label: t('analytics'), icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'business' as ActiveTab, label: t('businessTax'), icon: <Briefcase className="h-4 w-4" /> },
    { id: 'security' as ActiveTab, label: t('security'), icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'profile' as ActiveTab, label: t('settings'), icon: <User className="h-4 w-4" /> },
    { id: 'landing' as ActiveTab, label: 'Product Showcase', icon: <Layout className="h-4 w-4 text-emerald-600" />, badge: 'Landing' },
    { id: 'pricing' as ActiveTab, label: t('pricing'), icon: <CreditCard className="h-4 w-4" /> },
  ];

  const categories: Category[] = [
    'Electronics',
    'Medical',
    'Food',
    'Travel',
    'Home',
    'Furniture',
    'Education',
    'Insurance',
    'Finance',
    'Taxes',
    'Automobile',
    'Subscriptions',
    'Business',
    'Government Documents',
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15161A]/80 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16 p-4 overflow-y-auto">
      
      {/* Primary Navigation Menu */}
      <div className="space-y-1 mb-6">
        <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Main Workspace</span>
          <span className="text-[10px] text-blue-600 font-mono flex items-center gap-1">
            <span>{currentCountryMeta.flag}</span> {currentCountryMeta.code}
          </span>
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id !== 'vault') {
                  setSelectedCategory('ALL');
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'}`}>
                  {item.badge}
                </span>
              )}
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${isActive ? 'bg-white/20 text-white' : item.badgeColor ? `${item.badgeColor} text-white` : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-slate-300'}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Auto-Organized Folders Section */}
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Auto AI Smart Folders</span>
          <span className="text-[10px] text-blue-600 font-mono">Auto Sorted</span>
        </div>

        <button
          onClick={() => {
            setActiveTab('vault');
            setSelectedCategory('ALL');
          }}
          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeTab === 'vault' && selectedCategory === 'ALL'
              ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
              : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <FolderOpen className="h-3.5 w-3.5 text-blue-600" />
            <span>{t('filterAll')}</span>
          </div>
          <span className="text-[11px] font-bold text-gray-500">{documents.length}</span>
        </button>

        <div className="space-y-0.5 pt-1">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            const isCatActive = activeTab === 'vault' && selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab('vault');
                  setSelectedCategory(cat);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isCatActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border-l-2 border-blue-600'
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {CATEGORY_ICONS[cat]}
                  <span className="truncate">{cat}</span>
                </div>
                {count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-slate-300 font-bold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cloud Storage Usage Widget */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5">
            <HardDrive className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-semibold text-gray-700 dark:text-slate-300">Vault Capacity</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white">{userPlan.storageUsedMB} MB</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${Math.min(100, (userPlan.storageUsedMB / userPlan.storageLimitMB) * 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1.5 text-center font-mono">
          AES-256 Encrypted Storage
        </p>
      </div>

    </aside>
  );
};
