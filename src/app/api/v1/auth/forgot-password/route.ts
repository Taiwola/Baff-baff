import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { sendEmail } from '@lib/mail'
import { encrypt } from '@lib/session'
import { getUserByEmail } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { generateResetPasswordEmail } from '@utils/mail-content'
import { forgotPasswordSchema } from '@validations/auth'

export async function POST(req: NextRequest) {
    await dbConnect()
  const body = await req.json()

  try {
    const result = forgotPasswordSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 422)
    }

    const user = await getUserByEmail(result.data.email)

    if (!user) {
      return errorResponse('User not found', null, 404)
    }

    const token = await encrypt({
      id: user.id,
      role: user.role,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    })
    const resetLink = `${process.env.CLIENT_BASE_URL}/reset-password?token=${token}`
    const content = generateResetPasswordEmail({ email: user.email, name: user.firstName }, resetLink)

    const { error, errorMessage } = await sendEmail(user.email, content, 'Reset Your Password', 'Baffa Baffa')
    if (error) {
      console.error('Failed to send reset email:', errorMessage)
      return errorResponse('Failed to send reset email. Please try again.', null, 500)
    }

    return sendResponse('Reset Link sent', null, 200)
  } catch (error) {
    console.error('Forgot password error:', error)
    return errorResponse('Error forgot password', process.env.NODE_ENV === 'development' ? error : null, 500)
  }
}
