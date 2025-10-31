'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { ChevronDownIcon } from 'lucide-react'
import { UserIcon } from '@heroicons/react/24/outline'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react'

type Props = {
   name: string
}

export default function User({ name }: Props) {
   const [open, setOpen] = useState(false)

   async function handleLogout() {
      signOut({ redirectTo: '/login' })
   }

   return (
      <div className="flex justify-start items-center">
         <Dropdown placement="bottom-start" onOpenChange={setOpen}>
            <DropdownTrigger className="cursor-pointer">
               <div
                  className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors 
              ${open ? 'bg-gray-100' : 'hover:bg-gray-50'}
            `}
               >
                  {/* Avatar circle */}
                  <div className="w-11 h-11 border border-foreground rounded-full flex justify-center items-center">
                     <UserIcon className="text-brand-dark w-6 h-6" />
                  </div>

                  {/* Username */}
                  <p className="font-medium text-brand-dark">{name}</p>

                  {/* Chevron with rotation */}
                  <ChevronDownIcon
                     className={`text-brand-dark w-6 h-6 transition-transform duration-300 
                ${open ? 'rotate-180' : 'rotate-0'}
              `}
                  />
               </div>
            </DropdownTrigger>

            {/* Menu */}
            <DropdownMenu
               aria-label="User Actions"
               variant="flat"
               className="bg-white w-[150px] rounded-sm border border-foreground shadow-md transition-all"
            >
               <DropdownItem key="logout" className="text-red-600" onClick={handleLogout}>
                  Log Out
               </DropdownItem>
            </DropdownMenu>
         </Dropdown>
      </div>
   )
}
