import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db/client'
import { users, accounts, tasks, connectors, keys } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { createGitHubSession, saveSession } from '@/lib/session/create-github'
import { encrypt } from '@/lib/crypto'

export async function GET(req: NextRequest): Promise<Response> {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const cookieStore = await cookies()

  const authMode = cookieStore.get(`github_auth_mode`)?.value ?? null
  const storedState =
    cookieStore.get(`github_auth_state`)?.value ??
    cookieStore.get(`github_oauth_state`)?.value ??
    null

  const storedRedirectTo =
    cookieStore.get(`github_auth_redirect_to`)?.value ??
    cookieStore.get(`github_oauth_redirect_to`)?.value ??
    '/'

  const storedUserId = cookieStore.get(`github_oauth_user_id`)?.value ?? null

  const isSignInFlow = authMode === 'signin' || !storedUserId

  // Validate state and code
  if (!code || !state || !storedState || storedState !== state) {
    console.error('[GitHub Callback] State mismatch or missing code', { code: !!code, state: !!state, storedState: !!storedState })
    return Response.redirect(new URL('/?error=github_auth_failed', req.url))
  }

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return Response.redirect(new URL('/?error=github_not_configured', req.url))
  }

  try {
    console.log('[GitHub Callback] Exchanging code for token...')

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      console.error('[GitHub Callback] Token exchange failed with status:', tokenResponse.status)
      return Response.redirect(new URL('/?error=github_token_exchange_failed', req.url))
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string
      scope: string
      token_type: string
      error?: string
      error_description?: string
    }

    if (!tokenData.access_token) {
      console.error('[GitHub Callback] Failed to get GitHub access token:', tokenData)
      return Response.redirect(new URL('/?error=github_token_missing', req.url))
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    const githubUser = (await userResponse.json()) as {
      login: string
      id: number
    }

    if (isSignInFlow) {
      console.log('[GitHub Callback] Sign-in flow - creating GitHub session for:', githubUser.login)
      const session = await createGitHubSession(tokenData.access_token, tokenData.scope)

      if (!session) {
        console.error('[GitHub Callback] Failed to create GitHub session')
        return Response.redirect(new URL('/?error=session_creation_failed', req.url))
      }

      const response = new Response(null, {
        status: 302,
        headers: {
          Location: storedRedirectTo,
        },
      })

      await saveSession(response, session)

      cookieStore.delete(`github_auth_state`)
      cookieStore.delete(`github_auth_redirect_to`)
      cookieStore.delete(`github_auth_mode`)
      cookieStore.delete(`github_oauth_state`)
      cookieStore.delete(`github_oauth_redirect_to`)

      return response
    } else {
      const encryptedToken = encrypt(tokenData.access_token)

      const existingAccount = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.provider, 'github'), eq(accounts.externalUserId, `${githubUser.id}`)))
        .limit(1)

      if (existingAccount.length > 0) {
        const connectedUserId = existingAccount[0].userId

        if (connectedUserId !== storedUserId) {
          await db.update(tasks).set({ userId: storedUserId! }).where(eq(tasks.userId, connectedUserId))
          await db.update(connectors).set({ userId: storedUserId! }).where(eq(connectors.userId, connectedUserId))
          await db.update(accounts).set({ userId: storedUserId! }).where(eq(accounts.userId, connectedUserId))
          await db.update(keys).set({ userId: storedUserId! }).where(eq(keys.userId, connectedUserId))
          await db.delete(users).where(eq(users.id, connectedUserId))

          await db
            .update(accounts)
            .set({
              userId: storedUserId!,
              accessToken: encryptedToken,
              scope: tokenData.scope,
              username: githubUser.login,
              updatedAt: new Date(),
            })
            .where(eq(accounts.id, existingAccount[0].id))
        } else {
          await db
            .update(accounts)
            .set({
              accessToken: encryptedToken,
              scope: tokenData.scope,
              username: githubUser.login,
              updatedAt: new Date(),
            })
            .where(eq(accounts.id, existingAccount[0].id))
        }
      } else {
        await db.insert(accounts).values({
          id: nanoid(),
          userId: storedUserId!,
          provider: 'github',
          externalUserId: `${githubUser.id}`,
          accessToken: encryptedToken,
          scope: tokenData.scope,
          username: githubUser.login,
        })
      }

      cookieStore.delete(`github_auth_state`)
      cookieStore.delete(`github_auth_redirect_to`)
      cookieStore.delete(`github_auth_mode`)
      cookieStore.delete(`github_oauth_state`)
      cookieStore.delete(`github_oauth_redirect_to`)
      cookieStore.delete(`github_oauth_user_id`)

      return Response.redirect(new URL(storedRedirectTo, req.nextUrl.origin))
    }
  } catch (error) {
    console.error('[GitHub Callback] OAuth callback error:', error)
    return Response.redirect(new URL('/?error=github_callback_exception', req.url))
  }
}
