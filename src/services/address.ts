import AddressModel, { IAddress } from '@models/address.model'
import { CreateAddressDto } from '@validations/address/create-address.validation'
import { UpdateAddressDto } from '@validations/address/update-address.validation'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createAddress(data: CreateAddressDto, session?: ClientSession): Promise<IAddress> {
  const Addresss = new AddressModel({
    ...data
  })

  await Addresss.save({ session })
  return Addresss
}

export async function getAllAddresss(filter?: FilterQuery<AddressFilter>): Promise<IAddress[]> {
  return await AddressModel.find(filter || {}).limit(filter?.limit)
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
