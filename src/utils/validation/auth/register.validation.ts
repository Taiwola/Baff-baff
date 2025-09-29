import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'first name must be at least 2 characters long')
      .max(50, 'first name cannot exceed 50 characters')
      .nonempty('first name is required'),

    lastName: z
      .string()
      .min(2, 'last name must be at least 2 characters long')
      .max(50, 'last name cannot exceed 50 characters')
      .nonempty('last name is required'),

    email: z.string().email('Please enter a valid email address').nonempty('Email is required'),

    role: z.enum(['user', 'admin']).optional(),

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

export type RegisterDto = z.infer<typeof registerSchema>

export type RegisterFormState = FormState<RegisterDto>;