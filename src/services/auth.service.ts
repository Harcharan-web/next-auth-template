import { db } from '@/lib/db';
import { passwordResetTokens } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export class AuthService {
  static async generatePasswordResetToken(email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.email, email));
    
    await db.insert(passwordResetTokens).values({
      id: crypto.randomUUID(),
      email,
      token,
      expires,
    });

    return token;
  }

  static async verifyPasswordResetToken(token: string) {
    const result = await db.select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);

    if (!result.length || result[0].expires < new Date()) {
      return null;
    }

    return result[0];
  }

  static async deletePasswordResetToken(token: string) {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, token));
  }
}