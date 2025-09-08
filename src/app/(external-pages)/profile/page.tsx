import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'
import ProfileSection from './ProfileSection'

export default function Profile() {
  return (
    <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         <section className='mx-auto w-full md:max-w-[85%] flex flex-col gap-8 justify-center items-start font-montserrat'>
              <ProfileSection />
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
      isCurrent: true,
      isDisabled: false
   },
]