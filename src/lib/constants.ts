export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant',
  FINANCE_MANAGER: 'finance_manager',
  AUDITOR: 'auditor',
  BOOKKEEPER: 'bookkeeper',
  TAX_SPECIALIST: 'tax_specialist',
  PAYROLL_SPECIALIST: 'payroll_specialist',
  ACCOUNTS_RECEIVABLE: 'accounts_receivable',
  ACCOUNTS_PAYABLE: 'accounts_payable',
  FINANCIAL_ANALYST: 'financial_analyst',
  CONTROLLER: 'controller',
  CFO: 'cfo',
  EMPLOYEE: 'employee',
  CLIENT: 'client',
  VENDOR: 'vendor',
  GUEST: 'guest',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification',
  LOCKED: 'locked',
} as const;

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: ['*'],
  [USER_ROLES.ADMIN]: ['users:*', 'accounts:*', 'reports:*'],
  [USER_ROLES.MANAGER]: ['users:read', 'accounts:*', 'reports:read'],
  [USER_ROLES.ACCOUNTANT]: ['accounts:*', 'reports:read'],
  [USER_ROLES.FINANCE_MANAGER]: ['accounts:*', 'reports:*', 'budgets:*'],
  [USER_ROLES.AUDITOR]: ['accounts:read', 'reports:read', 'audit:*'],
  [USER_ROLES.BOOKKEEPER]: ['transactions:*', 'accounts:read'],
  [USER_ROLES.EMPLOYEE]: ['profile:read', 'profile:update'],
  [USER_ROLES.CLIENT]: ['profile:read', 'profile:update', 'invoices:read'],
  [USER_ROLES.VENDOR]: ['profile:read', 'profile:update', 'payments:read'],
  [USER_ROLES.GUEST]: ['profile:read'],
};

export function hasPermission(userRole: string, permission: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  if (!rolePermissions) return false;
  
  return rolePermissions.includes('*') || rolePermissions.includes(permission);
}