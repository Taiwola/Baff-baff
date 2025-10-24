import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { ChangePasswordForm } from '@components/features/auth'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function ChangePasswordPage() {
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         <section className='w-full md:w-[50%] mx-auto'>
            <ChangePasswordForm />
         </section>
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
      label: 'Profile Details',
      href: '/profile',
      isCurrent: false,
      isDisabled: false
   },
   {
      label: 'Change Password',
      href: '/profile/change-password',
      isCurrent: true,
      isDisabled: false
   },
]