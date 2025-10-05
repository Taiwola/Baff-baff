import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
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

export type CreateResetPasswordDto = z.infer<typeof resetPasswordSchema>
export type CreateResetFormState = FormState<CreateResetPasswordDto>
