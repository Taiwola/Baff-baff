'use server'
import { verifyToken } from '@utils/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function authMiddleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ message: 'Authentication token required' }, { status: 401 })
  }

  try {
    const decoded = await verifyToken(token)

    const headers = new Headers(req.headers)
    headers.set('x-id', decoded.id)
    headers.set('x-email', decoded.email)
    headers.set('x-role', decoded.role || 'user')

    return NextResponse.next({
      request: {
        headers: headers
      }
    })
  } catch (error: unknown) {
    console.error('Auth middleware error:', error)
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 })
  }
}

export async function getAuthUser(req: NextRequest) {
  const userId = req.headers.get('x-id')
  const userEmail = req.headers.get('x-email')
  const role = req.headers.get('x-role') as 'user' | 'admin' | null

  if (!userId || !userEmail) {
    return null
  }

  return {
    id: userId,
    email: userEmail,
    role: role
  }
}
