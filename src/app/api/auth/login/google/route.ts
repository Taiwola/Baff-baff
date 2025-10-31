
import { mergeCart } from '@lib/cart'
import dbConnect from '@lib/database'
import { createUser, getOneUser } from '@services/user'
import { sendResponse } from '@utils/api-response'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  await dbConnect()

  const { email, firstName, lastName, providerId } = await req.json()

  let user = await getOneUser({ email })

  if (user) {
    user.googleProviderId = providerId
    await user.save()
  }

  if (!user) {
    user = await getOneUser({ googleProviderId: providerId })
    if (user) {
      user.email = email
      await user.save()
    }
  }

  if (!user) {
    user = await createUser({
      firstName,
      lastName,
      email,
      password: '',
      role: 'user',
      termsAndCondition: false,
      googleProviderId: providerId
    })
  }

  await mergeCart(user)

  const response: LoginResponseType = {
    id: user._id.toString() || user.id,
    name: user.firstName + ' ' + user.lastName,
    email: user.email,
    role: user.role
  }

  return sendResponse('User logged in successfully', response)
}
