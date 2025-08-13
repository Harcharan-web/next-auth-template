import { pgTable, text, timestamp, primaryKey, integer, boolean, pgEnum, uuid } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const userRoleEnum = pgEnum('user_role', [
  'super_admin',
  'admin', 
  'manager',
  'accountant',
  'finance_manager',
  'auditor',
  'bookkeeper',
  'tax_specialist',
  'payroll_specialist',
  'accounts_receivable',
  'accounts_payable',
  'financial_analyst',
  'controller',
  'cfo',
  'employee',
  'client',
  'vendor',
  'guest'
]);

export const userStatusEnum = pgEnum('user_status', [
  'active',
  'inactive', 
  'suspended',
  'pending_verification',
  'locked'
]);

export const users = pgTable('user', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  country: text('country').default('US'),
  dateOfBirth: timestamp('date_of_birth', { mode: 'date' }),
  role: userRoleEnum('role').default('employee'),
  status: userStatusEnum('status').default('pending_verification'),
  department: text('department'),
  position: text('position'),
  employeeId: text('employee_id'),
  hireDate: timestamp('hire_date', { mode: 'date' }),
  isEmailVerified: boolean('is_email_verified').default(false),
  isPhoneVerified: boolean('is_phone_verified').default(false),
  isTwoFactorEnabled: boolean('is_two_factor_enabled').default(false),
  lastLoginAt: timestamp('last_login_at', { mode: 'date' }),
  passwordChangedAt: timestamp('password_changed_at', { mode: 'date' }),
  avatar: text('avatar'),
  bio: text('bio'),
  timezone: text('timezone').default('UTC'),
  language: text('language').default('en'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [
    primaryKey({ columns: [vt.identifier, vt.token] }),
  ]
);

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});

export const userSessions = pgTable('user_sessions', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  deviceInfo: text('device_info'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  isActive: boolean('is_active').default(true),
  lastActivity: timestamp('last_activity', { mode: 'date' }).defaultNow(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').notNull().primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  action: text('action').notNull(),
  resource: text('resource'),
  resourceId: text('resource_id'),
  details: text('details'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
});