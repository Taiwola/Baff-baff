import { z } from 'zod'

export const statusSchema = z.enum(['inStock', 'outOfStock'], "Status must be either 'inStock' or 'outOfStock'")

export const categorySchema = z.enum(['corporates', 'casuals'], "Category must be either 'corporates' or 'casuals'")

export const typeSchema = z.enum(['shirt', 'trouser'], "Type must be either 'shirt' or 'trouser'")

export const fittingSchema = z.enum(['fit', 'baggy', 'straight'], 'Fitting must be one of: fit, baggy, straight')

export const sizeDetailsSchema = z.object({
  price: z.number('Price is required').min(0, 'Price must be greater than or equal to 0'),
  discountPrice: z.number().min(0, 'Discount price must be greater than or equal to 0').optional(),
  quantity: z.number('Quantity is required').int('Quantity must be an integer').min(0, 'Quantity must be greater than or equal to 0')
})
