import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { decrypt } from '@lib/session'

const protectedRoutes = ['/dashboard', '/profile', '/api/v1/']
// const publicRoutes = ['/login', '/register', '/']

export async function middleware(request: NextRequest) {
  const method = request.method
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  if (path === '/api/v1/products' && method === 'GET') {
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

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.id) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (path.includes('/dashboard') && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // matcher: ['/api/v1/((?!auth/).*)']
}
