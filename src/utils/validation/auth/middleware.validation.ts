import { z } from 'zod'

export const authUserSchema = z.object({
   id: z.string(),
   email: z.email(),
   role:  z.enum(['user', 'admin'])
})