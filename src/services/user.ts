import 'server-only'

import { RegisterDto } from '@validations/auth'
import UserModel, { IUser } from '@models/user.model'

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const user = await UserModel.findOne({
    email
  })

  return user
}

export async function createUser(data: RegisterDto): Promise<IUser> {
  const newUser = new UserModel({
    ...data
  })

  await newUser.save()
  return newUser
}

export async function updateUser(user: IUser, updateData: Partial<IUser>): Promise<IUser | null> {
  Object.assign(user, updateData)

  const updatedUser = await user.save()

  return updatedUser
}

export async function getUserById(id: string): Promise<IUser | null> {
  return await UserModel.findById(id)
}

export async function getAllUsers({ limit }: { limit: number }): Promise<IUser[]> {
  return UserModel.find().limit(limit)
}

export async function deleteUser(id: string): Promise<{ deletedCount?: number }> {
  return UserModel.deleteOne({ id })
}

export async function compareUserPassword({ email, password }: { email: string; password: string }): Promise<boolean> {
  const user = await getUserByEmail(email)
  if (!user) {
    return false
  }
  return user.comparePassword(password)
}
