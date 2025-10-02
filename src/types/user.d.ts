type User = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  phoneNumber?: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

type UserRole = 'user' | 'admin'

type UserFilter = {
  page?: number
  limit?: number
}
