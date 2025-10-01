import RegionModel, { IRegion } from '@models/region.model'
import { CreateRegionDto } from '@validations/region/create-region.validation'
import { UpdateRegionDto } from '@validations/region/update-region.validation'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createRegion(data: CreateRegionDto, session?: ClientSession): Promise<IRegion> {
  const Regions = new RegionModel({
    ...data
  })

  await Regions.save({ session })
  return Regions
}

export async function getAllRegions(limit: number, filter?: FilterQuery<IRegion>): Promise<IRegion[]> {
  return await RegionModel.find(filter || {}).limit(limit)
}

export async function getOneRegionById(id: string): Promise<IRegion | null> {
  return await RegionModel.findById(id)
}

export async function getRegionByFilter(filter: FilterQuery<IRegion>): Promise<IRegion | null> {
  return await RegionModel.findOne(filter)
}

export async function updateRegion(id: string, data: UpdateRegionDto, session?: ClientSession): Promise<IRegion | null> {
  const Region = await RegionModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Region
}

export async function deleteRegion(id: string): Promise<IRegion | null> {
  return await RegionModel.findByIdAndDelete(id)
}
