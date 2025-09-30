import { z } from 'zod'
import { isValidObjectId } from 'mongoose'

// Update Validator
export const updateCartSchema = z.object({
  price: z.number().min(0, 'Price must be at least 0').nonnegative('Price must be a non-negative number').optional(),
  size: z.string().min(1, 'Size is required').nonempty('Size is required').optional(),
  quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid positive integer').nonempty('Quantity is required').optional(),
  userId: z
    .string()
    .refine((val) => isValidObjectId(val), { message: 'Invalid User ID' })
    .nonempty('User ID is required')
    .optional(),
  product: z
    .string()
    .refine((val) => isValidObjectId(val), { message: 'Invalid Product ID' })
    .nonempty('Product ID is required')
    .optional()
})

export type UpdateCartDto = z.infer<typeof updateCartSchema>
export type UpdateCartFormState = FormState<UpdateCartDto>
