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
  UpdateProductDto,
  UpdateProductErrors,
  UpdateProductFormState,
  UpdateProductFormValues,
  updateProductSchema
} from '@validations/product/update-product.validation'
import { redirect, RedirectType } from 'next/navigation'

export async function createProduct(state: CreateProductFormState, formData: FormData): Promise<CreateProductFormState> {
  const parsedValues = parseProductForm(formData)
  console.log('parsed values: ', parsedValues)
  const result = createProductSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateProductErrors, CreateProductFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.post<Product>('/products', formData)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
  }

  redirect('/dashboard/products', RedirectType.replace)
}

export async function getProducts(options: PaginationParams = {}): Promise<Pagination<Product>> {
  const response = await ServerApiClient.get<Pagination<Product>>(`/products?page=${options.page ?? 1}&limit=${10}`)

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

export async function updateProduct(id: string, state: UpdateProductFormState, formData: FormData) {
  const parsedValues: UpdateProductDto = {
    name: String(formData.get('name')),
    description: String(formData.get('description')),
    category: String(formData.get('category')) as ProductCategory,
    type: formData.get('type') as ProductType,
    materialId: String(formData.get('materialId')),
    yard: Number(formData.get('yard')),
    images: formData.getAll('images') as unknown as (string | File)[],
    s: parseJson(formData.get('s')),
    m: parseJson(formData.get('m')),
    l: parseJson(formData.get('l')),
    xl: parseJson(formData.get('xl')),
    xxl: parseJson(formData.get('xxl')),
    xxxl: parseJson(formData.get('xxxl'))
  }

  const result = updateProductSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<UpdateProductErrors, UpdateProductFormValues>(result.error)
    return { ...state, errors, values: parsedValues }
  }

  const response = await ServerApiClient.patch<Product>(`/products/${id}`, result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: parsedValues }
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

// helper to safely parse JSON fields (for size details)
function parseJson<T>(value: FormDataEntryValue | null): T | undefined {
  if (!value) return undefined
  try {
    return JSON.parse(String(value)) as T
  } catch {
    return undefined
  }
}
