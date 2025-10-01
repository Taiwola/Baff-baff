import { IMaterial } from '@models/material.model'

export function adaptMaterial(data: IMaterial): Material {
  return {
    id: data.id,
    name: data.name,
    stock: data.stock,
    image: data.image,
    status: data.stock > 0 ? 'In Stock' : 'Out of Stock',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptMaterials(data: IMaterial[]): Material[] {
  return data.map(adaptMaterial)
}
