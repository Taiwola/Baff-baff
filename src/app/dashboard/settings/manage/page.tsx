import React from 'react'
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import AddNewAdmin from './AddNewAdmin';
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'
import { getUsers } from '@actions/users.action';

import RemoveAccessButton from './RemoveAccessButton'

export default async function ManageAdminPage() {
  const { items } = await getUsers({ role: 'admin' })

  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2.5'>
        <Link href={'/dashboard/settings'}>
          <ArrowLeftIcon className='w-6 h-6 text-brand-dark' />
        </Link>
        
        <BreadCrumbs separator='/' items={breadcrumbsItems} />
      </div>

      <div className='flex flex-col justify-start items-start w-full gap-6 mt-6 mb-7.5'>
        {items.map((admin) => (
          <div key={admin.id} className='flex justify-between items-center w-full'>
            <p>{admin.fullName}</p>
            <RemoveAccessButton admin={admin} />
          </div>
        ))}
      </div>

      <AddNewAdmin />
    </div>
  )
}

const breadcrumbsItems: BreadCrumbItemType[] = [
   {
      label: 'Settings',
      href: '/dashboard/settings',
      isDisabled: false,
      isCurrent: false
   },
   {
      label: 'Manage Admins',
      href: '/dashboard/admins',
      isDisabled: false,
      isCurrent: true
   },
]
