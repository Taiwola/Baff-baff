import { verifySession } from '@lib/dal'
import { getAddressByFilter } from '@services/address'
import { adaptAddress } from '@adapters/address.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'

export async function GET() {
  const session = await verifySession()

  if (!session?.userId) {
    return errorResponse('UnAuthenticated', null, 401)
  }

  const address = await getAddressByFilter({ active: true, userId: session.userId })

  if (!address) {
    return errorResponse('Address not found', null, 404)
  }

  const transform = adaptAddress(address)
  return sendResponse('Request successfull', transform)
}
