import { Address } from '@index'
import { IAddress } from '@models/address.model'

export function transformAddress(data: IAddress): Address {
  return {
    id: data._id?.toString() || data.id,
    userId: data.userId.toString(),
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    altPhoneNumber: data.altPhoneNumber,
    city: data.city,
    state: data.state,
    address: data.address,
    active: data.active,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformAddresses(data: IAddress[]): Address[] {
  return data.map(transformAddress)
}
