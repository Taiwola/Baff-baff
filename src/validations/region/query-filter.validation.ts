import z from 'zod'

export const regionQueryFilter = z.object({
  page: z
    .string()
    .transform((val) => (val ? Number(val) : 1)) // default to 1
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .transform((val) => (val ? Number(val) : 10)) // default to 10
    .pipe(z.number().int().positive().max(100)) // max 100 for sanity
})
