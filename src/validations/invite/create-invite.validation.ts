import { z } from 'zod'

export const createInviteSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required')
})

export type CreateInviteDto = z.infer<typeof createInviteSchema>
export type CreateInviteFormState = FormState<CreateInviteDto>
