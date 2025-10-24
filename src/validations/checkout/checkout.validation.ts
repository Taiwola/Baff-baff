import { z } from 'zod'

export const checkoutSchema = z.object({
  addressId: z.string(),
  cartId: z.string(),
  regionId: z.string(),
})

export type CheckoutDto = z.infer<typeof checkoutSchema>
export type CheckoutFormState = FormState<CheckoutDto>
