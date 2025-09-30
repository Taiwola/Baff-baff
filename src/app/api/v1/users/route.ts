import dbConnect from '@lib/database'

import { getAllUsers } from '@services/user'
import { adaptUsers } from '@adapters/user.adapter'
import { sendResponse } from '@utils/api-response'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET() {
  // const authUser = await getAuthUser(req)

  // if (authUser?.role !== 'admin') {
  //   return errorResponse('Forbidden', null, 403)
  // }

  const users = await getAllUsers()
  const transformedUsers = adaptUsers(users)
  return sendResponse('Users fetched successfully', transformedUsers, 200)
}
