import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth';
import { UserService } from '@/services/user.service';
import { AuditService } from '@/services/audit.service';
import { getClientIP } from '@/lib/request-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, address, city, state, zipCode, country, dateOfBirth, department, position, employeeId, password, role } = registerSchema.parse(body);

    const existingUser = await UserService.findByEmail(email);
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const userId = await UserService.createUser({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      country,
      dateOfBirth,
      department,
      position,
      employeeId,
      password,
      role,
    });

    await AuditService.log({
      userId,
      action: 'user_registered',
      resource: 'user',
      resourceId: userId,
      details: `New user registered: ${email}`,
      ipAddress: getClientIP(request),
      userAgent: request.headers.get('user-agent') || undefined,
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}