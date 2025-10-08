import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { verifySession } from '@lib/dal'
import { errorResponse, sendResponse } from '@utils/api-response'
import { createAddress, getAllAddresss } from '@services/address'
import { adaptAddress, adaptAddresses } from '@adapters/address.adapter'
import { addressQueryFilter, createAddressSchema } from '@validations/address'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const session = await verifySession()
  const { searchParams } = new URL(req.url)

  const parsed = addressQueryFilter.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit')
  })

  const queries = parsed.data

  const filters: AddressFilter = {}

  if (session !== null) {
    filters.userId = session.userId
  }

  if (queries?.limit) {
    filters.limit = queries.limit || 10
  }

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10

  const address = await getAllAddresss(filters)

  const transform = adaptAddresses({ data: address, page, pageSize })

  return sendResponse('Request successfull', transform)
}

export async function POST(req: NextRequest) {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const body = await req.json()

  const result = createAddressSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  try {
    const address = await createAddress({ ...result.data, userId: session.userId })
    const transform = adaptAddress(address)
    return sendResponse('Request successfull', transform, 201)
  } catch (error) {
    console.log(error)
    return errorResponse('Internal server error', null)
  }
}
