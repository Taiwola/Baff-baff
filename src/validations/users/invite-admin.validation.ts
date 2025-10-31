import { z } from 'zod'

export const inviteAdminSchema = z.object({
  email: z.email('Please enter a valid email address').nonempty('Email is required')
})

export type InviteAdminDto = z.infer<typeof inviteAdminSchema>
export type InviteAdminFormState = FormState<InviteAdminDto>
export type InviteAdminFormErrors = InviteAdminFormState['errors']
export type InviteAdminFormValues = InviteAdminFormState['values']
