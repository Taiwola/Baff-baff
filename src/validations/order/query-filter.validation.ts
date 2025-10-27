import z from 'zod'

// Define valid groupings
export const SalesGroupingSchema = z.enum(['yearly', 'monthly', 'weekly', 'daily']);

export const orderQueryFilter = z.object({
  search: z.string().optional(),
  status: z.enum(['pending', 'paid', 'delivered', 'cancelled']).optional(),
  page: z.number().optional(),
  limit: z.number().optional(), // max 100 for sanity
  startDate: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), { message: 'Invalid startDate format' })
      .transform((val) => (val ? new Date(val) : undefined))
      .optional(),
    endDate: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), { message: 'Invalid endDate format' })
      .transform((val) => (val ? new Date(val) : undefined))
      .optional(),
    groupings: z.array(SalesGroupingSchema).optional(),
})

export type OrderQuery = z.infer<typeof orderQueryFilter>
