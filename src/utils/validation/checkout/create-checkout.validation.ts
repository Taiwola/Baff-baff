import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

export const createCheckoutSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'State is required'),
  email: z.email('Please enter a valid email address').nonempty('Email is required'),
  region: z.string().min(1, 'Region is required'),
  fullName: z.string().min(1, 'First name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  altPhoneNumber: z.string().optional(),
  regionId: z
    .string()
    .refine((val) => !val || isValidObjectId(val), { message: 'Invalid Region ID' })
    .nonempty('region id is required')
})

export type CreateCheckoutDto = z.infer<typeof createCheckoutSchema>
export type CreateCheckoutFormState = FormState<CreateCheckoutDto>
