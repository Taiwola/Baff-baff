import { FilterQuery, ClientSession } from 'mongoose'

import AddressModel, { IAddress } from '@models/address.model'
import { UpdateAddressDto } from '@validations/address/update-address.validation'

export async function createAddress(data: Partial<IAddress>, session?: ClientSession): Promise<IAddress> {
  const Addresss = new AddressModel({
    ...data
  })

  await Addresss.save({ session })
  return Addresss
}

export async function getAllAddresss({ limit, page = 1, ...filter }: FilterQuery<AddressFilter>): Promise<IAddress[]> {
  const query = AddressModel.find(filter)

  if (limit) {
    const skip = (page - 1) * limit
    query.limit(limit).skip(skip)
  }

  return await query
}

export async function getOneAddressById(id: string): Promise<IAddress | null> {
  return await AddressModel.findById(id)
}

export async function getAddressByFilter(filter: FilterQuery<IAddress>): Promise<IAddress | null> {
  return await AddressModel.findOne(filter)
}

export async function updateAddress(id: string, data: UpdateAddressDto, session?: ClientSession): Promise<IAddress | null> {
  const Address = await AddressModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Address
}

export async function deleteAddress(id: string): Promise<IAddress | null> {
  return await AddressModel.findByIdAndDelete(id)
}
