import React, { Suspense } from 'react'

import { TableSkeleton } from '@components/ui'
import { RegionsList, AddNewRegion } from './_components'
import { Header, Search } from '@components/features/dashboard'

import { getRegions } from '@actions/regions.action'
import { Metadata } from 'next'

type Props = {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  title: 'Region',
  description: 'Manage and explore your regions effectively.',
}

export default async function RegionPage({ searchParams }: Props) {
  const { page } = await searchParams
  const promise = getRegions({ page })

  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Region'>
        <div className='w-full md:w-[17.5rem]'>
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
        <Suspense fallback={<TableSkeleton columns={3} rows={5} />}>
          <RegionsList promise={promise} />
        </Suspense>
      </div>
    </div>
  )
}
