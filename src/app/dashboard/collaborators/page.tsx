import React from 'react'

import { Button } from '@components/ui'
import { CollaboratorsList } from './_components'
import { FilterButton, Header, Search } from '@components/features/dashboard'

export default function CollaboratorsPage() {
  return (
    <div className="w-full h-auto">
      <Header title='Collaborators'>
        <FilterButton />

        <div className='w-[17.5rem]'>
          <Search
            label="Search Collaborator"
            action='/dashboard/collaborator'
            placeholder="Search Collaborator"
          />
        </div>

        <Button
          as={'link'}
          href={'/dashboard/collaborators/new'}
          rounded='sm'
        >
          Add New
        </Button>
      </Header>

      <div className="w-full">
        <CollaboratorsList />
      </div>
    </div>
  )
}
