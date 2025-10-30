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
    gender: user.gender,
    role: user.role || 'user',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString()
  }
}

export function adaptUsers({ data, page, total, pageSize }: AdaptersOptions<IUser[]>): Pagination<User> {
  const pagination = paginate({ data: data.map(adaptUser), total, page, pageSize })

  return pagination
}
