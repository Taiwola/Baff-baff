import { deleteUser, getUserById, updateUser } from '@action/user'
import { IUser } from '@models/user.model'
import { transformUser } from '@utils/transform/user.transform'
import { validateUpdateUser } from '@utils/validation/users-validation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }
  const transformedUser = transformUser(user)
  return NextResponse.json({ message: 'Request was successful', data: transformedUser }, { status: 200 })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const json: Partial<IUser> = await req.json()
  const { error } = validateUpdateUser(json)
  if (error) {
    const validationErrors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message
    }))
    return NextResponse.json({ errors: validationErrors }, { status: 400 })
  }
  try {
    const updatedUser = await updateUser(user.id, json)
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found after update' }, { status: 404 })
    }
    const transformedUser = transformUser(updatedUser)
    return NextResponse.json({ message: 'User updated successfully', data: transformedUser }, { status: 200 })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getUserById(params.id)
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }
  try {
    await deleteUser(user.id)
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 })
  }
}
