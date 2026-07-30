import { VaultDocument, AuditLog, UserPlan } from '../types';

export const INITIAL_USER_PLAN: UserPlan = {
  tier: 'Business',
  documentsUsed: 0,
  documentsLimit: 10000,
  hasApiAccess: true,
  storageUsedMB: 0,
  storageLimitMB: 100000,
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [];

export const INITIAL_DOCUMENTS: VaultDocument[] = [];
