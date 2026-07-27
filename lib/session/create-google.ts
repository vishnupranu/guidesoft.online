import 'server-only'

import type { Session } from './types'
import { upsertUser } from '@/lib/db/users'
import { encrypt } from '@/lib/crypto'

interface GoogleUser {
  sub: string
  email: string
  email_verified: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export async function createGoogleSession(accessToken: string, scope?: string): Promise<Session | undefined> {
  const userResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  })

  if (!userResponse.ok) {
    console.error('Failed to fetch Google user')
    return undefined
  }

  const googleUser = (await userResponse.json()) as GoogleUser

  const userId = await upsertUser({
    provider: 'google',
    externalId: googleUser.sub,
    accessToken: encrypt(accessToken),
    refreshToken: undefined,
    scope: scope || undefined,
    role: 'free_user',
    username: googleUser.email.split('@')[0],
    email: googleUser.email,
    name: googleUser.name || googleUser.given_name || googleUser.email.split('@')[0],
    avatarUrl: googleUser.picture || '',
  })

  const { getUserById } = await import('@/lib/db/users')
  const user = await getUserById(userId)

  if (!user) {
    console.error('Failed to get user after upsert')
    return undefined
  }

  const session: Session = {
    created: Date.now(),
    authProvider: 'google',
    user: {
      id: user.id,
      username: user.username,
      email: user.email || undefined,
      name: user.name || undefined,
      avatar: user.avatarUrl || '',
      role: user.role as 'free_user' | 'paid_user' | 'admin' | 'super_admin',
    },
  }

  console.log('Created Google session with internal user ID:', session.user.id)
  return session
}
