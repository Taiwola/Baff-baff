import 'server-only'

import { cookies } from 'next/headers'

import { decrypt } from './session'

export const verifySession = async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.id) {
    return null
  }

  return { isAuth: true, userId: session.id, role: session.role }
}
