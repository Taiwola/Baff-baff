import { z } from 'zod'
import { isValidObjectId } from 'mongoose'

export const createMeasurementSchema = z.object({
  userId: z
    .string()
    .refine((val) => !val || isValidObjectId(val), { message: 'Invalid USER ID' })
    .nonempty('User id is required'),
  chest: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Chest must be a valid number or empty')
    .optional(),
  arm: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Arm must be a valid number or empty')
    .optional(),
  sleeve: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Sleeve must be a valid number or empty')
    .optional(),
  shoulder: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Shoulder must be a valid number or empty')
    .optional(),
  length: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Length must be a valid number or empty')
    .optional(),
  neck: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Neck must be a valid number or empty')
    .optional(),
  waist: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Waist must be a valid number or empty')
    .optional(),
  lap: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Lap must be a valid number or empty')
    .optional(),
  trouserLength: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Trouser length must be a valid number or empty')
    .optional(),
  knee: z
    .string()
    .regex(/^\d*\.?\d*$|^$/, 'Knee must be a valid number or empty')
    .optional()
})

export type CreateMeasurementDto = z.infer<typeof createMeasurementSchema>
export type CreateMeasuremnentFormState = FormState<CreateMeasurementDto>
