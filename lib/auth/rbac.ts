import { getServerSession } from '@/lib/session/get-server-session';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'ENTERPRISE' | 'PREMIUM' | 'BASIC' | 'UNPAID';

export const SUPER_ADMIN_EMAIL = 'pranu21m@gmail.com';

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  isPaid: boolean;
  subscriptionPlan?: 'BASIC' | 'PREMIUM' | 'ENTERPRISE' | null;
  bankAccountDetailsAdded?: boolean;
}

export function isSuperAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}

export function isAdmin(email: string | null | undefined): boolean {
  // Super admin and explicit admin access given to pranu21m@gmail.com only
  return isSuperAdmin(email);
}

export function canDeleteResource(email: string | null | undefined): boolean {
  // Only super user admin has deletion rights for plugins, tasks, agents & connectors
  return isSuperAdmin(email);
}

export function getUserRole(email: string | null | undefined, userSubscription?: string): UserRole {
  if (isSuperAdmin(email)) {
    return 'SUPER_ADMIN';
  }
  
  switch (userSubscription?.toUpperCase()) {
    case 'ENTERPRISE':
      return 'ENTERPRISE';
    case 'PREMIUM':
      return 'PREMIUM';
    case 'BASIC':
      return 'BASIC';
    default:
      return 'UNPAID';
  }
}

export async function requireRole(requiredRole: 'admin' | 'super_admin' | 'paid_user' | string) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (requiredRole === 'admin' || requiredRole === 'super_admin') {
    if (!isAdmin(email)) {
      throw new Error(`Unauthorized: Role '${requiredRole}' requires Super Admin access (pranu21m@gmail.com).`);
    }
  } else if (requiredRole === 'paid_user') {
    if (!isAdmin(email)) {
      // For standard users, check paid status
      const role = getUserRole(email);
      if (role === 'UNPAID') {
        throw new Error("Unauthorized: Active paid subscription required.");
      }
    }
  }
  return true;
}
