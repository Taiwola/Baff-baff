import { z } from 'zod'
import { createOrderSchema } from './create-order.validation'

export const updateOrderSchema = createOrderSchema.partial()

export type UpdateOrderDto = z.infer<typeof updateOrderSchema>
export type UpdateOrderFormState = FormState<UpdateOrderDto>
