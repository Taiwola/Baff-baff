import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty('Old Password is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
      .nonempty('Password is required'),

    confirmPassword: z.string().nonempty('Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>
export type ChangePasswordFormState = FormState<ChangePasswordDto>
export type ChangePasswordFormErrors = ChangePasswordFormState['errors']
export type ChangePasswordFormValues = ChangePasswordFormState['values']
