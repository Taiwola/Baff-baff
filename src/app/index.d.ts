interface MenuItem {
  href: string
  label: string
  className: string
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'user' | 'admin'
  password: string
  createdAt: string
  updatedAt: string
}

interface UserRegistration {
  firstName: string
  lastName: string
  email: string
  role: 'user' | 'admin'
  password: string
  confirmPassword: string
}

interface UserLogin {
  email: string
  password: string
}

interface AuthResponse {
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
  token?: string
  errors?: { field: string; message: string }[]
  error?: unknown
}
