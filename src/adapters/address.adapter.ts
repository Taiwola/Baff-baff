import { IAddress } from '@models/address.model'
import { paginate } from '@utils/pagination'

export function adaptAddress(data: IAddress): Address {
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

export function adaptAddresses({ data, page, pageSize }: { data: IAddress[]; page: number; pageSize: number }): Pagination<Address> {
  return paginate({ data: data.map(adaptAddress), page, pageSize })
}
