type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  password: string
  createdAt: string
  updatedAt: string
}

type UserRole = 'user' | 'admin'
