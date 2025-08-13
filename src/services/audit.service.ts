import { db } from '@/lib/db';
import { auditLogs } from '@/lib/db/schema';
import crypto from 'crypto';

export interface AuditLogData {
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditService {
  static async log(data: AuditLogData) {
    await db.insert(auditLogs).values({
      id: crypto.randomUUID(),
      userId: data.userId || null,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });
  }
}