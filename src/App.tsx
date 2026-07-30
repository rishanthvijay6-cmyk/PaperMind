import React, { useState, useEffect } from 'react';
import { 
  VaultDocument, 
  Category, 
  UserPlan, 
  AuditLog,
  NotificationItem,
  GmailConfig
} from './types';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_USER_PLAN, 
  INITIAL_AUDIT_LOGS 
} from './data/initialVault';
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DocumentGrid } from './components/DocumentGrid';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentDetailModal } from './components/DocumentDetailModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RemindersView } from './components/RemindersView';
import { BusinessReportsView } from './components/BusinessReportsView';
import { SecurityAuditView } from './components/SecurityAuditView';
import { PricingModal } from './components/PricingModal';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { OnboardingWelcomeModal } from './components/OnboardingWelcomeModal';

const DEFAULT_USER_EMAIL = 'user@papermind.ai';

function MainAppContent() {
  const { t } = useTranslation();

  const [currentUserEmail, setCurrentUserEmail] = useState<string>(() => {
    return localStorage.getItem('papermind_current_user_email') || DEFAULT_USER_EMAIL;
  });

  const [documents, setDocuments] = useState<VaultDocument[]>(() => {
    const saved = localStorage.getItem(`papermind_docs_${currentUserEmail}`);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    const saved = localStorage.getItem(`papermind_plan_${currentUserEmail}`);
    return saved ? JSON.parse(saved) : INITIAL_USER_PLAN;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`papermind_logs_${currentUserEmail}`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`papermind_notifs_${currentUserEmail}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [gmailConfig, setGmailConfig] = useState<GmailConfig>({
    isConnected: true,
    email: currentUserEmail,
    lastSynced: 'Just now',
    autoSyncEnabled: true,
    syncFrequencyMinutes: 30,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<ActiveTab>('vault');
  const [darkMode, setDarkMode] = useState(false);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedDetailDoc, setSelectedDetailDoc] = useState<VaultDocument | null>(null);

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    const onboarded = localStorage.getItem(`papermind_onboarded_${currentUserEmail}`);
    return !onboarded;
  });

  // Persist state when data or email changes
  useEffect(() => {
    localStorage.setItem('papermind_current_user_email', currentUserEmail);
    setGmailConfig((prev) => ({ ...prev, email: currentUserEmail }));
  }, [currentUserEmail]);

  useEffect(() => {
    localStorage.setItem(`papermind_docs_${currentUserEmail}`, JSON.stringify(documents));
  }, [documents, currentUserEmail]);

  useEffect(() => {
    localStorage.setItem(`papermind_plan_${currentUserEmail}`, JSON.stringify(userPlan));
  }, [userPlan, currentUserEmail]);

  useEffect(() => {
    localStorage.setItem(`papermind_logs_${currentUserEmail}`, JSON.stringify(auditLogs));
  }, [auditLogs, currentUserEmail]);

  useEffect(() => {
    localStorage.setItem(`papermind_notifs_${currentUserEmail}`, JSON.stringify(notifications));
  }, [notifications, currentUserEmail]);

  const handleLoginSuccess = (email: string) => {
    const cleanEmail = email.trim().toLowerCase() || DEFAULT_USER_EMAIL;
    setCurrentUserEmail(cleanEmail);

    // Load that user's specific data
    const savedDocs = localStorage.getItem(`papermind_docs_${cleanEmail}`);
    setDocuments(savedDocs ? JSON.parse(savedDocs) : []);

    const savedPlan = localStorage.getItem(`papermind_plan_${cleanEmail}`);
    setUserPlan(savedPlan ? JSON.parse(savedPlan) : INITIAL_USER_PLAN);

    const savedLogs = localStorage.getItem(`papermind_logs_${cleanEmail}`);
    setAuditLogs(savedLogs ? JSON.parse(savedLogs) : []);

    const savedNotifs = localStorage.getItem(`papermind_notifs_${cleanEmail}`);
    setNotifications(savedNotifs ? JSON.parse(savedNotifs) : []);

    const onboarded = localStorage.getItem(`papermind_onboarded_${cleanEmail}`);
    if (!onboarded) {
      setIsOnboardingOpen(true);
    }
  };

  const handleLogout = () => {
    const newGuest = `user_${Math.random().toString(36).substring(2, 7)}@papermind.ai`;
    handleLoginSuccess(newGuest);
    setIsAuthOpen(true);
  };

  const handleCloseOnboarding = () => {
    setIsOnboardingOpen(false);
    localStorage.setItem(`papermind_onboarded_${currentUserEmail}`, 'true');
  };

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Command palette hotkey (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Count active reminders expiring within 30 days
  const activeRemindersCount = documents.reduce((acc, doc) => {
    const activeRems = doc.reminders?.filter((r) => r.status === 'active' && r.daysRemaining <= 30) || [];
    return acc + activeRems.length;
  }, 0);

  const handleDocumentAdded = (newDoc: VaultDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setUserPlan((prev) => ({
      ...prev,
      documentsUsed: prev.documentsUsed + 1,
      storageUsedMB: parseFloat((prev.storageUsedMB + 3.2).toFixed(1)),
    }));

    // Add audit log
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'DOCUMENT_UPLOAD',
      documentName: newDoc.autoRenamedFileName,
      userEmail: currentUserEmail,
      ipAddress: '192.168.1.45',
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: '✨ Document Added & Renamed',
      message: `Successfully processed "${newDoc.autoRenamedFileName}" via Gemini OCR.`,
      timestamp: 'Just now',
      type: 'system',
      read: false,
      documentId: newDoc.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleUpdateDocument = (updatedDoc: VaultDocument) => {
    setDocuments((prev) => prev.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)));
    setSelectedDetailDoc(updatedDoc);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    if (selectedDetailDoc?.id === id) {
      setSelectedDetailDoc(null);
    }
  };

  const handleSendEmailNotification = (templateType: string, recipient: string) => {
    const newNotif: NotificationItem = {
      id: `notif-email-${Date.now()}`,
      title: `✉️ Email Dispatched (${templateType})`,
      message: `HTML email alert successfully delivered to ${recipient}.`,
      timestamp: 'Just now',
      type: 'email_sent',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    const newLog: AuditLog = {
      id: `log-email-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'EMAIL_DISPATCHED',
      documentName: selectedDetailDoc?.autoRenamedFileName || 'Vault System Report',
      userEmail: recipient,
      ipAddress: '192.168.1.45',
      status: 'Success',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleExportCSV = (docsToExport: VaultDocument[]) => {
    const headers = [
      'ID',
      'Auto-Renamed Filename',
      'Merchant',
      'Category',
      'Purchase Date',
      'Total Amount',
      'Currency',
      'GST Number',
      'GST Amount',
      'Warranty Expiry',
      'Is Business Expense',
      'Is Tax Eligible',
    ];

    const rows = docsToExport.map((d) => [
      d.id,
      `"${d.autoRenamedFileName}"`,
      `"${d.merchant}"`,
      `"${d.category}"`,
      d.purchaseDate,
      d.totalAmount,
      d.currency,
      `"${d.gstNumber || ''}"`,
      d.gstAmount || 0,
      d.warrantyExpiryDate || '',
      d.isBusinessExpense ? 'Yes' : 'No',
      d.isTaxEligible ? 'Yes' : 'No',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PaperMind_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If user switches to Landing page tab
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#0B0B0F] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#2563EB] selection:text-white">
        <LandingPage
          onOpenApp={() => setActiveTab('vault')}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
        
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(email) => {
            handleLoginSuccess(email);
            setIsAuthOpen(false);
            setActiveTab('vault');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] dark:bg-[#0B0B0F] text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-[#2563EB] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        userPlan={userPlan}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenChat={() => setIsChatOpen(!isChatOpen)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenReminders={() => setActiveTab('reminders')}
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleLanding={() => setActiveTab('landing')}
        activeRemindersCount={activeRemindersCount}
        notifications={notifications}
        onMarkAllNotificationsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onClearNotifications={() => setNotifications([])}
        onSelectNotification={(item) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
          );
          if (item.documentId) {
            const found = documents.find((d) => d.id === item.documentId);
            if (found) setSelectedDetailDoc(found);
          } else {
            setActiveTab('reminders');
          }
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userEmail={currentUserEmail}
      />

      {/* Main App Layout */}
      <div className="flex">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          documents={documents}
          userPlan={userPlan}
          activeRemindersCount={activeRemindersCount}
        />

        {/* Central Workspace */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto min-w-0">
          {activeTab === 'vault' && (
            <DocumentGrid
              documents={documents}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSelectDocument={(doc) => setSelectedDetailDoc(doc)}
              onDeleteDocument={handleDeleteDocument}
              onExportCSV={handleExportCSV}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          )}

          {activeTab === 'chat' && (
            <div className="bg-white dark:bg-[#15161A] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl space-y-4">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">Natural Language AI Vault Query</h2>
              <p className="text-xs text-gray-500 dark:text-slate-400 max-w-lg">Ask Gemini Flash anything about your receipts, invoices, GST calculations, warranty claims, or purchase history in 18 languages.</p>
              <button
                onClick={() => setIsChatOpen(true)}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all"
              >
                Open PaperMind Assistant Drawer
              </button>
            </div>
          )}

          {activeTab === 'reminders' && (
            <RemindersView
              documents={documents}
              onSelectDocument={(doc) => setSelectedDetailDoc(doc)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard documents={documents} />
          )}

          {activeTab === 'business' && (
            <BusinessReportsView
              documents={documents}
              onExportCSV={handleExportCSV}
            />
          )}

          {activeTab === 'security' && (
            <SecurityAuditView auditLogs={auditLogs} />
          )}

          {activeTab === 'profile' && (
            <ProfileSettingsView
              userPlan={userPlan}
              documents={documents}
              userEmail={currentUserEmail}
              onOpenPricing={() => setIsPricingOpen(true)}
              onExportCSV={handleExportCSV}
              onLogout={handleLogout}
            />
          )}

          {activeTab === 'pricing' && (
            <div className="text-center py-12">
              <button
                onClick={() => setIsPricingOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-xl transition-all"
              >
                Open Pricing &amp; Micro SaaS Plans
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Onboarding Modal for First Time Experience */}
      <OnboardingWelcomeModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Raycast-style Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        documents={documents}
        onSelectDocument={(doc) => setSelectedDetailDoc(doc)}
        onNavigate={(tab) => setActiveTab(tab)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(email) => {
          handleLoginSuccess(email);
          setIsAuthOpen(false);
        }}
      />

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

      {/* Document Inspector Detail Modal */}
      <DocumentDetailModal
        document={selectedDetailDoc}
        onClose={() => setSelectedDetailDoc(null)}
        onUpdateDocument={handleUpdateDocument}
        onDeleteDocument={handleDeleteDocument}
      />

      {/* Email Notification Modal */}
      <EmailNotificationModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        document={selectedDetailDoc || documents[0]}
        gmailConfig={gmailConfig}
        onConnectGmail={() => {
          setGmailConfig((prev) => ({ ...prev, isConnected: true }));
        }}
        onSendEmail={handleSendEmailNotification}
      />

      {/* AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        documents={documents}
        onSelectDocument={(doc) => setSelectedDetailDoc(doc)}
      />

      {/* SaaS Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        userPlan={userPlan}
        onSelectTier={(tier) => setUserPlan((prev) => ({ ...prev, tier }))}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
