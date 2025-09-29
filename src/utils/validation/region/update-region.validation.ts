import { z } from 'zod'

export const UpdateRegionSchema = z.object({
  state: z.string().min(1, 'State is required').optional(),
  region: z.string().min(1, 'Region is required').optional(),
  price: z.number().min(0, 'Price must be non-negative').optional(),
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

export type UpdateRegionDto = z.infer<typeof UpdateRegionSchema>
export type UpdateRegionFormState = FormState<UpdateRegionDto>
