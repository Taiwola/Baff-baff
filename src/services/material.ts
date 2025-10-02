'use server'
import MaterialModel, { IMaterial } from '@models/material.model'
import { CreateMaterialDto, UpdateMaterialDto } from '@validations/material'
import { ClientSession } from 'mongoose'

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

export async function getAllMaterials(limit: number): Promise<IMaterial[]> {
  return MaterialModel.find().limit(limit)
}

export async function updateMaterial(id: string, updateData: UpdateMaterialDto, session?: ClientSession): Promise<IMaterial | null> {
  return MaterialModel.findByIdAndUpdate(id, updateData, { new: true, session })
}

export async function deleteMaterial(id: string): Promise<IMaterial | null> {
  return MaterialModel.findOneAndDelete({ _id: id })
}
