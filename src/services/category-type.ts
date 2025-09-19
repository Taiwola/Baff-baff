'use server'

import CategoryTypeModel, { ICategoryType } from '@models/category.type.model'
import { CreateCategoryTypeDto } from '@utils/validation/category-type'
import { UpdateCategoryTypeDto } from '@utils/validation/category-type/update.category-type.validation'
import { FilterQuery } from 'mongoose'

export async function createCategoryType(data: CreateCategoryTypeDto): Promise<ICategoryType> {
  const category = new CategoryTypeModel({
    ...data
  })

  await category.save()
  return category
}

export async function getAllCategoryTypes(): Promise<ICategoryType[]> {
  return await CategoryTypeModel.find()
}

export async function getCategoryTypeById(id: string): Promise<ICategoryType | null> {
  return await CategoryTypeModel.findById(id)
}

export async function getCategoryTypeByFilter(filter: FilterQuery<ICategoryType>): Promise<ICategoryType | null> {
  return await CategoryTypeModel.findOne(filter)
}

export async function updateCategoryType(id: string, data: UpdateCategoryTypeDto): Promise<ICategoryType | null> {
  const updatedCategory = await CategoryTypeModel.findByIdAndUpdate(id, { $set: data }, { new: true })
  return updatedCategory
}

export async function deleteCategoryType(id: string): Promise<ICategoryType | null> {
  return await CategoryTypeModel.findByIdAndDelete(id)
}
