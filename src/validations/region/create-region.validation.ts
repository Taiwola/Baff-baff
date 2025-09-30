import { z } from 'zod'

export const CreateRegionSchema = z.object({
  state: z.string().min(1, 'State is required'),
  region: z.string().min(1, 'Region is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

// Inferred TypeScript types
export type CreateRegionDto = z.infer<typeof CreateRegionSchema>
export type CreateRegionFormState = FormState<CreateRegionDto>
