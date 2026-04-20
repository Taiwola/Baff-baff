import { baseConfig } from '@lib/auth-config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(baseConfig)
const protectedRoutes = ['/dashboard', '/profile', '/api/']

function isSessionExpired(session: { expires?: string | Date | null } | null) {
  if (!session?.expires) return true
  return new Date(session.expires) < new Date()
}

export default auth((request) => {
  const method = request.method
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const session = request.auth

  // Public route exceptions
  if (path === '/api/products' && method === 'GET') return NextResponse.next()
  if (path === '/api/measurements/user' && method === 'GET') return NextResponse.next()
  if (path === '/api/forget-password' && method === 'POST') return NextResponse.next()
  if (path === '/api/reset-password' && method === 'PATCH') return NextResponse.next()
  if (path === '/api/webhooks' && method === 'POST') return NextResponse.next()

  const isAuthenticated = session && !isSessionExpired(session)

  if (isProtectedRoute && !isAuthenticated) {
    // For API routes, return 401 instead of redirecting
    if (path.startsWith('/api/')) {
      const response = NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      if (session && isSessionExpired(session)) {
        response.cookies.delete('session')
      }
      return response
    }
    const response = NextResponse.redirect(new URL('/login', request.nextUrl))
    if (session && isSessionExpired(session)) {
      response.cookies.delete('session')
    }
    return response
  }

  if (path.startsWith('/dashboard') && session?.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
