import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { generateToken } from '@utils/jwt'
import { LoginDto, loginSchema } from '@validations/auth'
import { errorResponse, sendResponse } from '@utils/api-response'
import { compareUserPassword, getUserByEmail } from '@services/user'
import { createSession } from '@lib/session'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  try {
    const json: LoginDto = await req.json()

    const result = loginSchema.safeParse(json)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 422)
    }

    const user = await getUserByEmail(json.email)

    if (!user) {
      return errorResponse('Invalid email or password', null, 400)
    }

    const isMatch = await compareUserPassword({
      email: json.email,
      password: json.password
    })

    if (!isMatch) {
      return errorResponse('Invalid email or password', null, 400)
    }

    const token = await generateToken({
      email: user.email,
      id: user.id,
      role: user.role
    })

    const response: LoginResponseType = {
      user: {
        id: user._id.toString() || user.id,
        fullName: user.firstName + ' ' + user.lastName,
        email: user.email,
        role: user.role
      },
      token
    }

    await createSession({ id: user.id, role: user.role })

    return sendResponse('User logged in successfully', response)
  } catch (error) {
    console.error('Login error:', error)
    return errorResponse('Error logging in user', process.env.NODE_ENV === 'development' ? error : null, 500)
  }
}
