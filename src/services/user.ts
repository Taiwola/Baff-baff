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

export async function updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
  return UserModel.findByIdAndUpdate(id, updateData, { new: true })
}

export async function getUserById(id: string): Promise<IUser | null> {
  return await UserModel.findById(id)
}

export async function getAllUsers(): Promise<IUser[]> {
  return UserModel.find()
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
