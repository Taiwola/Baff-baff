import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import EditForm from './EditForm'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'
import { verifySession } from '@lib/dal'
import { notFound } from 'next/navigation'
import { getUser } from '@actions/users.action'

export default async function ProfileEdit() {
   const auth = await verifySession()
   if(!auth) return notFound()

   const user = await getUser(auth.userId)
   if(!user) return notFound()
   
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         <section className='w-full'>
           <EditForm user={user} />
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
      label: 'Edit Profile',
      href: '/profile/edit',
      isCurrent: true,
      isDisabled: false
   },
]
