'use client'

import React from 'react'
import { SearchIcon } from 'lucide-react'
import { DatePicker, Input } from '@components/ui'

export default function Filters() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
      {/* Date Picker */}
      <div className="w-full">
        <DatePicker />
      </div>

      {/* Search input */}
      <div className="w-full">
        <Input
          name="search"
          placeholder="Search users"
          aria-label="Search users"
          startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
        />
      </div>
    </div>
  )
}
