import { IMaterial } from '@models/material.model'

export function transformMaterial(data: IMaterial): Material {
  return {
    id: data.id,
    name: data.name,
    stock: data.stock,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformMaterials(data: IMaterial[]): Material[] {
  return data.map(transformMaterial)
}
