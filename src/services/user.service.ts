import { db } from '@/lib/db';
import { users, passwordResetTokens, userSessions, auditLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string;
  department?: string;
  position?: string;
  employeeId?: string;
  password: string;
  role: string;
}

export interface UserSession {
  userId: string;
  deviceInfo?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class UserService {
  static async findByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  static async findById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }

  static async createUser(userData: CreateUserData) {
    const userId = crypto.randomUUID();
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 12) : null;
    
    const fullName = `${userData.firstName} ${userData.lastName}`;
    
    await db.insert(users).values({
      id: userId,
      name: fullName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      country: userData.country || 'US',
      dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth) : null,
      department: userData.department,
      position: userData.position,
      employeeId: userData.employeeId,
      password: hashedPassword,
      role: userData.role as any,
      passwordChangedAt: hashedPassword ? new Date() : null,
      status: 'active', // OAuth users are automatically active
      isEmailVerified: userData.password ? false : true, // OAuth emails are pre-verified
    });

    return userId;
  }

  static getFullName(user: { firstName: string | null; lastName: string | null }): string {
    return [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Unknown User';
  }

  static async updatePassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await db.update(users)
      .set({ 
        password: hashedPassword,
        passwordChangedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(users.email, email));
  }

  static async updateLastLogin(userId: string) {
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, userId));
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}