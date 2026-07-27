import 'server-only'

import { db } from '@/lib/db/client'
import { users, accounts } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { decrypt } from '@/lib/crypto'

type OAuthProvider = 'github' | 'vercel' | 'google'

/**
 * Get the OAuth access token for a user from the database
 * Returns the decrypted token or null if not found
 *
 * For GitHub: Checks accounts table first (connected account), then users table (primary account)
 * For Vercel: Gets from users table (primary account only)
 * For Google: Gets from users table (primary account only)
 */
export async function getOAuthToken(
  userId: string,
  provider: OAuthProvider,
): Promise<{ accessToken: string; refreshToken: string | null; expiresAt: Date | null } | null> {
  try {
    if (provider === 'github') {
      const account = await db
        .select({
          accessToken: accounts.accessToken,
          refreshToken: accounts.refreshToken,
          expiresAt: accounts.expiresAt,
        })
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'github')))
        .limit(1)

      if (account[0]?.accessToken) {
        return {
          accessToken: decrypt(account[0].accessToken),
          refreshToken: account[0].refreshToken ? decrypt(account[0].refreshToken) : null,
          expiresAt: account[0].expiresAt,
        }
      }

      const user = await db
        .select({
          accessToken: users.accessToken,
          refreshToken: users.refreshToken,
        })
        .from(users)
        .where(and(eq(users.id, userId), eq(users.provider, 'github')))
        .limit(1)

      if (user[0]?.accessToken) {
        return {
          accessToken: decrypt(user[0].accessToken),
          refreshToken: user[0].refreshToken ? decrypt(user[0].refreshToken) : null,
          expiresAt: null,
        }
      }
    } else if (provider === 'vercel') {
      const user = await db
        .select({
          accessToken: users.accessToken,
          refreshToken: users.refreshToken,
        })
        .from(users)
        .where(and(eq(users.id, userId), eq(users.provider, 'vercel')))
        .limit(1)

      if (user[0]?.accessToken) {
        return {
          accessToken: decrypt(user[0].accessToken),
          refreshToken: user[0].refreshToken ? decrypt(user[0].refreshToken) : null,
          expiresAt: null,
        }
      }
    } else if (provider === 'google') {
      const user = await db
        .select({
          accessToken: users.accessToken,
          refreshToken: users.refreshToken,
        })
        .from(users)
        .where(and(eq(users.id, userId), eq(users.provider, 'google')))
        .limit(1)

      if (user[0]?.accessToken) {
        return {
          accessToken: decrypt(user[0].accessToken),
          refreshToken: user[0].refreshToken ? decrypt(user[0].refreshToken) : null,
          expiresAt: null,
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching OAuth token:', error)
    return null
  }
}
