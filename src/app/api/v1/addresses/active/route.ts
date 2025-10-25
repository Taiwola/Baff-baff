import { verifySession } from '@lib/dal'
import { getAddressByFilter } from '@services/address'
import { adaptAddress } from '@adapters/address.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { cookies } from 'next/headers'
import { IAddress } from '@models/address.model'
import dbConnect from '@lib/database'

export async function GET() {
    await dbConnect()
  const session = await verifySession()
  const cookieStore = await cookies()
  const guestCartId = cookieStore.get('guestCartId')?.value

  let address: IAddress | null = null

  if (session?.userId) {
    address = await getAddressByFilter({ active: true, userId: session.userId })
  } else if (guestCartId) {
    address = await getAddressByFilter({ cartId: guestCartId })
  }

  if (!address) {
    return errorResponse('Address not found', null, 404)
  }

  const transform = adaptAddress(address)
  return sendResponse('Request successfull', transform)
}
