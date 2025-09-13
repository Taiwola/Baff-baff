'use server'
import { SignJWT, jwtVerify, decodeJwt } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

export interface JwtPayload {
  id: string
  email: string
  role?: 'user' | 'admin'
}

export async function generateToken(payload: JwtPayload): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)

  const jwtPayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  }

  const token = await new SignJWT(jwtPayload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime(JWT_EXPIRES_IN).setIssuedAt().sign(secret)

  return token
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256']
    })

    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as 'user' | 'admin' | undefined
    }
  } catch (error: unknown) {
    console.error('Token verification error:', error)
    throw new Error('Invalid or expired token')
  }
}

export async function decodeToken(token: string): Promise<JwtPayload | null> {
  try {
    const decoded = decodeJwt(token)
    return {
      id: decoded.id as string,
      email: decoded.email as string,
      role: decoded.role as 'user' | 'admin' | undefined
    }
  } catch {
    return null
  }
}
