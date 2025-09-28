import React from 'react'

import { RegionsList, AddNewRegion } from './_components'
import { Header, Search } from '@components/features/dashboard'

export default function RegionPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Region'>
        <div className='w-[17.5rem]'>
          <Search
            label="Search Region"
            action='/dashboard/region'
            placeholder="Search Region"
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
