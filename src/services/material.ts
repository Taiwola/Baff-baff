'use server'
import MaterialModel, { IMaterial } from '@models/material.model'
import { CreateMaterialDto, UpdateMaterialDto } from '@utils/validation/material'

export async function createMaterial(data: CreateMaterialDto): Promise<IMaterial> {
  const newMaterial = new MaterialModel({
    ...data
  })

  await newMaterial.save()
  return newMaterial
}

export async function getMaterialById(id: string): Promise<IMaterial | null> {
  return MaterialModel.findById(id)
}

export async function getAllMaterials(): Promise<IMaterial[]> {
  return MaterialModel.find()
}

export async function updateMaterial(id: string, updateData: UpdateMaterialDto): Promise<IMaterial | null> {
  return MaterialModel.findByIdAndUpdate(id, updateData, { new: true })
}

export async function deleteMaterial(id: string): Promise<IMaterial | null> {
  return MaterialModel.findOneAndDelete({ _id: id })
}
