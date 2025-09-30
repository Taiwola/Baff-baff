import dbConnect from '@lib/database'

import { verifySession } from '@lib/dal'
import { getAllUsers } from '@services/user'
import { adaptUsers } from '@adapters/user.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET() {
  const auth = await verifySession()

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const users = await getAllUsers()
  const transformedUsers = adaptUsers(users)
  return sendResponse('Users fetched successfully', transformedUsers, 200)
}
