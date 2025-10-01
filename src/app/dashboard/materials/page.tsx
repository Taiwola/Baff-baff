import React, { Suspense } from 'react'

import AddButton from './_components/AddButton'
import MaterialsList from './_components/MaterialsList'

import { TableSkeleton } from '@components/ui'
import { FilterButton, Header } from '@components/features/dashboard'

import { getMaterials } from '@actions/materials.action'

export default async function MaterialsPage() {
  const promise = getMaterials()

  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Materials'>
        <FilterButton />
        <AddButton />
      </Header>

      {/* Page content */}
      <div className="w-full">
        <Suspense fallback={<TableSkeleton columns={3} rows={5} />}>
          <MaterialsList promise={promise} />
        </Suspense>
      </div>
    </div>
  )
}
