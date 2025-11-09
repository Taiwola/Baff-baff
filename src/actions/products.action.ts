'use server'

import { uploadToCloudinary } from '@lib/cloudinary'
import { CLOUDINARY_FOLDERS } from '@lib/folder'
import { tag } from '@tags/products.tag'
import { ServerApiClient } from '@utils/api-server'
import { validateFile, VALIDATION_PRESETS } from '@utils/file-validation'
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
import { revalidateTag } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'

export async function createProduct(state: CreateProductFormState, formData: FormData): Promise<CreateProductFormState> {
  const parsedValues = parseProductForm(formData)
  const result = createProductSchema.safeParse(parsedValues)

  if (!result.success) {
    const errors = formatError<CreateProductErrors, CreateProductFormValues>(result.error)
    return { ...state, errors, error: '', values: { ...parsedValues, images: [] } }
  }

  const images: string[] = []

  for (const image of result.data.images) {
    if (image instanceof File) {
      if (image.size <= 0) continue

      const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)

      if (!validation.isValid) {
        return { ...state, error: 'Image is not valid', values: parsedValues }
      }

      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.PRODUCTS)

      if (!uploadResult.success) {
        return { ...state, error: 'Image upload failed', values: parsedValues }
      }

      if (uploadResult.data?.url) {
        images.push(uploadResult.data.url)
      }
    } else {
      images.push(image)
    }
  }

  result.data.images = images

  const response = await ServerApiClient.post<Product>('/products', result.data)

  if (response.code >= 400) {
    return { ...state, error: response.message, values: { ...parsedValues, images: [] } }
  }

  revalidateTag(tag.default)
  redirect('/dashboard/products', RedirectType.replace)
}

export async function getProducts(options: ProductQuery = {}): Promise<Pagination<Product>> {
  const params = new URLSearchParams()

  if (options.page) params.set('page', options.page.toString())
  if (options.limit) params.set('limit', options.limit.toString())
  if (options.status) params.set('status', options.status)
  if (options.type) params.set('type', options.type)
  if (options.price) params.set('price', options.price)
  if (options.design) params.set('design', options.design)
  if (options.sort) params.set('sort', options.sort)
  if (options.category) params.set('category', options.category)
  if (options.search) params.set('search', options.search)
  if (options.collaboratorId) params.set('collaboratorId', options.collaboratorId)

  const queryString = params.toString()
  const url = `/products${queryString ? `?${queryString}` : ''}`

  // revalidate every hour for customers and revalidate by tag for admins
  const response = await ServerApiClient.get<Pagination<Product>>(url, { next: { revalidate: 3600, tags: [tag.default] } })

  if (response.code >= 400) {
    console.log('products error: ', response)
    return emptyMetaData
  }

  return response.data
}

export async function getMayLikeProducts(): Promise<Product[]> {
  const response = await ServerApiClient.get<Product[]>(`/products/maylike`, { next: { revalidate: 3600 * 24 } })

  if (response.code >= 400) {
    console.log('maylike product error: ', response)
    return []
  }

  return response.data
}

export async function getAlsoBoughtProducts(): Promise<Product[]> {
  const response = await ServerApiClient.get<Product[]>(`/products/bought`, { next: { revalidate: 3600 * 24 } })

  if (response.code >= 400) {
    console.log('also bought product error: ', response)
    return []
  }

  return response.data
}

export async function getProduct(id: string) {
  const response = await ServerApiClient.get<Product>(`/products/${id}`, { next: { tags: [tag.createTag(id)] } })

  if (response.code >= 400) {
    console.log('product error: ', response)
    return null
  }

  return response.data
}

export async function getProductBySlug(slug: string) {
  const response = await ServerApiClient.get<Product>(`/products/slugs/${slug}`, { next: { tags: [tag.createTag(slug)] } })

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

  const images: string[] = []

  for (const image of result.data.images) {
    if (image instanceof File) {
      if (image.size <= 0) continue
      const validation = validateFile(image, VALIDATION_PRESETS.IMAGE)

      if (!validation.isValid) {
        return { ...state, error: 'Image is not valid', values: parsedValues }
      }

      const uploadResult = await uploadToCloudinary(image, CLOUDINARY_FOLDERS.PRODUCTS)

      if (!uploadResult.success) {
        return { ...state, error: 'Image upload failed', values: parsedValues }
      }

      if (uploadResult.data?.url) {
        images.push(uploadResult.data.url)
      }
    } else {
      images.push(image)
    }
  }

  result.data.images = images

  const response = await ServerApiClient.patch<Product>(`/products/${product.id}`, result.data)

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message,
      values: { ...parsedValues, images: parsedValues.images.filter((image) => typeof image === 'string') }
    }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(product.id))
  revalidateTag(tag.createTag(product.slug))
  redirect('/dashboard/products', RedirectType.replace)
}

export async function deleteProduct(id: string) {
  const response = await ServerApiClient.delete<void>(`/products/${id}`)

  if (response.code >= 400) {
    return { error: response.message }
  }

  revalidateTag(tag.default)
  redirect('/dashboard/products', RedirectType.replace)
}

export async function updateProductStatus(id: string, status: ProductStatus) {
  const response = await ServerApiClient.patch<Product>(`/products/${id}/status`, { status })

  if (response.code >= 400) {
    return { error: response.message }
  }

  revalidateTag(tag.default)
  revalidateTag(tag.createTag(id))
  redirect('/dashboard/products', RedirectType.replace)
}
