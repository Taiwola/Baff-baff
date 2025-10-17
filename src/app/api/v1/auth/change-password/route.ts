import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { changePasswordSchema } from '@validations/auth'
import { errorResponse, sendResponse } from '@utils/api-response'
import { compareUserPassword, getUserById, updateUser } from '@services/user'

export async function POST(req: NextRequest) {
  await dbConnect()
  const auth = await verifySession()

  if (!auth?.isAuth || !auth.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const body = await req.json()

  try {
    const result = changePasswordSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 422)
    }

    const user = await getUserById(auth.userId)

    if (!user) {
      return errorResponse('User not found', null, 404)
    }

    const isMatch = await compareUserPassword({
      email: user.email,
      password: result.data.oldPassword
    })

    if (!isMatch) {
      return errorResponse('Invalid password', null, 400)
    }

    const update = await updateUser(user, { password: result.data.password })

    if (!update) {
      return errorResponse('Password could not be changed', null, 400)
    }

    return sendResponse('Password reset successful', null, 200)
  } catch (error) {
    console.error('Forgot password error:', error)
    return errorResponse('Error forgot password', process.env.NODE_ENV === 'development' ? error : null, 500)
  }
}
