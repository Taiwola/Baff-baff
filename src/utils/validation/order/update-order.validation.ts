import { z } from 'zod'

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

export const UpdateOrderSchema = z
  .object({
    reference: z.string().min(1, 'Reference is required').optional(),
    userId: z.string().min(1, 'User ID is required').optional(),
    datePlaced: z.date().optional(),
    totalAmount: z.number().min(0, 'Total amount must be non-negative').optional(),
    amount: z.number().min(0, 'Amount must be non-negative').optional(),
    deliveryFee: z.number().min(0, 'Delivery fee must be non-negative').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    state: z.string().min(1, 'State is required').optional(),
    region: z.string().min(1, 'Region is required').optional(),
    fullName: z.string().min(1, 'Full name is required').optional(),
    paymentStatus: z.enum(['unpaid', 'paid']).optional(),
    status: z.enum(['not_start', 'processing', 'delivered']).optional(),
    phoneNumber: z.string().min(1, 'Phone number is required').optional(),
    products: z.array(OrderProductSchema).min(1, 'At least one product is required').optional()
  })
  .refine(
    (data) => {
      if (data.totalAmount !== undefined && (data.amount !== undefined || data.deliveryFee !== undefined)) {
        return data.totalAmount === (data.amount ?? 0) + (data.deliveryFee ?? 0)
      }
      return true
    },
    {
      message: 'Total amount must equal amount + deliveryFee',
      path: ['totalAmount']
    }
  )

export type UpdateOrderDto = z.infer<typeof UpdateOrderSchema>
export type UpdateOrderFormState = FormState<UpdateOrderDto>
