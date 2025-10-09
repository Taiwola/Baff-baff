import { z } from 'zod'
import { isValidObjectId } from 'mongoose'
import { cartItemSchema } from './cart-item.validation'

export const cartSchema = z.object({
  userId: z
    .string()
    .refine((val) => isValidObjectId(val), { message: 'Invalid User ID' })
    .optional(),
  items: z.array(cartItemSchema)
})

export type CartDto = z.infer<typeof cartSchema>
