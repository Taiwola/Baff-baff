import { Product } from '@index'
import { IProduct } from '@models/product.model'

export function transfromProduct(data: IProduct): Product {
  const prices = data.sizes.map((size) => size.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const range = `${minPrice} - ${maxPrice}`

  return {
    id: data._id,
    images: data.images,
    category: data.category,
    category_type: data.category_type,
    price: data.sizes[0].price,
    yard: data.yard,
    range: range,
    description: data.description,
    name: data.name,
    sizes: data.sizes,
    status: data.status,
    material: data.material,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformProducts(data: IProduct[]): Product[] {
  return data.map(transfromProduct)
}
