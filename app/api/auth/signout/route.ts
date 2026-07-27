import type { NextRequest } from 'next/server'
import { getSessionFromReq } from '@/lib/session/server'
import { isRelativeUrl } from '@/lib/utils/is-relative-url'
import { saveSession } from '@/lib/session/create'
import { getOAuthToken } from '@/lib/session/get-oauth-token'

export async function GET(req: NextRequest) {
  const session = await getSessionFromReq(req)
  if (session) {
    if (session.authProvider === 'github') {
      try {
        const tokenData = await getOAuthToken(session.user.id, 'github')
        const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID
        if (tokenData && clientId && process.env.GITHUB_CLIENT_SECRET) {
          await fetch(`https://api.github.com/applications/${clientId}/token`, {
            method: 'DELETE',
            headers: {
              Authorization: `Basic ${Buffer.from(`${clientId}:${process.env.GITHUB_CLIENT_SECRET}`).toString('base64')}`,
              Accept: 'application/vnd.github.v3+json',
            },
            body: JSON.stringify({ access_token: tokenData.accessToken }),
          })
        }
      } catch (error) {
        console.error('Failed to revoke GitHub token:', error)
      }
    } else if (session.authProvider === 'vercel') {
      try {
        const tokenData = await getOAuthToken(session.user.id, 'vercel')
        if (tokenData) {
          await fetch('https://vercel.com/api/login/oauth/token/revoke', {
            method: 'POST',
            body: new URLSearchParams({ token: tokenData.accessToken }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_VERCEL_CLIENT_ID}:${process.env.VERCEL_CLIENT_SECRET}`).toString('base64')}`,
            },
          })
        }
      } catch (error) {
        console.error('Failed to revoke Vercel token:', error)
      }
    } else if (session.authProvider === 'google') {
      try {
        const tokenData = await getOAuthToken(session.user.id, 'google')
        if (tokenData) {
          await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${tokenData.accessToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
        }
      } catch (error) {
        console.error('Failed to revoke Google token:', error)
      }
    }
  }

  const response = Response.json({
    url: isRelativeUrl(req.nextUrl.searchParams.get('next') ?? '/') ? req.nextUrl.searchParams.get('next') : '/',
  })

  await saveSession(response, undefined)
  return response
}
