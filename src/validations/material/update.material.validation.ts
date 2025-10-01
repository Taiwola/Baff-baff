import { z } from 'zod'

export const updateMaterialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long').optional(),
  stock: z
    .number()
    .min(0, 'stock must be at least 0')
    .max(1000000, 'stock must be at most 1,000,000')
    .nonnegative('stock must be a non-negative number')
    .optional(),
  image: z.instanceof(File).or(z.string()).optional()
})

export type UpdateMaterialDto = z.infer<typeof updateMaterialSchema>
export type UpdateMaterialFormState = FormState<UpdateMaterialDto>
export type UpdateMaterialErrors = UpdateMaterialFormState['errors']
export type UpdateMaterialValues = UpdateMaterialFormState['values']
