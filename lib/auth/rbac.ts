import { getSessionFromCookie } from '@/lib/session/server'
import { SESSION_COOKIE_NAME } from '@/lib/session/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type Role = 'free_user' | 'paid_user' | 'admin' | 'super_admin'

const roleHierarchy: Record<Role, number> = {
  free_user: 0,
  paid_user: 1,
  admin: 2,
  super_admin: 3,
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export async function requireRole(requiredRole: Role) {
  const cookieStore = await cookies()
  const session = await getSessionFromCookie(cookieStore.get(SESSION_COOKIE_NAME)?.value)
  if (!session) {
    redirect('/')
  }

  if (!hasPermission(session.user.role, requiredRole)) {
    redirect('/')
  }

  return session
}
