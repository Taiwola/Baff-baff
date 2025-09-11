import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { BreadCrumbItemType, BreadCrumbs, Button, Input } from '@components/ui'

export default function ProfileEdit() {
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block mb-12'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={breadcrumbs}
            />
         </div>

         <section className='w-full'>
            <form className="flex flex-col gap-6 mx-auto w-full md:max-w-[85%]">
               {/* Two-column layout */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                     name="firstName"
                     label="First Name"
                     value={''}
                  />
                  <Input
                     name="lastName"
                     label="Last Name"
                     value={''}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                     name="email"
                     label="Email"
                     value={''}
                  />
                  <Input
                     name="phoneNumber"
                     label="Phone Number"
                     value={''}
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                     name="gender"
                     label="Gender"
                     type="select"
                     options={[
                        { key: 'male', label: 'Male' },
                        { key: 'female', label: 'Female' },
                        { key: 'other', label: 'Other' },
                     ]}
                  />
               </div>

               <Button
                  type="submit"
                  className="w-full bg-black text-white rounded-[10px] py-3"
               >
                  Save Changes
               </Button>
            </form>
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
