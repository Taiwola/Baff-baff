import { z } from 'zod'

export const createMaterialSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .nonempty('Name is required'),
  stock: z
    .number()
    .min(0, 'stock must be at least 0')
    .max(1000000, 'stock must be at most 1,000,000')
    .nonnegative('stock must be a non-negative number'),
  image: z.string().optional()
})

export type CreateMaterialDto = z.infer<typeof createMaterialSchema>

export type CreateMaterialFormState = FormState<CreateMaterialDto>
