import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required')
})

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>
export type ForgotPasswordFormState = FormState<ForgotPasswordDto>
export type ForgotPasswordFormErrors = ForgotPasswordFormState['errors']
export type ForgotPasswordFormValues = ForgotPasswordFormState['values']