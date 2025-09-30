type LoginResponseType = {
  user: AuthUser
  token: string
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
