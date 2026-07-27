import { getServerSession } from '@/lib/session/get-server-session'
import { UnauthorizedError } from '@/lib/errors'

export async function authGuard() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    throw new UnauthorizedError('Authentication required')
  }

  return session
}

export async function authGuardWithRole(requiredRole: 'admin' | 'super_admin' | 'paid_user' | string) {
  const session = await authGuard()

  const { getUserRole } = await import('@/lib/auth/rbac')
  const email = session.user?.email
  const role = getUserRole(email)

  if (requiredRole === 'admin' || requiredRole === 'super_admin') {
    if (role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
      throw new UnauthorizedError(`Role '${requiredRole}' is required`)
    }
  } else if (requiredRole === 'paid_user') {
    if (role === 'UNPAID') {
      throw new UnauthorizedError('Active paid subscription required')
    }
  }

  return session
}