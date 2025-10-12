import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { decrypt } from '@lib/session'
import { getUserById, updateUser } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { resetPasswordSchema } from '@validations/auth/reset-password.validation'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function PATCH(req: NextRequest) {
  const body = await req.json()

  const result = resetPasswordSchema.safeParse(body)
  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  try {
    const verifiedUser = await decrypt(result.data.token)

    if (!verifiedUser) {
      return errorResponse('Could not verify user', null, 400)
    }

    const user = await getUserById(verifiedUser.id)

    if (!user) {
      return errorResponse('User does not exist', null, 404)
    }

    const update = await updateUser(user, { password: result.data.password })

    if (!update) {
      return errorResponse('Password could not be updated', null, 400)
    }

    return sendResponse('Password reset successfully', null, 200)
  } catch (error) {
    console.error('Error resetting password:', error)
    return errorResponse('Internal server error', null, 500)
  }
}
