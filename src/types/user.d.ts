export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'user' | 'admin'
  password: string
  createdAt: string
  updatedAt: string
}
