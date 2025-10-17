import dbConnect from '@lib/database'

import { verifySession } from '@lib/dal'
import { getAllUsers } from '@services/user'
import { adaptUsers } from '@adapters/user.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { NextRequest } from 'next/server'
import { userQueryFilter } from '@validations/users/query-filter.validation'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(req: NextRequest) {
  const auth = await verifySession()
  const { searchParams } = new URL(req.url)

  if (auth?.role !== 'admin') {
    return errorResponse('Forbidden', null, 403)
  }

  const parsed = userQueryFilter.safeParse({
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    role: searchParams.get('role')
  })
  
  const queries = parsed.data 

  const page = queries?.page || 1
  const pageSize = queries?.limit || 10
  

  const users = await getAllUsers(queries)
  const transformedUsers = adaptUsers({ data: users, page, pageSize })

  return sendResponse('Users fetched successfully', transformedUsers, 200)
}
