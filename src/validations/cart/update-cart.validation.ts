import { z } from 'zod'
import { cartItemSchema } from './cart-item.validation'

export const updateCartSchema = z.object({
  action: z.enum(['add', 'update', 'remove']),
  item: cartItemSchema
})

export type UpdateCartDto = z.infer<typeof updateCartSchema>
