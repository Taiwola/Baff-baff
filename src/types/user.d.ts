type User = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  phoneNumber?: string
  gender?: Gender
  email: string
  numberOfItems: number
  role: UserRole
  createdAt: string
  updatedAt: string
}

type UserRole = 'user' | 'admin'

type UserFilter = {
  page?: number
  limit?: number
  role?: UserRole
}

type Gender = 'Male' | 'Female'
