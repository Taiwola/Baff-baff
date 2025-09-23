import React from 'react'
import { Header } from '@components/features/dashboard'
import MaterialsList from './_components/MaterialsList'
import FilterButton from './_components/FilterButton'
import AddButton from './_components/AddButton'

export default function MaterialsPage() {
  return (
    <div className="w-full h-full p-4">
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
