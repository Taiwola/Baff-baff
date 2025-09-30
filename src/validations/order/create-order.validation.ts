import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

// Zod schema for IOrderProduct
const OrderProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  image: z.string().min(1, 'Product image is required'),
  category: z.string().min(1, 'Product category is required'),
  size: z.string().min(1, 'Product size is required'),
  quantity: z
    .string()
    .min(1, 'Product quantity is required')
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
      message: 'Quantity must be a valid positive number'
    })
})

// Zod schema for creating an order
export const CreateOrderSchema = z
  .object({
    reference: z.string().min(1, 'Reference is required'),
    userId: z
      .string()
      .refine((val) => !val || isValidObjectId(val), { message: 'Invalid USER ID' })
      .nonempty('User id is required'),
    datePlaced: z
      .date()
      .optional()
      .default(() => new Date()),
    totalAmount: z.number().min(0, 'Total amount must be non-negative'),
    email: z.email('Please enter a valid email address').nonempty('Email is required'),
    amount: z.number().min(0, 'Amount must be non-negative'),
    deliveryFee: z.number().min(0, 'Delivery fee must be non-negative').default(0),
    address: z.string().min(1, 'Address is required'),
    state: z.string().min(1, 'State is required'),
    region: z.string().min(1, 'Region is required'),
    fullName: z.string().min(1, 'Full name is required'),
    paymentStatus: z.enum(['unpaid', 'paid']).optional().default('unpaid'),
    status: z.enum(['not_start', 'processing', 'delivered']).optional().default('not_start'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    products: z.array(OrderProductSchema).min(1, 'At least one product is required')
  })
  .refine((data) => data.totalAmount === data.amount + data.deliveryFee, {
    message: 'Total amount must equal amount + deliveryFee',
    path: ['totalAmount']
  })

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>
export type CreateOrderFormState = FormState<CreateOrderDto>
