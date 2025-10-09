import { z } from 'zod'
import { isValidObjectId } from 'mongoose'
import { createMeasurementSchema } from '@validations/measurement'

export const cartItemSchema = z.object({
  productId: z
    .string()
    .refine((val) => isValidObjectId(val), { message: 'Invalid Product ID' })
    .nonempty('Product ID is required'),
  name: z.string().nonempty('Name is required'),
  price: z.number('Number is required'),
  quantity: z.number('Quantity is required'),
  fitting: z.enum(['fit', 'baggy', 'straight']),
  size: z.enum(['s', 'm', 'l', 'xl', 'xxl', 'xxxl', 'Bespoke']),
  measurements: createMeasurementSchema.optional()
})

export type CartItemDto = z.infer<typeof cartItemSchema>
