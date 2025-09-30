import { z } from 'zod'

export const updateUserSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: 'first name must be at least 2 characters long' })
      .max(50, { message: 'first name cannot exceed 50 characters' })
      .optional(),

    lastName: z
      .string()
      .min(2, { message: 'last name must be at least 2 characters long' })
      .max(50, { message: 'last name cannot exceed 50 characters' })
      .optional(),

    email: z.string().email({ message: 'Please enter a valid email address' }).optional(),

    role: z.enum(['user', 'admin'], { message: 'Role must be either user or admin' }).optional(),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      })
      .optional(),

    confirmPassword: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })

  export type UpdateUserDto = z.infer<typeof updateUserSchema>
  
  export type UpdateUserFormState = FormState<UpdateUserDto>;
