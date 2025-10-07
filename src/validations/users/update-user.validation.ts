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

    phoneNumber: z.string().min(11).optional(),
    gender: z.enum(['Male', 'Female']).optional()
  })

  export type UpdateUserDto = z.infer<typeof updateUserSchema>
  
  export type UpdateUserFormState = FormState<UpdateUserDto>;
  export type UpdateUserFormErrors = UpdateUserFormState['errors'];
  export type UpdateUserFormValues = UpdateUserFormState['values'];
