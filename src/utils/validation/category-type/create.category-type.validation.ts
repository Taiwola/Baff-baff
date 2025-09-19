import { z } from 'zod'

export const createCategoryTypeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long').nonempty('Name is required')
})

export type CreateCategoryTypeDto = z.infer<typeof createCategoryTypeSchema>

export type CreateCategoryTypeFormState = FormState<CreateCategoryTypeDto>
