import { z } from 'zod'

// 🧱 Enum definitions
export const OrderStatusEnum = z.enum(['pending', 'paid', 'delivered', 'cancelled', 'failed'])
export const FittingEnum = z.enum(['fit', 'baggy', 'straight'])

// ✅ Measurement Schema
const MeasurementSchema = z.object({
  chest: z.string().optional(),
  arm: z.string().optional(),
  sleeve: z.string().optional(),
  shoulder: z.string().optional(),
  length: z.string().optional(),
  neck: z.string().optional(),
  waist: z.string().optional(),
  lap: z.string().optional(),
  trouserLength: z.string().optional(),
  knee: z.string().optional()
})

const OrderProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  category: z.string(),
  images: z.array(z.string()).default([])
})

const OrderItemSchema = z.object({
  product: OrderProductSchema,
  name: z.string(),
  price: z.number().nonnegative(),
  fitting: FittingEnum,
  size: z.string(),
  measurements: MeasurementSchema.optional(),
  quantity: z.number().int().positive()
})

const ShippingAddressSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  altPhoneNumber: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string()
})

export const createOrderSchema = z.object({
  userId: z.string().optional(),
  reference: z.string(),
  items: z.array(OrderItemSchema).min(1),
  total: z.number().nonnegative(),
  status: OrderStatusEnum.optional(),
  shippingAddress: ShippingAddressSchema,
  deliveryFee: z.number().nonnegative().default(0)
})

// export const updateOrderSchema = createOrderSchema.partial();
export type CreateOrderDto = z.infer<typeof createOrderSchema>
export type CreateOrderFormState = FormState<CreateOrderDto>
