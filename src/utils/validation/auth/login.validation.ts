import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
    .nonempty('Password is required')
})

export type LoginDto = z.infer<typeof loginSchema>

export type LoginFormState = FormState<LoginDto>
