import { z } from 'zod'

const sizeGuideEntrySchema = z.object({
  size: z.string().min(1, 'Size is required').max(10),
  us: z.string().min(1, 'US size is required').max(20),
  measurement1: z.string().min(1, 'Measurement is required'),
  measurement1Cm: z.string().min(1, 'Measurement (cm) is required'),
  waist: z.string().min(1, 'Waist is required'),
  waistCm: z.string().min(1, 'Waist (cm) is required'),
  hip: z.string().min(1, 'Hip is required'),
  hipCm: z.string().min(1, 'Hip (cm) is required')
})

export const upsertSizeGuideSchema = z.object({
  gender: z.enum(['men', 'women']),
  entries: z
    .array(sizeGuideEntrySchema)
    .min(1, 'At least one size entry is required')
    .max(20, 'Too many entries')
})

export type UpsertSizeGuideDto = z.infer<typeof upsertSizeGuideSchema>

export type UpsertSizeGuideErrors = Partial<Record<keyof UpsertSizeGuideDto | `entries.${number}.${keyof UpsertSizeGuideDto['entries'][0]}`, string | undefined>>

export type UpsertSizeGuideFormState = FormState<UpsertSizeGuideDto, UpsertSizeGuideErrors>
export type UpsertSizeGuideFormValues = UpsertSizeGuideFormState['values']