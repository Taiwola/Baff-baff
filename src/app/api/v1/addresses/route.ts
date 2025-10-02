import { createAddress, getAllAddresss } from '@services/address'
import { getUserById } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptAddress, adaptAddresses } from '@adapters/address.adapter'
import { CreateaddressSchema } from '@validations/address'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)
  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const address = await getAllAddresss(pageSize, { userId: session?.userId })

  const transform = adaptAddresses({ data: address, page, pageSize })

  return sendResponse('Request successfull', transform)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()

  const body = await req.json()

  const result = CreateaddressSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const findUser = await getUserById(session?.userId as string)

  if (!findUser) {
    return errorResponse('User does not exist', null, 404)
  }

  try {
    result.data.userId = findUser?.id
    const address = await createAddress(result.data)
    const transform = adaptAddress(address)
    return sendResponse('Request successfull', transform, 201)
  } catch (error) {
    console.log(error)
    return errorResponse('Internal server error', null)
  }
}
