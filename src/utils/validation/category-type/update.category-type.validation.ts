import { z } from 'zod'

export const updateCategoryTypeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long').optional()
})

export type UpdateCategoryTypeDto = z.infer<typeof updateCategoryTypeSchema>

export type UpdateCategoryTypeFormState = FormState<UpdateCategoryTypeDto>
