import React from 'react'

import Filters from './Filters'
import UsersList from './UsersList'
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
        <UsersList />
      </div>
    </div>
  )
}
