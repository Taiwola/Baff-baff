import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from './middleware/auth'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/v1/')) {
    return authMiddleware(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/v1/((?!auth/).*)']
}
