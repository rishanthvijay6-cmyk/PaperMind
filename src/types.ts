export type DocumentType =
  | 'Invoice'
  | 'Receipt'
  | 'Warranty Card'
  | 'Insurance Policy'
  | 'Tax File'
  | 'Bill'
  | 'Medical Report'
  | 'Government ID'
  | 'Education Certificate'
  | 'Employment Document'
  | 'Bank Statement'
  | 'Contract'
  | 'Salary Slip'
  | 'GST Bill'
  | 'Passport'
  | 'Visa'
  | 'Driving License'
  | 'Property Document'
  | 'Academic Document'
  | 'Other';

export type Category =
  | 'Electronics'
  | 'Medical'
  | 'Food'
  | 'Travel'
  | 'Home'
  | 'Furniture'
  | 'Education'
  | 'Insurance'
  | 'Finance'
  | 'Taxes'
  | 'Automobile'
  | 'Subscriptions'
  | 'Business'
  | 'Government Documents';

export type SmartTag =
  | 'Apple'
  | 'Electronics'
  | 'Warranty'
  | 'Mobile'
  | 'GST'
  | 'Premium Purchase'
  | 'Business Expense'
  | 'Tax Eligible'
  | 'Urgent Renewal'
  | 'Reimbursable'
  | 'Utility'
  | 'Health'
  | 'Automobile'
  | 'Subscribed';

export type LanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'nl'
  | 'tr'
  | 'ar'
  | 'hi'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'ja'
  | 'ko'
  | 'zh-CN'
  | 'zh-TW';

export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'AED'
  | 'SGD'
  | 'CAD'
  | 'AUD'
  | 'CHF'
  | 'BRL'
  | 'ZAR';

export type CountryCode =
  | 'IN'
  | 'US'
  | 'GB'
  | 'DE'
  | 'FR'
  | 'IT'
  | 'ES'
  | 'BR'
  | 'AE'
  | 'SG'
  | 'CA'
  | 'AU'
  | 'JP'
  | 'KR'
  | 'CN'
  | 'NL'
  | 'TR';

export type ReminderType =
  | 'Warranty'
  | 'Insurance'
  | 'ID Expiry'
  | 'Bill Due'
  | 'AMC Renewal'
  | 'Passport Expiry'
  | 'Visa Expiry'
  | 'Tax Deadline'
  | 'Vehicle Service'
  | 'Medical Checkup'
  | 'Subscription Renewal'
  | 'Rent Due'
  | 'EMI Due'
  | 'Custom';

export type RecurrenceType = 'None' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
}

export interface AIReminder {
  id: string;
  documentId: string;
  title: string;
  type: ReminderType;
  dueDate: string; // YYYY-MM-DD
  daysRemaining: number;
  status: 'active' | 'snoozed' | 'resolved';
  notificationSent: boolean;
  recurrence?: RecurrenceType;
  timezone?: string;
  notes?: string;
}

export interface VaultDocument {
  id: string;
  originalFileName: string;
  autoRenamedFileName: string;
  fileType: 'image/jpeg' | 'image/png' | 'application/pdf' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  fileUrl: string; // Base64 data URL or sample image URL
  uploadDate: string;
  
  // Extracted AI Metadata
  documentType: DocumentType;
  merchant: string;
  purchaseDate: string; // YYYY-MM-DD
  invoiceDate?: string;
  invoiceNumber?: string;
  gstNumber?: string;
  productOrService: string;
  brand?: string;
  serialNumber?: string;
  
  // Monetary details
  totalAmount: number;
  currency: string; // e.g., ₹, $, €, £, ¥, AED
  currencyCode?: CurrencyCode;
  taxAmount?: number;
  gstAmount?: number;
  paymentMethod?: string; // Credit Card, UPI, NetBanking, Cash, Wire
  
  // Categorization & Tags
  category: Category;
  subCategory?: string;
  smartTags: SmartTag[];
  isBusinessExpense: boolean;
  isTaxEligible: boolean;
  
  // Specific metadata
  warrantyExpiryDate?: string;
  insuranceRenewalDate?: string;
  policyNumber?: string;
  vehicleNumber?: string;
  vehicleModel?: string;
  accountNumberMasked?: string;
  importantNotes?: string;
  missingFields?: string[]; // Missing info flag array

  // Reminders linked
  reminders: AIReminder[];

  // Fraud / Quality check flags
  fraudRiskScore: number; // 0 (Legit) to 100 (Suspicious)
  isDuplicate?: boolean;
  originalQualityScore: number; // 0 to 100
  imageEnhanced: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: 'DOCUMENT_UPLOAD' | 'AI_OCR_EXTRACTION' | 'FILE_RENAME' | 'REMINDER_TRIGGER' | 'EXPORT_DATA' | 'TAG_UPDATE' | 'GMAIL_SYNC' | 'CLOUD_BACKUP' | 'EMAIL_DISPATCHED' | 'OAUTH_AUTH';
  documentName: string;
  userEmail: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Encrypted';
}

export interface ExpenseReportSummary {
  totalSpent: number;
  totalTaxClaimable: number;
  businessExpensesCount: number;
  reimbursableCount: number;
  gstInputCredit: number;
  categoryBreakdown: { category: Category; amount: number; percentage: number }[];
  merchantBreakdown: { merchant: string; amount: number; count: number }[];
}

export interface UserPlan {
  tier: 'Free' | 'Premium' | 'Family' | 'Business' | 'Enterprise';
  documentsUsed: number;
  documentsLimit: number;
  hasApiAccess: boolean;
  storageUsedMB: number;
  storageLimitMB: number;
}

export interface GmailConfig {
  isConnected: boolean;
  email: string;
  lastSynced: string;
  scopes: string[];
  sendReminders: boolean;
  sendWeeklySummaries: boolean;
  sendTaxAlerts: boolean;
}

export interface CloudStorageProvider {
  id: 'google_drive' | 'onedrive' | 'dropbox' | 'icloud';
  name: string;
  isConnected: boolean;
  lastBackup?: string;
  storageUsed?: string;
  autoSync: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'urgent' | 'reminder' | 'system' | 'email_sent';
  read: boolean;
  archived?: boolean;
  documentId?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  country: CountryCode;
  language: LanguageCode;
  currency: CurrencyCode;
  timezone: string;
  dateFormat: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  gmailConfig: GmailConfig;
  cloudProviders: CloudStorageProvider[];
}

