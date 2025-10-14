import z from 'zod'

export const collaboratorQueryFilterQuery = z.object({
  page: z
    .string()
    .transform((val) => (val ? Number(val) : 1)) 
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .transform((val) => (val ? Number(val) : 10)) 
    .pipe(z.number().int().positive().max(100)),
   search: z.string().optional()
})
