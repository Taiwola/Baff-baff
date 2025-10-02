import { z } from 'zod'
import { categorySchema, fittingSchema, sizeDetailsSchema, statusSchema, typeSchema } from './shared.validation'

export const createProductSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    images: z.array(z.instanceof(File).or(z.string())).min(4, 'At least four images are required'),
    description: z.string().min(1),
    category: categorySchema,
    type: typeSchema,
    fittings: z.array(fittingSchema).min(1),
    materialId: z.string().min(1),
    yard: z.number().min(0),
    status: statusSchema.default('inStock'),
    // sizes
    s: sizeDetailsSchema.optional(),
    m: sizeDetailsSchema.optional(),
    l: sizeDetailsSchema.optional(),
    xl: sizeDetailsSchema.optional(),
    xxl: sizeDetailsSchema.optional(),
    xxxl: sizeDetailsSchema.optional()
  })
  .refine(
    (data) => {
      const hasSize = data.s || data.m || data.l || data.xl || data.xxl || data.xxxl
      return !!hasSize
    },
    {
      message: 'At least one size variant is required',
      path: ['s']
    }
  )

export type CreateProductDto = z.infer<typeof createProductSchema>

export type CreateProductFormState = FormState<CreateProductDto>
export type CreateProductErrors = CreateProductFormState['errors']
export type CreateProductFormValues = CreateProductFormState['values']
