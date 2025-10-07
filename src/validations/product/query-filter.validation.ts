import { z } from 'zod'
import { categorySchema, statusSchema, typeSchema } from './shared.validation'

export const productFilterSchema = z.object({
  category: categorySchema.optional().or(z.literal('')),
  type: typeSchema.optional().or(z.literal('')),
  status: statusSchema.or(z.literal('')).optional(),
  search: z.string().optional(),
  page: z
    .string()
    .transform((val) => (val ? Number(val) : 1)) // default to 1
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .transform((val) => (val ? Number(val) : 10)) // default to 10
    .pipe(z.number().int().positive().max(100)) // max 100 for sanity
})
