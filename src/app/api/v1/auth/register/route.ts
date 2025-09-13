'use server'
import { createUser, getUserByEmail } from '@action/user'
import dbConnect from '@lib/database'
import { generateToken } from '@utils/jwt'
import { validateUserRegistration } from '@utils/validation/auth-validation'
import { NextResponse, NextRequest } from 'next/server'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest): Promise<NextResponse> {
  const json: User = await req.json()
  const { error } = validateUserRegistration(json)
  if (error) {
    const validationErrors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return NextResponse.json({ errors: validationErrors }, { status: 400 })
  }

  const userExist = await getUserByEmail(json.email)
  if (userExist) {
    return NextResponse.json({ message: 'User with this email already exists' }, { status: 404 })
  }

  try {
    const user = await createUser(json)
    const token = await generateToken({ id: user.id, email: user.email, role: user.role })
    return NextResponse.json({ message: 'User registered successfully', token }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error }, { status: 500 })
  }
}
