type LoginResponseType = {
  id: string
  name: string
  email: string
  role: UserRole
}

type AuthUser = {
  id: string
  fullName: string
  email: string
  role: UserRole
}

type SessionPayload = {
  id: string
  role: UserRole
  expiresAt: Date
}
