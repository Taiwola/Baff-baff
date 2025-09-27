'use client'

import React from 'react'

import { SearchIcon } from 'lucide-react'
import { DatePicker, Input } from '@components/ui'

export default function Filters() {
   return (
      <>
         <DatePicker />

         {/* Search input */}
         <div className='w-[17.5rem]'>
            <Input
               name='seach'
               placeholder="Search users"
               aria-label="Search users"
               startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
            />
         </div>
      </>
   )
}
