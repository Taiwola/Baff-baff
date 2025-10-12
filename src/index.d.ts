/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Status } from '@models/product.model'

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



interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  fullName?: string
  role: 'user' | 'admin'
  password: string
  createdAt: Date
  updatedAt: Date
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

export interface FileValidationOptions {
  maxSize?: number
  allowedTypes?: string[]
  allowedExtensions?: string[]
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export type Currency = 'NGN' | 'USD' | 'GHS' | 'ZAR' | 'KES' | 'XOF'

interface InitiatePayment {
  amount: number
  email: string
  currency?: Currency
  reference?: string
  callback_url?: string
  metadata?: Record<string, any>
}

interface InitiatePaymentResponse {
  checkoutUrl: string // for web
  reference: string
  checkoutCode: string // for mobile
}