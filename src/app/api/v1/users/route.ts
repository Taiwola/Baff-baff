'use server'
import { getAllUsers } from '@action/user'
import { getAuthUser } from '@middleware/auth'
import { transformUsers } from '@utils/transform/user.transform'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authUser = await getAuthUser(req)

  if (authUser?.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const users = await getAllUsers()
  const transformedUsers = transformUsers(users)
  return NextResponse.json({ message: 'Request was successfull', data: transformedUsers }, { status: 200 })
}
