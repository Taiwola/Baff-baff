import { z } from 'zod'

export const UpdateRegionSchema = z.object({
  state: z.string().min(1, 'State is required'),
  region: z.string().min(1, 'Region is required'),
  price: z.number().min(0, 'Price must be non-negative')
})

export type UpdateRegionDto = z.infer<typeof UpdateRegionSchema>
export type UpdateRegionFormState = FormState<UpdateRegionDto>
export type UpdateRegionErrors = UpdateRegionFormState['errors']
export type UpdateRegionFormValues = UpdateRegionFormState['values']
