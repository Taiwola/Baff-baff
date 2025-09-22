'use client'

import React from 'react'

import { SearchIcon } from 'lucide-react'
import { DatePicker, Input } from '@components/ui'

export default function Filters() {
   return (
      <>
         <DatePicker />

         {/* Search input */}
         <Input
            name='seach'
            placeholder="Search users"
            aria-label="Search users"
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
         // className="border border-[#121212] py-2.5 rounded-[8px] text-sm text-[#121212] w-full h-10"
         />
      </>
   )
}
