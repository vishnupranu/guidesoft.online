import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { generateState } from 'arctic'
import { isRelativeUrl } from '@/lib/utils/is-relative-url'
import { getSessionFromReq } from '@/lib/session/server'

export async function GET(req: NextRequest): Promise<Response> {
  // Check if user is already authenticated
  const session = await getSessionFromReq(req)

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const redirectUri = `${req.nextUrl.origin}/api/auth/google/callback`

  if (!clientId) {
    return Response.redirect(new URL('/?error=google_not_configured', req.url))
  }

  const state = generateState()
  const store = await cookies()
  let redirectTo = isRelativeUrl(req.nextUrl.searchParams.get('next') ?? '/')
    ? (req.nextUrl.searchParams.get('next') ?? '/')
    : '/'

  const isSignInFlow = !session?.user
  const authMode = isSignInFlow ? 'signin' : 'connect'

  // Add a query parameter to show a toast message after redirect
  if (!isSignInFlow) {
    const redirectUrl = new URL(redirectTo, req.nextUrl.origin)
    redirectUrl.searchParams.set('google_connected', 'true')
    redirectTo = redirectUrl.pathname + redirectUrl.search
  }

  // Store state and redirect URL
  const cookiesToSet: [string, string][] = [
    [`google_auth_redirect_to`, redirectTo],
    [`google_auth_state`, state],
    [`google_auth_mode`, authMode],
  ]

  // If connecting (user already signed in), store their user ID
  if (!isSignInFlow && session?.user?.id) {
    cookiesToSet.push([`google_oauth_user_id`, session.user.id])
  }

  for (const [key, value] of cookiesToSet) {
    store.set(key, value, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10, // 10 minutes
      sameSite: 'lax',
    })
  }

  // Build Google authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    access_type: 'offline', // Request refresh token
    prompt: 'consent', // Force consent screen to get refresh token
  })

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

  // Redirect directly to Google
  return Response.redirect(url)
}
