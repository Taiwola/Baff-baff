import { z } from 'zod'

export const statusSchema = z.enum(['inStock', 'outOfStock'], "Status must be either 'inStock' or 'outOfStock'")

export const categorySchema = z.enum(['corporates', 'casuals'], "Category must be either 'corporates' or 'casuals'")

export const typeSchema = z.enum(['shirt', 'trouser', 'jacket', 'short'], "Type must be either 'shirt' or 'trouser'")

export const fittingSchema = z.enum(['fit', 'baggy', 'straight'], 'Fitting must be one of: fit, baggy, straight')

export const sortShema = z.enum(['featured', 'best-selling', 'a-z', 'z-a', 'o-n', 'n-o'])

export const priceSchema = z.enum(['low', 'mid', 'high'])

export const sizeDetailsSchema = z.object({
  price: z.number('Price is required').min(1, 'Price must be greater than or equal to 0').optional(),
  discountPrice: z.number().min(1, 'Discount price must be greater than or equal to 0').optional(),
  quantity: z.number().min(1, 'Quantity must be greater than or equal to 0').optional()
})
