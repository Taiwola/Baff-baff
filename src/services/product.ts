import ProductModel, { IProduct } from '@models/product.model'
import { CreateProductDto, UpdateProductDto } from '@validations/product'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createProduct(data: CreateProductDto, session?: ClientSession): Promise<IProduct> {
  const products = new ProductModel({
    ...data
  })

  await products.save({ session })
  return ProductModel.populate(products, { path: 'collaborator' })
}

export async function getAllProducts({ 
  limit, 
  sort, 
  page = 1, 
  ...filter 
}: FilterQuery<ProductFilter>): Promise<{ products: IProduct[]; count: number }> {
  const query = ProductModel.find(filter)
  
  if (sort) {
    query.sort(sort)
  }

  if (limit) {
    const skip = (page - 1) * limit
    query.limit(limit).skip(skip)
  }

  const [products, count] = await Promise.all([
    query.populate('collaborator').exec(),
    ProductModel.countDocuments(filter)
  ])

  const explain = await ProductModel.find(filter).sort(sort).explain('executionStats')
console.log(explain)

  return { products, count }
}

export async function getOneProductById(id: string): Promise<IProduct | null> {
  return await ProductModel.findById(id).populate('collaborator')
}

export async function getProductByFilter(filter: FilterQuery<IProduct>): Promise<IProduct | null> {
  return await ProductModel.findOne(filter).populate('collaborator')
}

export async function updateProduct(id: string, data: Partial<UpdateProductDto>, session?: ClientSession): Promise<IProduct | null> {
  const product = await ProductModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return ProductModel.populate(product, { path: 'collaborator' })
}

export async function deleteProduct(id: string): Promise<IProduct | null> {
  return await ProductModel.findByIdAndDelete(id).populate('collaborator')
}
