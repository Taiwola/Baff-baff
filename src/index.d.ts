/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface Measurement {
  id: string
  userId: mongoose.Types.ObjectId | string
  shirt: Shirt
  trouser: Trouser
  createdAt: Date
  updatedAt: Date
}

interface Trouser {
  waist: string
  lap: string
  length: string
  knee: string
}

interface Shirt {
  chest: string
  arm: string
  sleeve: string
  shoulder: string
  length: string
  neck: string
}

interface Cart {
  id: string
  price: number
  size: string
  quantity: string
  subtotal: number
  userId: mongoose.Types.ObjectId | string
  product:
    | string
    | {
        id: string
        name: string
        image: string
      }
  createdAt: Date
  updatedAt: Date
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

enum OrderStatusEnum {
  'NOT_START' = 'not_start',
  'PROCESSING' = 'processing',
  'DELIVERED' = 'delivered'
}

interface Order {
  id: string
  datePlaced: Date
  fullName: string
  email: string
  paymentStatus: string
  phoneNumber: string
  deliveryZone: string
  orderStatus: string
  subTotal: number
  deliveryFee: number
  totalAmount: number
  products: {
    id: string
    name: string
    image: string
    category: string
    quantity: string
    size: string
    price: number
  }[]
}

interface Region {
  id: string
  region: string
  state: string
  price: number
  createdAt: Date
  updatedAt: Date
}
