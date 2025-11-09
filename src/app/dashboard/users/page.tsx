import React, { Suspense } from 'react'

import Filters from './Filters'
import UsersList from './UsersList'
import { TableSkeleton } from '@components/ui'
import { Header } from '@components/features/dashboard'
import { getUsers } from '@actions/users.action'
import { Metadata } from 'next'

type Props = {
  searchParams: Promise<{ page?: string }>;
}



export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage and explore your users effectively.',
}

export default async function UsersPage({ searchParams }: Props) {
  const { page } = await searchParams
  const pageNumber = page ? parseInt(page, 10) : undefined
  const promise = getUsers({ page: pageNumber })

  return (
    <div className="w-full h-auto">
      {/* Header */}
      <Header title='Users'>
        <Filters />
      </Header>

      {/* Page content */}
      <div className="w-full">
        <Suspense fallback={<TableSkeleton columns={6} rows={6} />}>
          <UsersList promise={promise} />
        </Suspense>
      </div>
    </div>
  )
}
