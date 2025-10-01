import { deleteAddress, getOneAddressById, updateAddress } from '@services/address'
import { errorResponse, sendResponse } from '@utils/api-response'
import { adaptAddress } from '@adapters/address.adapter'
import { updateAddressSchema } from '@validations/address'
import { NextRequest } from 'next/server'
import dbConnect from '@lib/database'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(__req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id

  const address = await getOneAddressById(id)

  if (!address) {
    return errorResponse('Address not found', null, 404)
  }

  const transform = adaptAddress(address)
  return sendResponse('Request successfull', transform)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = await params.id
  const body = await req.json()

  const result = updateAddressSchema.safeParse(body)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return errorResponse('Validation failed', validationErrors, 400)
  }

  const address = await getOneAddressById(id)

  if (!address) {
    return errorResponse('Address not found', null, 404)
  }

  try {
    await updateAddress(address?.id as string, result.data)
    return sendResponse('Request successfull', null, 200)
  } catch (error) {
    console.log(error)
    return errorResponse('Internal server error', null)
  }
}

export async function DELETE(__req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = await params.id

    const remove = await deleteAddress(id)

    if (!remove) {
      return errorResponse('Request failed', null, 404)
    }

    return sendResponse('Request successfull', null, 200)
  } catch (error) {
    console.log(error)
    return errorResponse('Internal server error', null)
  }
}
