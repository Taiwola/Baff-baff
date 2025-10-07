import ProductModel, { IProduct } from '@models/product.model'
import { CreateProductDto, UpdateProductDto } from '@validations/product'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createProduct(data: CreateProductDto, session?: ClientSession): Promise<IProduct> {
  const products = new ProductModel({
    ...data
  })

  await products.save({ session })
  return products
}

export async function getAllProducts(filter?: FilterQuery<ProductFilter>): Promise<IProduct[]> {
  return await ProductModel.find(filter || {}).limit(filter?.limit)
}

export async function getOneProductById(id: string): Promise<IProduct | null> {
  return await ProductModel.findById(id)
}

export async function getProductByFilter(filter: FilterQuery<IProduct>): Promise<IProduct | null> {
  return await ProductModel.findOne(filter)
}

export async function updateProduct(id: string, data: Partial<UpdateProductDto>, session?: ClientSession): Promise<IProduct | null> {
  const product = await ProductModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return product
}

export async function deleteProduct(id: string): Promise<IProduct | null> {
  return await ProductModel.findByIdAndDelete(id)
}
