'use server'

import { ServerApiClient } from '@utils/api-server'
import { formatError, parseProductForm } from '@utils/formatting'
import { emptyMetaData } from '@utils/pagination'
import {
  CreateProductErrors,
  CreateProductFormState,
  CreateProductFormValues,
  createProductSchema
} from '@validations/product/create-product.validation'
import {
  UpdateProductErrors,
  UpdateProductFormState,
  UpdateProductFormValues,
  updateProductSchema
} from '@validations/product/update-product.validation'
import { redirect, RedirectType } from 'next/navigation'

export async function createProduct(state: CreateProductFormState, formData: FormData): Promise<CreateProductFormState> {
  const parsedValues = parseProductForm(formData)
  const result = createProductSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateProductErrors, CreateProductFormValues>(result.error)
    return { ...state, errors, error: '', values: { ...parsedValues, images: [] } }
  }

  const response = await ServerApiClient.post<Product>('/products', formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: { ...parsedValues, images: [] } }
  }

  redirect('/dashboard/products', RedirectType.replace)
}

export async function getProducts(options: ProductQuery = {}): Promise<Pagination<Product>> {
  const params = new URLSearchParams()

  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())
  if (options.status) params.set('status', options.status)
  if (options.type) params.set('type', options.type)
  if (options.price) params.set('price', options.price)
  if (options.sort) params.set('sort', options.sort)
  if (options.category) params.set('category', options.category)
  if (options.search) params.set('search', options.search)
  if (options.collaboratorId) params.set('collaboratorId', options.collaboratorId)

  const queryString = params.toString()
  const url = `/products${queryString ? `?${queryString}` : ''}`

  const response = await ServerApiClient.get<Pagination<Product>>(url)

  if (response.code >= 400) {
    console.log('products error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getProduct(id: string) {
  const response = await ServerApiClient.get<Product>(`/products/${id}`)

  if (response.code >= 400) {
    console.log('product error: ', response)
    return null
  }

  return response.data
}

export async function getProductBySlug(slug: string) {
  const response = await ServerApiClient.get<Product>(`/products/slugs/${slug}`)

  if (response.code >= 400) {
    console.log('product error: ', response)
    return null
  }

  return response.data
}

export async function updateProduct(product: Product, state: UpdateProductFormState, formData: FormData): Promise<UpdateProductFormState> {
  const parsedValues = parseProductForm(formData)
  const result = updateProductSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateProductErrors, UpdateProductFormValues>(result.error)
    return { ...state, errors, error: '', values: { ...parsedValues, images: parsedValues.images.filter((image) => typeof image === 'string') } }
  }

  const response = await ServerApiClient.patch<Product>(`/products/${product.id}`, formData)

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message,
      values: { ...parsedValues, images: parsedValues.images.filter((image) => typeof image === 'string') }
    }
  }

  redirect('/dashboard/products', RedirectType.replace)
}

export async function deleteProduct(id: string) {
  const response = await ServerApiClient.delete<void>(`/products/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  redirect('/dashboard/products', RedirectType.replace)
}

export async function updateProductStatus(id: string, status: ProductStatus) {
  const response = await ServerApiClient.patch<Product>(`/products/${id}/status`, { status })

  if (response.code >= 400) {
    return { error: response.message }
  }

  redirect('/dashboard/products', RedirectType.replace)
}
