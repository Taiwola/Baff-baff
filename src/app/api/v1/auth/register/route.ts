'use server'
import { createUser, getUserByEmail } from '@services/user'
import dbConnect from '@lib/database'
import { generateToken } from '@utils/jwt'
import { sendResponse } from '@utils/response/api.response'
import { registerSchema } from '@utils/validation/auth'
import { NextResponse, NextRequest } from 'next/server'

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
    return sendResponse(false, 'Validation failed', validationErrors, 400)
  }

  const userExist = await getUserByEmail(json.email)
  if (userExist) {
    return sendResponse(false, 'User with this email already exists', null, 404)
  }

  try {
    const user = await createUser(json)
    const token = await generateToken({ id: user.id, email: user.email, role: user.role })
    return sendResponse(true, 'User registered successfully', { token }, 201)
  } catch (error) {
    return sendResponse(false, 'Error creating user', error, 500)
  }
}
