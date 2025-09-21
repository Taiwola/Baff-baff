import { Status } from '@models/product.model'

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

interface Material {
  id: string
  name: string
  stock: number
  image: string
  createdAt: Date
  updatedAt: Date
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

interface Category {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface CategoryType {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

interface Product {
  id: string
  range?: string
  images: string[]
  description: string
  category: string
  category_type: string
  material: mongoose.Types.ObjectId | string
  yard: number
  name: string
  status: Status
  sizes?: ISizeDetails[]
  createdAt: Date
  updatedAt: Date
}

interface IProductSizes {
  s?: ISizeDetails
  m?: ISizeDetails
  l?: ISizeDetails
  xl?: ISizeDetails
  xxl?: ISizeDetails
  xxxl?: ISizeDetails
}

interface ISizeDetails {
  size: string
  price: number
  quantity: number
}

interface Address {
  id: string
  userId: mongoose.Types.ObjectId | string
  fullName: string
  email: string
  phoneNumber: string
  altPhoneNumber: string
  city: string
  state: string
  address: string
  active: boolean
  createdAt: string
  updatedAt: string
}
