'use server'

import CategoryModel, { ICategories } from '@models/categories.model'
import { CreateCategoryDto, updateCategoryDto } from '@validations/category'
import { FilterQuery } from 'mongoose'

export async function createCategory(data: CreateCategoryDto): Promise<ICategories> {
  const category = new CategoryModel({
    ...data
  })

  await category.save()
  return category
}

export async function getAllCategories(limit: number): Promise<ICategories[]> {
  return await CategoryModel.find().limit(limit)
}

export async function getCategoryById(id: string): Promise<ICategories | null> {
  return await CategoryModel.findById(id)
}

export async function getCategoryByFilter(filter: FilterQuery<ICategories>): Promise<ICategories | null> {
  return await CategoryModel.findOne(filter)
}

export async function updateCategory(id: string, data: updateCategoryDto): Promise<ICategories | null> {
  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { $set: data }, { new: true })
  return updatedCategory
}

export async function deleteCategory(id: string): Promise<ICategories | null> {
  return await CategoryModel.findByIdAndDelete(id)
}
