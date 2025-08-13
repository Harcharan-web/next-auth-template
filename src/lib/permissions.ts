import { hasPermission } from '@/lib/constants';

export function checkPermission(userRole: string, permission: string): boolean {
  return hasPermission(userRole, permission);
}

export function requirePermission(userRole: string, permission: string): void {
  if (!hasPermission(userRole, permission)) {
    throw new Error('Insufficient permissions');
  }
}