import { IUser } from '@models/user.model'

export interface TransformedUser {
  id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export function transformUser(user: IUser): TransformedUser {
  return {
    id: user._id?.toString() || user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    role: user.role || 'user',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

export function transformUsers(users: IUser[]): TransformedUser[] {
  return users.map(transformUser)
}
