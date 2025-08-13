import { db } from '@/lib/db';
import { userSessions } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';

export interface CreateSessionData {
  userId: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class SessionService {
  static async createSession(data: CreateSessionData) {
    const sessionId = crypto.randomUUID();
    
    await db.insert(userSessions).values({
      id: sessionId,
      userId: data.userId,
      deviceInfo: data.deviceInfo,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    });

    return sessionId;
  }

  static async updateActivity(sessionId: string) {
    await db.update(userSessions)
      .set({ lastActivity: new Date() })
      .where(eq(userSessions.id, sessionId));
  }

  static async deactivateSession(sessionId: string) {
    await db.update(userSessions)
      .set({ isActive: false })
      .where(eq(userSessions.id, sessionId));
  }

  static async deactivateAllUserSessions(userId: string) {
    await db.update(userSessions)
      .set({ isActive: false })
      .where(eq(userSessions.userId, userId));
  }

  static async getActiveSessions(userId: string) {
    return await db.select()
      .from(userSessions)
      .where(and(
        eq(userSessions.userId, userId),
        eq(userSessions.isActive, true)
      ));
  }
}