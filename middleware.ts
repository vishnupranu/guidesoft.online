import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromReq } from '@/lib/session/server'

const protectedPaths = [
  '/tasks',
  '/dashboard',
  '/agents',
  '/workflows',
  '/settings',
  '/api-keys',
  '/connectors',
  '/marketplace',
]

function isPublicPath(pathname: string): boolean {
  if (pathname === '/') return true
  if (pathname.startsWith('/api/auth')) return true
  if (pathname.startsWith('/api/webhooks')) return true
  if (pathname.startsWith('/api/health')) return true
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/favicon.ico')) return true
  if (pathname.startsWith('/public')) return true
  return false
}

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((path) => pathname === path || pathname.startsWith(path + '/'))
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next()
  }

  const session = await getSessionFromReq(req)

  if (!session) {
    const loginUrl = new URL('/auth/signin', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/tasks/:path*',
    '/dashboard/:path*',
    '/agents/:path*',
    '/workflows/:path*',
    '/settings/:path*',
    '/api-keys/:path*',
    '/connectors/:path*',
    '/marketplace/:path*',
    '/((?!api/auth|api/webhooks|api/health|_next/static|_next/image|favicon.ico).*)',
  ],
}