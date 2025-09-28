import React from 'react'
import { SearchIcon } from 'lucide-react'

import { Input } from '@components/ui'
import { Header } from '@components/features/dashboard'
import { RegionsList, AddNewRegion } from './_components'

export default function RegionPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Region'>
        <div className='w-[17.5rem]'>
          <Input
            name='seach'
            placeholder="Search Region"
            aria-label="Search Region"
            startContent={<SearchIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <AddNewRegion />
      </Header>

      {/* Page content */}
      <div className="w-full">
        <RegionsList />
      </div>
    </div>
  )
}
