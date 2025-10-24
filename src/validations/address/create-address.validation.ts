import { z } from 'zod'

export const createAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name must be at most 100 characters long')
    .nonempty('Full name is required'),
  email: z.email('Please provide a valid email address').nonempty('Email is required'),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Please provide a valid phone number')
    .nonempty('Phone number is required'),
  altPhoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Please provide a valid alternate phone number')
    .optional()
    .or(z.literal('')),
  city: z.string().min(2, 'City must be at least 2 characters long').max(50, 'City must be at most 50 characters long').nonempty('City is required'),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters long')
    .max(50, 'State must be at most 50 characters long')
    .nonempty('State is required'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters long')
    .max(200, 'Address must be at most 200 characters long')
    .nonempty('Address is required'),
  active: z.boolean().default(true)
})

export type CreateAddressDto = z.infer<typeof createAddressSchema>
export type CreateAddressFormState = FormState<CreateAddressDto>
export type CreateAddressFormErrors = CreateAddressFormState['errors']
export type CreateAddressFormValues = CreateAddressFormState['values']
