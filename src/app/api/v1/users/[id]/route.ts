import { deleteUser, getUserById, updateUser } from '@services/user'
import { IUser } from '@models/user.model'
import { transformUser } from '@utils/transform/user.transform'
import { validateUpdateUser } from '@utils/validation/users-validation'
import { NextRequest } from 'next/server'
import { sendResponse } from '@utils/response/api.response'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return sendResponse(false, 'User not found', null, 404)
  }
  const transformedUser = transformUser(user)
  return sendResponse(true, 'User fetched successfully', transformedUser, 200)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return sendResponse(false, 'User not found', null, 404)
  }

  const json: Partial<IUser> = await req.json()
  const { error } = validateUpdateUser(json)
  if (error) {
    const validationErrors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return sendResponse(false, 'Validation failed', validationErrors, 400)
  }
  try {
    const updatedUser = await updateUser(user.id, json)
    if (!updatedUser) {
      return sendResponse(false, 'User not found after update', null, 404)
    }
    const transformedUser = transformUser(updatedUser)
    return sendResponse(true, 'User updated successfully', transformedUser, 200)
  } catch (error) {
    console.error('Error updating user:', error)
    return sendResponse(false, 'Error updating user', null, 500)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return sendResponse(false, 'User not found', null, 404)
  }
  try {
    await deleteUser(user.id)
    return sendResponse(true, 'User deleted successfully', null, 200)
  } catch (error) {
    console.error('Error deleting user:', error)
    return sendResponse(false, 'Error deleting user', null, 500)
  }
}
