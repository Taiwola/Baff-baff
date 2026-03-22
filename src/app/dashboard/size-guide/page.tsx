import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { TableSkeleton } from '@components/ui'
import { Header } from '@components/features/dashboard'
import { AddNewSizeGuide, SizeGuideList } from './_component'
import { getSizeGuides } from '@actions/size-guide.actions'

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Manage men\'s and women\'s size guides.',
}

type Props = {
  searchParams: Promise<{ gender?: 'men' | 'women' }>
}

export default async function SizeGuidePage({ searchParams }: Props) {
  const { gender } = await searchParams
  const promise =  getSizeGuides(gender)

  return (
    <div className="w-full h-auto">
      <Header title="Size Guide">
        <AddNewSizeGuide />
      </Header>

      <div className="w-full">
        <Suspense fallback={<TableSkeleton columns={3} rows={5} />} key={gender}>
          <SizeGuideList promise={promise} />
        </Suspense>
      </div>
    </div>
  )
}