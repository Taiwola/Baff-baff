import z from 'zod'

export const orderQueryFilter = z.object({
  search: z.string().optional(),
  status: z.enum(['pending', 'paid', 'delivered', 'cancelled']).optional(),
  page: z.number().optional(),
  limit: z.number().optional() // max 100 for sanity
})

export type OrderQuery = z.infer<typeof orderQueryFilter>
