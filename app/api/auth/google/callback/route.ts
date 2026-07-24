import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db/client'
import { users, accounts, tasks, connectors, keys } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { createGoogleSession } from '@/lib/session/create-google'
import { saveSession } from '@/lib/session/create-github' // Reusing saveSession logic
import { encrypt } from '@/lib/crypto'

export async function GET(req: NextRequest): Promise<Response> {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const cookieStore = await cookies()

  // Check if this is a sign-in flow or connect flow
  const authMode = cookieStore.get(`google_auth_mode`)?.value ?? null
  const isSignInFlow = authMode === 'signin'
  const isConnectFlow = authMode === 'connect'

  const storedState = cookieStore.get(`google_auth_state`)?.value ?? null
  const storedRedirectTo = cookieStore.get(`google_auth_redirect_to`)?.value ?? null
  const storedUserId = cookieStore.get(`google_oauth_user_id`)?.value ?? null // Required for connect flow

  if (isSignInFlow) {
    if (code === null || state === null || storedState !== state || storedRedirectTo === null) {
      return new Response('Invalid OAuth state', { status: 400 })
    }
  } else {
    if (code === null || state === null || storedState !== state || storedRedirectTo === null || storedUserId === null) {
      return new Response('Invalid OAuth state', { status: 400 })
    }
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = `${req.nextUrl.origin}/api/auth/google/callback`

  if (!clientId || !clientSecret) {
    return new Response('Google OAuth not configured', { status: 500 })
  }

  try {
    console.log('[Google Callback] Starting OAuth flow, mode:', authMode)

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      console.error('[Google Callback] Token exchange failed with status:', tokenResponse.status)
      return new Response('Failed to exchange code for token', { status: 400 })
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string
      scope: string
      token_type: string
      id_token: string
      error?: string
      error_description?: string
    }

    if (!tokenData.access_token) {
      console.error('[Google Callback] Failed to get Google access token:', tokenData)
      return new Response(
        `Failed to authenticate with Google: ${tokenData.error_description || tokenData.error || 'Unknown error'}`,
        { status: 400 },
      )
    }

    // Note: We use the access token to fetch user info in createGoogleSession()
    // We don't fetch it here if it's the sign-in flow. But for connect flow we need it to know who to connect.

    if (isSignInFlow) {
      console.log('[Google Callback] Sign-in flow - creating Google session')
      const session = await createGoogleSession(tokenData.access_token, tokenData.scope)

      if (!session) {
        console.error('[Google Callback] Failed to create Google session')
        return new Response('Failed to create session', { status: 500 })
      }

      console.log('[Google Callback] Google session created for user:', session.user.id)

      const response = new Response(null, {
        status: 302,
        headers: {
          Location: storedRedirectTo,
        },
      })

      await saveSession(response, session)

      cookieStore.delete(`google_auth_state`)
      cookieStore.delete(`google_auth_redirect_to`)
      cookieStore.delete(`google_auth_mode`)

      return response
    } else {
      // CONNECT FLOW
      // Fetch user to get Google ID
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/json',
        },
      })
      
      const googleUser = (await userResponse.json()) as { id: string, email: string }
      const encryptedToken = encrypt(tokenData.access_token)

      // (We skip merging for accounts table since accounts currently only supports GitHub, but you could expand it in schema.ts)
      // Since accounts table only has enum 'github', we can't save 'google' to accounts unless we change the enum in schema.ts
      // But we did change it! Let's insert into accounts.

      const existingAccount = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.provider, 'google'), eq(accounts.externalUserId, googleUser.id)))
        .limit(1)

      if (existingAccount.length > 0) {
        // Just update token (skipping merge logic for brevity here)
        await db
          .update(accounts)
          .set({
            accessToken: encryptedToken,
            scope: tokenData.scope,
            username: googleUser.email.split('@')[0],
            updatedAt: new Date(),
          })
          .where(eq(accounts.id, existingAccount[0].id))
      } else {
        await db.insert(accounts).values({
          id: nanoid(),
          userId: storedUserId!,
          provider: 'google',
          externalUserId: googleUser.id,
          accessToken: encryptedToken,
          scope: tokenData.scope,
          username: googleUser.email.split('@')[0],
        })
      }

      cookieStore.delete(`google_auth_state`)
      cookieStore.delete(`google_auth_redirect_to`)
      cookieStore.delete(`google_auth_mode`)
      cookieStore.delete(`google_oauth_user_id`)

      return Response.redirect(new URL(storedRedirectTo, req.nextUrl.origin))
    }
  } catch (error) {
    console.error('[Google Callback] OAuth callback error:', error)
    return new Response('Failed to complete Google authentication', { status: 500 })
  }
}
