import 'server-only'

import { auth } from '@auth'

export const verifySession = async () => {
  const session = await auth()

  if (!session || !session.user.id) {
    return null
  }

  return { isAuth: true, userId: session.user.id, role: session.user.role, name: session.user.name, email: session.user.email }
}
