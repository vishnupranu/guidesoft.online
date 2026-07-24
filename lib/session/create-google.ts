import 'server-only'

import type { Session } from './types'
import { upsertUser } from '@/lib/db/users'
import { encrypt } from '@/lib/crypto'

interface GoogleUser {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export async function createGoogleSession(accessToken: string, scope?: string): Promise<Session | undefined> {
  // Fetch Google user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
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

  // Create or update user in database
  const userId = await upsertUser({
    provider: 'google',
    externalId: googleUser.id,
    accessToken: encrypt(accessToken), // Encrypt before storing
    refreshToken: undefined, // Update later if requested via offline access
    scope: scope || undefined,
    role: 'free_user', // Give super_admin manually or via webhook if needed
    username: googleUser.email.split('@')[0], // Generate simple username from email
    email: googleUser.email,
    name: googleUser.name,
    avatarUrl: googleUser.picture,
  })

  // get user by id to get role
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
      id: user.id, // Internal user ID
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
