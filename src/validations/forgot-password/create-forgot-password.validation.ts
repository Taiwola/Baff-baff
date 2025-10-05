import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required')
})

export type CreateForgotPasswordDto = z.infer<typeof forgotPasswordSchema>
export type CreateForgotPasswordFormState = FormState<CreateForgotPasswordDto>
