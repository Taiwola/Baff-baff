import { z } from 'zod'

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .nonempty('Name is required')
    .optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description must be at most 1000 characters long')
    .nonempty('Description is required')
    .optional(),
  category: z
    .string()
    .min(2, 'Category must be at least 2 characters long')
    .max(50, 'Category must be at most 50 characters long')
    .nonempty('Category is required')
    .optional(),
  category_type: z
    .string()
    .min(2, 'Category type must be at least 2 characters long')
    .max(50, 'Category type must be at most 50 characters long')
    .nonempty('Category type is required')
    .optional(),
  material: z.string().min(2, 'Material must be at least 2 characters long').max(50, 'Material must be at most 50 characters long').optional(),
  yard: z
    .number()
    .min(1, 'Yard must be at least 1')
    .max(10000, 'Yard must be at most 10,000')
    .nonnegative('Yard must be a non-negative number')
    .optional(),
  status: z
    .enum(['in_stock', 'out_of_stock'], {
      message: 'Status is required'
    })
    .optional(),
  images: z.array(z.string()).min(1, 'At least one image is required').max(5, 'Maximum 5 images allowed').optional(),
  sizes: z
    .array(
      z.object({
        size: z.enum(['s', 'm', 'l', 'xl', 'xxl', 'xxxl'], {
          message: 'Size is required'
        }),
        price: z.number().min(0, 'Price must be at least 0').nonnegative('Price must be a non-negative number'),
        quantity: z.number().min(0, 'Quantity must be at least 0').nonnegative('Quantity must be a non-negative number'),
        _id: z.string().optional()
      })
    )
    .min(1, 'At least one size variant is required')
    .max(6, 'Maximum 6 size variants allowed')
    .optional(),
  range: z.string().optional()
})

export type UpdateProductDto = z.infer<typeof updateProductSchema>

export type UpdateProductFormState = FormState<UpdateProductDto>
