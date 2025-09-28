import React from 'react'
import { FilterButton, Header } from '@components/features/dashboard'
import MaterialsList from './_components/MaterialsList'
import AddButton from './_components/AddButton'

export default function MaterialsPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Materials'>
        <FilterButton />
        <AddButton />
      </Header>

      {/* Page content */}
      <div className="w-full">
        <MaterialsList />
      </div>
    </div>
  )
}
