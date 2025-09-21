import { z } from 'zod'

// Define the size details schema
const sizeDetailsSchema = z.object({
  price: z.number().min(0, 'Price must be at least 0').nonnegative('Price must be a non-negative number'),
  quantity: z.number().min(0, 'Quantity must be at least 0').nonnegative('Quantity must be a non-negative number')
})

// Define the create product schema
export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(100, 'Name must be at most 100 characters long')
      .nonempty('Name is required'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .max(1000, 'Description must be at most 1000 characters long')
      .nonempty('Description is required'),
    category: z
      .string()
      .min(2, 'Category must be at least 2 characters long')
      .max(50, 'Category must be at most 50 characters long')
      .nonempty('Category is required'),
    category_type: z
      .string()
      .min(2, 'Category type must be at least 2 characters long')
      .max(50, 'Category type must be at most 50 characters long')
      .nonempty('Category type is required'),
    material: z
      .string()
      .min(2, 'Material must be at least 2 characters long')
      .max(50, 'Material must be at most 50 characters long')
      .nonempty('Material is required'),
    yard: z.number().min(1, 'Yard must be at least 1').max(10000, 'Yard must be at most 10,000').nonnegative('Yard must be a non-negative number'),
    status: z
      .enum(['in_stock', 'out_of_stock'], {
        message: 'Status is required'
      })
      .optional(),
    images: z.array(z.string()).min(1, 'At least one image is required').max(5, 'Maximum 5 images allowed'),

    // Individual size fields (optional)
    s: sizeDetailsSchema.optional(),
    m: sizeDetailsSchema.optional(),
    l: sizeDetailsSchema.optional(),
    xl: sizeDetailsSchema.optional(),
    xxl: sizeDetailsSchema.optional(),
    xxxl: sizeDetailsSchema.optional()
  })
  .refine(
    (data) => {
      // Custom validation to ensure at least one size is provided
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
