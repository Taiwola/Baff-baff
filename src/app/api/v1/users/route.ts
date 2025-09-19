'use server'
import { getAllUsers } from '@services/user'
import { getAuthUser } from '@middleware/auth'
import { transformUsers } from '@utils/transform/user.transform'
import { NextRequest } from 'next/server'
import { errorResponse, sendResponse } from '@utils/response/api.response'

export async function GET(req: NextRequest) {
  const authUser = await getAuthUser(req)

  if (authUser?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const users = await getAllUsers()
  const transformedUsers = transformUsers(users)
  return sendResponse('Users fetched successfully', transformedUsers, 200)
}
