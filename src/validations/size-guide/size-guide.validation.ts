import { z } from 'zod'

const measurementsSchema = z.object({
  // Top measurements
  chest: z.string().optional(),
  arm: z.string().optional(),
  sleeve: z.string().optional(),
  shoulder: z.string().optional(),
  length: z.string().optional(),
  neck: z.string().optional(),
  
  // Bottom measurements
  waist: z.string().optional(),
  lap: z.string().optional(),
  knee: z.string().optional()
})

const sizeGuideEntrySchema = z.object({
  size: z.string().min(1, 'Size is required').max(10),
  type: z.enum(['shirt', 'trouser', 'jacket', 'short'] as const, {
    message: 'Garment type is required'
  }),
  measurements: measurementsSchema
})

export const upsertSizeGuideSchema = z.object({
  gender: z.enum(['men', 'women'] as const, {
    message: 'Gender is required'
  }),
  entries: z
    .array(sizeGuideEntrySchema)
    .min(1, 'At least one size entry is required')
    .max(20, 'Too many entries')
})

export type UpsertSizeGuideDto = z.infer<typeof upsertSizeGuideSchema>

export type UpsertSizeGuideErrors = Partial<
  Record<
    keyof UpsertSizeGuideDto | `entries.${number}.${keyof UpsertSizeGuideDto['entries'][0]}` | `entries.${number}.measurements.${keyof UpsertSizeGuideDto['entries'][0]['measurements']}`,
    string | undefined
  >
>

export type UpsertSizeGuideFormState = FormState<UpsertSizeGuideDto, UpsertSizeGuideErrors>
export type UpsertSizeGuideFormValues = UpsertSizeGuideFormState['values']