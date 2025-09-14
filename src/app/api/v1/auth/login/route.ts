import { NextResponse, NextRequest } from 'next/server'
import { generateToken } from '@utils/jwt'
import { validateUserLogin } from '@utils/validation/auth-validation'
import { compareUserPassword, getUserByEmail } from '@actions/user'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function POST(req: NextRequest) {
  try {
    const json: UserLogin = await req.json()

    const { error } = validateUserLogin(json)
    if (error) {
      const validationErrors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return NextResponse.json({ errors: validationErrors }, { status: 400 })
    }

    const user = await getUserByEmail(json.email)
    if (!user) {
      return NextResponse.json(
        {
          message: 'Invalid email or password'
        },
        { status: 401 }
      )
    }

    const isMatch = await compareUserPassword({
      email: json.email,
      password: json.password
    })

    if (!isMatch) {
      return NextResponse.json(
        {
          message: 'Invalid email or password'
        },
        { status: 401 }
      )
    }

    const token = await generateToken({
      email: user.email,
      id: user.id,
      role: user.role
    })
    return NextResponse.json(
      {
        message: 'User logged in successfully',
        user: {
          id: user._id || user.id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email
        },
        token
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        message: 'Error logging in user',
        error: process.env.NODE_ENV === 'development' ? error : null
      },
      { status: 500 }
    )
  }
}
