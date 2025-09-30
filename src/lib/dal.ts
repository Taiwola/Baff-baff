import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'

import { decrypt } from './session'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.id) {
    return null
  }

  return { isAuth: true, userId: session.id, role: session.role }
})
