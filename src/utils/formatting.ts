import { CreateProductDto } from '@validations/product'
import { z, ZodError } from 'zod'

export function formatError<T, K>(error: ZodError<K>): T {
  const tree = z.treeifyError(error)

  if (!('properties' in tree && tree.properties)) {
    return {} as T
  }

  return formatProperties(tree.properties) as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatProperties(properties: Record<string, { errors: string[]; properties?: any } | undefined>) {
  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(properties)) {
    if (!value) continue

    // If the property has nested properties, recurse
    if (value.properties) {
      result[key] = formatProperties(value.properties)
    } else if (value.errors.length) {
      result[key] = value.errors[0] // just take the first error
    }
  }

  return result
}

export function parseProductForm(formData: FormData): CreateProductDto {
  return {
    name: String(formData.get('name')),
    description: String(formData.get('description')),
    category: String(formData.get('category')) as ProductCategory,
    type: formData.get('type') as ProductType,
    materialId: String(formData.get('materialId')),
    yard: Number(formData.get('yard')),
    images: formData.getAll('images') as unknown as (string | File)[],
    s: {
      quantity: Number(formData.get('s[quantity]')),
      price: Number(formData.get('s[price]')),
      discountPrice: Number(formData.get('s[discountPrice]'))
    },
    m: {
      quantity: Number(formData.get('m[quantity]')),
      price: Number(formData.get('m[price]')),
      discountPrice: Number(formData.get('m[discountPrice]'))
    },
    l: {
      quantity: Number(formData.get('l[quantity]')),
      price: Number(formData.get('l[price]')),
      discountPrice: Number(formData.get('l[discountPrice]'))
    },
    xl: {
      quantity: Number(formData.get('xl[quantity]')),
      price: Number(formData.get('xl[price]')),
      discountPrice: Number(formData.get('xl[discountPrice]'))
    },
    xxl: {
      quantity: Number(formData.get('xxl[quantity]')),
      price: Number(formData.get('xxl[price]')),
      discountPrice: Number(formData.get('xxl[discountPrice]'))
    },
    xxxl: {
      quantity: Number(formData.get('xxxl[quantity]')),
      price: Number(formData.get('xxxl[price]')),
      discountPrice: Number(formData.get('xxxl[discountPrice]'))
    }
  }
}
