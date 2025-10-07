import { sendEmail } from '@lib/mail'
import { createUser, getUserByEmail, updateUser } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { generateAdminInvite } from '@utils/mail-content'
import { createInviteSchema } from '@validations/invite/create-invite.validation'
import { randomBytes } from 'crypto'
import { NextRequest } from 'next/server'

const generateSecurePassword = () => randomBytes(8).toString('hex')

export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const result = createInviteSchema.safeParse(body)

    if (!result.success) {
      const validationErrors = result.error.issues.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))

      return errorResponse('Validation failed', validationErrors, 422)
    }

    const userExist = await getUserByEmail(result.data.email)
    let password: string | undefined

    if (userExist) {
      await updateUser(userExist, { role: 'admin' })
    } else {
      password = generateSecurePassword()
      await createUser({
        firstName: 'User',
        lastName: 'Admin',
        email: result.data.email,
        role: 'admin',
        password: password,
        termsAndCondition: true,
        confirmPassword: password
      })
    }

    const link = `${process.env.CLIENT_BASE_URL}/admin/login`
    const content = generateAdminInvite({ email: result.data.email }, link)

    const { error, errorMessage } = await sendEmail(result.data.email, content, 'Invitation', 'Baffa Baffa')
    if (error) {
      console.error('Failed to send invitation email:', errorMessage)
      return errorResponse('Failed to send invitation email. Please try again.', null, 500)
    }

    return sendResponse('Invitation Link sent', null, 200)
  } catch (error) {
    console.error(error)
    return errorResponse('Error sending invite', process.env.NODE_ENV === 'development' ? error : null, 500)
  }
}
