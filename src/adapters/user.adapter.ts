import { IUser } from '@models/user.model'

export function adaptUser(user: IUser): User {
  return {
    id: user._id?.toString() || user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    role: user.role || 'user',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  }
}

export function adaptUsers(users: IUser[]): User[] {
  return users.map(adaptUser)
}
