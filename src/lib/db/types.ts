import { users, userRoleEnum, userStatusEnum } from './schema';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = typeof userRoleEnum.enumValues[number];
export type UserStatus = typeof userStatusEnum.enumValues[number];

export interface UserWithFullName extends User {
  fullName: string;
}