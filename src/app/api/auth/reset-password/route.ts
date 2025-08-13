import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordSchema } from '@/lib/validations/auth';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';
import { AuditService } from '@/services/audit.service';
import { getClientIP } from '@/lib/request-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = resetPasswordSchema.parse(body);

    const resetToken = await AuthService.verifyPasswordResetToken(token);
    
    if (!resetToken) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    await UserService.updatePassword(resetToken.email, password);
    await AuthService.deletePasswordResetToken(token);

    const user = await UserService.findByEmail(resetToken.email);
    
    if (user) {
      await AuditService.log({
        userId: user.id,
        action: 'password_reset_completed',
        resource: 'user',
        resourceId: user.id,
        details: 'Password successfully reset',
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || undefined,
      });
    }

    return NextResponse.json(
      { message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}