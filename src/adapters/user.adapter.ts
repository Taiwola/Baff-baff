import { IUser } from '@models/user.model'
import { paginate } from '@utils/pagination'

export function adaptUser(user: IUser): User {
  return {
    id: user._id?.toString() || user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role || 'user',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  }
}

export function adaptUsers({ users, page, pageSize }: { users: IUser[]; page: number; pageSize: number }): Pagination<User> {
  const pagination = paginate({ data: users.map(adaptUser), page, pageSize })

  return pagination
}
