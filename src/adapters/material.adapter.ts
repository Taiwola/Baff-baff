import { IMaterial } from '@models/material.model'

export function adaptMaterial(data: IMaterial): Material {
  return {
    id: data.id,
    name: data.name,
    stock: data.stock,
    image: data.image,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptMaterials(data: IMaterial[]): Material[] {
  return data.map(adaptMaterial)
}
