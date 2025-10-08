import { z } from 'zod'

export const updateAddressSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters long')
    .max(100, 'Full name must be at most 100 characters long')
    .nonempty('Full name is required')
    .optional(),
  email: z.email('Please provide a valid email address').nonempty('Email is required').optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Please provide a valid phone number')
    .nonempty('Phone number is required')
    .optional(),
  altPhoneNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Please provide a valid alternate phone number')
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters long')
    .max(50, 'City must be at most 50 characters long')
    .nonempty('City is required')
    .optional(),
  state: z
    .string()
    .min(2, 'State must be at least 2 characters long')
    .max(50, 'State must be at most 50 characters long')
    .nonempty('State is required')
    .optional(),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters long')
    .max(200, 'Address must be at most 200 characters long')
    .nonempty('Address is required')
    .optional(),
  active: z.boolean().optional()
})

export type UpdateAddressDto = z.infer<typeof updateAddressSchema>
export type UpdateAddressFormState = FormState<UpdateAddressDto>
export type UpdateAddressFormErrors = UpdateAddressFormState['errors']
export type UpdateAddressFormValues = UpdateAddressFormState['values']
