import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { AddressList, EmptyAddress } from './_components'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'
import { Address } from '@models/address.model'

export default function Addresses() {
  return (
    <main className='app-container py-5 md:py-12 font-montserrat'>
      <div className='w-full hidden md:block mb-12'>
        <BreadCrumbs
          separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
          items={breadcrumbs}
        />
      </div>

      {addresses.length <= 0 ? <EmptyAddress /> : <AddressList addresses={addresses} />}
    </main>
  )
}

const addresses: Address[] = [
  {
    id: "1",
    fullName: "Tobi Olanitori",
    email: "tobi.olanitori@example.com",
    phoneNumber: "+2348012345678",
    altPhoneNumber: "+2348098765432",
    city: "Lagos",
    state: "Lagos",
    address: "12A Adeola Odeku Street, Victoria Island",
    active: true,
    createdAt: "2024-11-15T10:30:00Z",
  },
  {
    id: "2",
    fullName: "Adaobi Nwosu",
    email: "adaobi.nwosu@example.com",
    phoneNumber: "+2348023456789",
    altPhoneNumber: "+2348187654321",
    city: "Enugu",
    state: "Enugu",
    address: "45 Zik Avenue, New Haven",
    active: false,
    createdAt: "2024-12-01T14:45:00Z",
  },
  {
    id: "3",
    fullName: "Emeka Okafor",
    email: "emeka.okafor@example.com",
    phoneNumber: "+2348034567890",
    altPhoneNumber: "+2348176543210",
    city: "Abuja",
    state: "FCT",
    address: "10 Aminu Kano Crescent, Wuse II",
    active: false,
    createdAt: "2025-01-10T09:15:00Z",
  },
  {
    id: "4",
    fullName: "Zainab Bello",
    email: "zainab.bello@example.com",
    phoneNumber: "+2348045678901",
    altPhoneNumber: "+2348165432109",
    city: "Kano",
    state: "Kano",
    address: "22 Abdullahi Bayero Road, Tarauni",
    active: false,
    createdAt: "2025-02-05T16:20:00Z",
  },
  {
    id: "5",
    fullName: "Chinedu Eze",
    email: "chinedu.eze@example.com",
    phoneNumber: "+2348056789012",
    altPhoneNumber: "+2348154321098",
    city: "Port Harcourt",
    state: "Rivers",
    address: "8 Trans-Amadi Industrial Layout",
    active: false,
    createdAt: "2025-03-01T11:05:00Z",
  },
]



const breadcrumbs: BreadCrumbItemType[] = [
  {
    label: 'HOME',
    href: '/',
    isCurrent: false,
    isDisabled: false
  },
  {
    label: 'Address Book',
    href: '/addresses',
    isCurrent: true,
    isDisabled: false
  },
]