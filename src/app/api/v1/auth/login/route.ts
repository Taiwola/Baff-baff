import { NextRequest } from 'next/server'
import { generateToken } from '@utils/jwt'
import { loginSchema } from '@utils/validation/auth'
import { compareUserPassword, getUserByEmail } from '@services/user'
import dbConnect from '@lib/database'
import { sendResponse } from '@utils/response/api.response'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  try {
    const json: UserLogin = await req.json()

    const result = loginSchema.safeParse(json)
    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return sendResponse(false, 'Validation failed', validationErrors, 400)
    }

    const user = await getUserByEmail(json.email)
    if (!user) {
      return sendResponse(false, 'Invalid email or password', null, 401)
    }

    const isMatch = await compareUserPassword({
      email: json.email,
      password: json.password
    })

    if (!isMatch) {
      return sendResponse(false, 'Invalid email or password', null, 401)
    }

    const token = await generateToken({
      email: user.email,
      id: user.id,
      role: user.role
    })

    return sendResponse(
      true,
      'User logged in successfully',
      {
        id: user._id || user.id,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        token
      },
      200
    )
  } catch (error) {
    console.error('Login error:', error)
    return sendResponse(false, 'Error logging in user', process.env.NODE_ENV === 'development' ? error : null, 500)
  }
}
