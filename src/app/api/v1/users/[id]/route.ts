import { NextRequest } from 'next/server'

import dbConnect from '@lib/database'
import { IUser } from '@models/user.model'
import { adaptUser } from '@adapters/user.adapter'
import { deleteUser, getUserById, updateUser } from '@services/user'
import { errorResponse, sendResponse } from '@utils/api-response'
import { updateUserSchema } from '@validations/users/update-user.validation'
import { verifySession } from '@lib/dal'

async function loadDb() {
  await dbConnect()
}

loadDb()

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const user = await getUserById(id)

    if (!user) {
      return errorResponse('User not found', null, 404)
    }
    const transformedUser = adaptUser(user)
    return sendResponse('User fetched successfully', transformedUser, 200)
  } catch (error) {
    console.log('GET /users/id error', error)
    return errorResponse('Internal server error', null, 500)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUserById(id)
  if (!user) {
    return errorResponse('User not found', null, 404)
  }

  const json: Partial<IUser> = await req.json()

  const result = updateUserSchema.safeParse(json)

  if (!result.success) {
    const validationErrors = result.error.issues.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))

    return errorResponse('Validation failed', validationErrors, 400)
  }

  try {
    const updatedUser = await updateUser(user, result.data)
    if (!updatedUser) {
      return errorResponse('User not found after update', null, 404)
    }
    const transformedUser = adaptUser(updatedUser)
    return sendResponse('User updated successfully', transformedUser, 200)
  } catch (error) {
    console.error('Error updating user:', error)
    return errorResponse('Error updating user', null, 500)
  }
}

export async function DELETE(__req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await verifySession()
  const user = await getUserById(id)
  if (!user) {
    return errorResponse('User not found', null, 404)
  }

  if (user.id !== session?.userId && session?.role === 'admin') {
    return errorResponse('Forbidden', null, 403)
  }
  try {
    await deleteUser(user.id)
    return sendResponse('User deleted successfully', null, 200)
  } catch (error) {
    console.error('Error deleting user:', error)
    return errorResponse('Error deleting user', null, 500)
  }
}
