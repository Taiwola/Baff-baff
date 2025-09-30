import 'server-only'

import { authUserSchema } from '@validations/auth'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@lib/session'

export async function authMiddleware(req: NextRequest) {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.id) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export async function getAuthUser(req: NextRequest) {
  const result = authUserSchema.safeParse({
    id: req.headers.get('x-id'),
    email: req.headers.get('x-email'),
    role: req.headers.get('x-role') || 'user'
  })

  if (!result.success) {
    return null
  }

  return result.data
}
