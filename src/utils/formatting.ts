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
  const imageEntries: (string | File)[] = []

  // Handle indexed image fields
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^images\[(\d+)\]$/)
    if (match) {
      const index = Number(match[1])
      imageEntries[index] = value as string | File
    }
  }

  // filter valid image values (non-empty)
  const images = imageEntries.filter((image) => typeof image === 'string' || (image instanceof File && image.size > 0))

  return {
    name: String(formData.get('name')),
    description: String(formData.get('description')),
    category: String(formData.get('category')) as ProductCategory,
    type: formData.get('type') as ProductType,
    materialId: String(formData.get('materialId')),
    material: String(formData.get('materialId')),
    yard: Number(formData.get('yard')),
    images,
    s: parseSize(formData, 's'),
    m: parseSize(formData, 'm'),
    l: parseSize(formData, 'l'),
    xl: parseSize(formData, 'xl'),
    xxl: parseSize(formData, 'xxl'),
    xxxl: parseSize(formData, 'xxl')
  }
}

function parseSize(formData: FormData, key: string) {
  return {
    quantity: formData.get(`${key}[quantity]`) ? Number(formData.get(`${key}[quantity]`)) : undefined,
    price: formData.get(`${key}[price]`) ? Number(formData.get(`${key}[price]`)) : undefined,
    discountPrice: formData.get(`${key}[discountPrice]`) ? Number(formData.get(`${key}[discountPrice]`)) : undefined
  }
}

