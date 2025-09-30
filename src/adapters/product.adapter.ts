import { IProduct } from '@models/product.model'

export function adaptProduct(data: IProduct): Product {
  const prices = [data.s?.price, data.m?.price, data.l?.price, data.xl?.price, data.xxl?.price, data.xxxl?.price].filter(
    (price): price is number => price !== undefined && price !== null && price > 0
  )

  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
  const range = prices.length > 0 ? `${minPrice} - ${maxPrice}` : '0'

  const sizes: ISizeDetails[] = []

  if (data.s && data.s.price > 0) sizes.push({ size: 's', price: data.s.price, quantity: data.s.quantity })
  if (data.m && data.m.price > 0) sizes.push({ size: 'm', price: data.m.price, quantity: data.m.quantity })
  if (data.l && data.l.price > 0) sizes.push({ size: 'l', price: data.l.price, quantity: data.l.quantity })
  if (data.xl && data.xl.price > 0) sizes.push({ size: 'xl', price: data.xl.price, quantity: data.xl.quantity })
  if (data.xxl && data.xxl.price > 0) sizes.push({ size: 'xxl', price: data.xxl.price, quantity: data.xxl.quantity })
  if (data.xxxl && data.xxxl.price > 0) sizes.push({ size: 'xxxl', price: data.xxxl.price, quantity: data.xxxl.quantity })

  return {
    id: data._id,
    slug: data.id,
    images: data.images,
    category: data.category,
    categoryType: data.category_type,
    yard: data.yard,
    range: range,
    description: data.description,
    name: data.name,
    sizes: sizes,
    status: data.status,
    material: data.material.toString(),
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  }
}

export function adaptProducts(data: IProduct[]): Product[] {
  return data.map(adaptProduct)
}
