import { NextRequest, NextResponse } from 'next/server';
import { forgotPasswordSchema } from '@/lib/validations/auth';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';
import { AuditService } from '@/services/audit.service';
import { getClientIP } from '@/lib/request-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    const user = await UserService.findByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset link will be sent' },
        { status: 200 }
      );
    }

    const token = await AuthService.generatePasswordResetToken(email);
    
    await AuditService.log({
      userId: user.id,
      action: 'password_reset_requested',
      resource: 'user',
      resourceId: user.id,
      details: `Password reset requested for ${email}`,
      ipAddress: getClientIP(request),
      userAgent: request.headers.get('user-agent') || undefined,
    });

    // In production, send email with reset link
    console.log(`Password reset token for ${email}: ${token}`);

    return NextResponse.json(
      { message: 'If an account exists, a reset link will be sent' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}