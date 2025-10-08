import { z } from 'zod'
import { categorySchema, sizeDetailsSchema, typeSchema } from './shared.validation'

export const updateProductSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    images: z.array(z.instanceof(File).or(z.string())).min(4, 'At least four images are required'),
    description: z.string().min(1, 'Description is required'),
    category: categorySchema.or(z.literal('')).refine((val) => val !== null && val !== '', {
      message: 'Category is required'
    }),
    type: typeSchema.or(z.literal('')).refine((val) => val !== null && val !== '', {
      message: 'Product type is required'
    }),
    materialId: z.string().nonempty('Material is required'),
    material: z.string().optional(),
    status: z.string().optional(),
    numberOfSales: z.number().optional(),
    yard: z.number().min(1, 'Yard is required'),
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
  .superRefine((data, ctx) => {
    const sizes = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const

    sizes.forEach((sizeKey) => {
      const size = data[sizeKey]
      if (!size) return

      if (size.price && size.price <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: [sizeKey, 'price'],
          message: `Price for size "${sizeKey.toUpperCase()}" must be greater than 0`
        })
      }

      if (size.quantity && size.quantity <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: [sizeKey, 'quantity'],
          message: `Quantity for size "${sizeKey.toUpperCase()}" must be greater than 0`
        })
      }

      if (size.discountPrice && size.discountPrice <= 0) {
        ctx.addIssue({
          code: 'custom',
          path: [sizeKey, 'discountPrice'],
          message: `Discount price for size "${sizeKey.toUpperCase()}" must be greater than 0`
        })
      }
    })
  })

export type UpdateProductDto = z.infer<typeof updateProductSchema>

export type UpdateProductErrors = {
  name?: string | undefined
  images?: string | undefined
  description?: string | undefined
  category?: string | undefined
  type?: string | undefined
  materialId?: string | undefined
  yard?: string | undefined
  s?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
  m?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
  l?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
  xl?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
  xxl?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
  xxxl?:
    | {
        price: string | undefined
        quantity: string | undefined
        discountPrice?: string | undefined
      }
    | undefined
}

export type UpdateProductFormState = FormState<UpdateProductDto, UpdateProductErrors>
export type UpdateProductFormValues = UpdateProductFormState['values']
