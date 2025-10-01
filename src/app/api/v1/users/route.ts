import dbConnect from '@lib/database'

import { verifySession } from '@lib/dal'
import { getAllUsers } from '@services/user'
import { adaptUsers } from '@adapters/user.adapter'
import { errorResponse, sendResponse } from '@utils/api-response'
import { NextRequest } from 'next/server'
import { paginate } from '@utils/pagination'

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

  const users = await getAllUsers()
  const transformedUsers = adaptUsers(users)

  const pageQuery = searchParams.get('page') || ''
  const limitQuery = searchParams.get('limit') || ''

  const page = parseInt(pageQuery) || 1
  const pageSize = parseInt(limitQuery) || 10

  const pagination = paginate({ data: transformedUsers, page, pageSize })

  return sendResponse('Users fetched successfully', pagination, 200)
}
