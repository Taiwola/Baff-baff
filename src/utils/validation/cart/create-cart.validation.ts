import { z } from 'zod'
import { isValidObjectId } from 'mongoose'

// Create Validator
export const createCartSchema = z.object({
  price: z.number().min(0, 'Price must be at least 0').nonnegative('Price must be a non-negative number'),
  size: z.string().min(1, 'Size is required').nonempty('Size is required'),
  quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid positive integer').nonempty('Quantity is required'),
  userId: z
    .string()
    .refine((val) => isValidObjectId(val), { message: 'Invalid User ID' })
    .nonempty('User ID is required')
})

export type CreateCartDto = z.infer<typeof createCartSchema>
export type CreateCartFormState = FormState<CreateCartDto>
