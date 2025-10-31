import 'server-only'

import { RegisterDto } from '@validations/auth'
import UserModel, { IUser } from '@models/user.model'
import { FilterQuery } from 'mongoose'

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const user = await UserModel.findOne({
    email
  })

  return user
}

export async function getOneUser(filter: FilterQuery<IUser>): Promise<IUser | null> {
  const user = await UserModel.findOne(filter)
  return user
}

export async function createUser(data: Omit<RegisterDto, 'confirmPassword'> & { googleProviderId?: string }): Promise<IUser> {
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

export async function getAllUsers({ limit, page = 1, ...filter }: FilterQuery<UserFilter> = {}): Promise<{users: IUser[], count: number}> {
  const query = UserModel.find(filter)

  if (limit) {
    const skip = (page - 1) * limit
    query.limit(limit).skip(skip)
  }

  const [users, count] = await Promise.all([
    query.exec(),
    UserModel.countDocuments(filter).exec()
  ])

  return {users, count}
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
