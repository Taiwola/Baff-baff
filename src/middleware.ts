import { baseConfig } from '@lib/auth-config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'


const { auth } = NextAuth(baseConfig)
const protectedRoutes = ['/dashboard', '/profile', '/api/v1/']

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
