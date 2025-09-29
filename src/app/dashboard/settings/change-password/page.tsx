import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import ChangePasswordForm from './ChangePasswordForm'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function ChangePasswordPage() {
  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2.5'>
        <ArrowLeftIcon className='w-6 h-6 text-brand-dark' />
        <BreadCrumbs separator='/' items={breadcrumbsItems} />
      </div>

      <div className='w-3/5 mx-auto flex flex-col items-center justify-start mt-15'>
        <h1 className='text-lg font-medium text-black mb-5'>Set Password</h1>
        <ChangePasswordForm />
      </div>
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
    label: 'Change Password',
    href: '/dashboard/change-password',
    isDisabled: false,
    isCurrent: true
  },
]
