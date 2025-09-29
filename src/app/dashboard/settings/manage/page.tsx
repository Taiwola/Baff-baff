import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import AddNewAdmin from './AddNewAdmin';
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function ManageAdminPage() {
   async function handleRemoveAccess(id: number) {
      'use server'
      console.log(id);
   }

   return (
      <div className='w-full'>
         <div className='flex justify-start items-center gap-2.5'>
            <ArrowLeftIcon className='w-6 h-6 text-brand-dark' />
            <BreadCrumbs separator='/' items={breadcrumbsItems} />
         </div>

         <div className='flex flex-col justify-start items-start w-full gap-6 mt-6 mb-7.5'>
            {[...Array(5).keys()].map((idx) => (
               <div key={idx} className='flex justify-between items-center w-full'>
                  <p>kponanefubara@outlook.com</p>

                  <form action={handleRemoveAccess.bind(null, idx)}>
                     <button className='text-sm text-danger font-medium text-button' type='submit'>Remove Access</button>
                  </form>
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
