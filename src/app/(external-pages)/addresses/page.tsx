import React, { Suspense } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { AddressList } from './_components'
import { AddressesSkeleton, BreadCrumbItemType, BreadCrumbs } from '@components/ui'

import { getAddresses } from '@actions/addresses.action'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Address Book',
  description: 'Manage your saved addresses for seamless checkout experience.',
}

export default function Addresses() {
  const addresses = getAddresses()

  return (
    <main className='app-container py-5 md:py-12 font-montserrat'>
      <div className='w-full hidden md:block mb-12'>
        <BreadCrumbs
          separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
          items={breadcrumbs}
        />
      </div>

      <Suspense fallback={<AddressesSkeleton />}>
        <AddressList promise={addresses} />
      </Suspense>
    </main>
  )
}



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