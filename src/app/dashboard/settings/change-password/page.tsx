import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { ChangePasswordForm } from '@components/features/auth'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings - Change Password',
  description: 'Manage your account settings and preferences.',
}

export default function ChangePasswordPage() {
  return (
    <div className='w-full'>
      <div className='flex justify-start items-center gap-2.5'>
        <Link href={'/dashboard/settings'}>
          <ArrowLeftIcon className='w-6 h-6 text-brand-dark' />
        </Link>
        <BreadCrumbs separator='/' items={breadcrumbsItems} />
      </div>

      <div className='w-full md:w-3/5 mx-auto flex flex-col items-center justify-start mt-15'>
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
