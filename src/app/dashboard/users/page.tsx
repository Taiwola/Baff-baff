import React, { Suspense } from 'react'

import Filters from './Filters'
import UsersList from './UsersList'
import { TableSkeleton } from '@components/ui'
import { Header } from '@components/features/dashboard'

export default function UsersPage() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Users'>
        <Filters />
      </Header>

      {/* Page content */}
      <div className="w-full">
        <Suspense fallback={<TableSkeleton columns={6} rows={6} />}>
          <UsersList />
        </Suspense>
      </div>
    </div>
  )
}
