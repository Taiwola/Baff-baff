import { getAuthUser } from '@middleware/auth'
import { createAddress, getAllAddresss } from '@services/address'
import { errorResponse, sendResponse } from '@utils/response/api.response'
import { transformAddress, transformAddresses } from '@utils/transform/address.transform'
import { CreateaddressSchema } from '@utils/validation/address'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req)

  const address = await getAllAddresss({ userId: user?.id })

  const transform = transformAddresses(address)

  return sendResponse('Request successfull', transform)
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const result = CreateaddressSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  try {
    const address = await createAddress(result.data)
    const transform = transformAddress(address)
    return sendResponse('Request successfull', transform, 201)
  } catch (error) {
    console.log(error)
    return errorResponse('Internal server error', null)
  }
}
