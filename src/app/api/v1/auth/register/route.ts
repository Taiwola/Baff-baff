import { NextResponse, NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { generateToken } from '@utils/jwt'
import { createUser, getUserByEmail } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { registerSchema } from '@utils/validation/auth'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest): Promise<NextResponse> {
  const json: User = await req.json()
  const result = registerSchema.safeParse(json)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  const userExist = await getUserByEmail(json.email)
  if (userExist) {
    return errorResponse('User with this email already exists', null, 409)
  }

  try {
    const user = await createUser(result.data)
    const token = await generateToken({ id: user.id, email: user.email, role: user.role })
    return sendResponse('User registered successfully', { token }, 201)
  } catch (error) {
    return errorResponse('Error creating user', error, 500)
  }
}
