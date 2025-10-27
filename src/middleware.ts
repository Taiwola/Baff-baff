import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/api/v1/']

import NextAuth from 'next-auth'
import { SESSION_TOKEN_NAME } from '@lib/constants'

const { auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  session: { strategy: 'jwt' },
  cookies: {
    sessionToken: {
      name: SESSION_TOKEN_NAME,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || ''
        session.user.role = token.role as UserRole
      }
      return session
    }
  }
  // basePath: '/api/v1/auth'
})

export default auth((request) => {
  const method = request.method
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const session = request.auth

  if (path === '/api/v1/products' && method === 'GET') {
    return NextResponse.next()
  }
  if (path === '/api/v1/measurements/user' && method === 'GET') {
    return NextResponse.next()
  }

  if (path === '/api/v1/forget-password' && method === 'POST') {
    return NextResponse.next()
  }

  if (path === '/api/v1/reset-password' && method === 'PATCH') {
    return NextResponse.next()
  }

  if (path === '/api/v1/webhooks' && method === 'POST') {
    return NextResponse.next()
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (path.includes('/dashboard') && session?.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  // matcher: ["/((?_next/static|_next/image|favicon.ico).*)"],
}
