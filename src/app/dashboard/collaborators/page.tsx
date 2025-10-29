import React from 'react'

import { Button } from '@components/ui'
import { CollaboratorsList } from './_components'
import { Header, Search } from '@components/features/dashboard'
import { getCollaborators } from '@actions/collaborators.action'

type Props = {
  searchParams: Promise<CollaboratorFilter>;
}

export default async function CollaboratorsPage({ searchParams }: Props) {
  const query = await searchParams
  const promise = getCollaborators(query)

  return (
    <div className="w-full h-auto">
      <Header title='Collaborators'>

        <div className='w-full md:w-[17.5rem]'>
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
          className='w-full md:w-auto'
        >
          Add New
        </Button>
      </Header>

      <div className="w-full">
        <CollaboratorsList promise={promise} />
      </div>
    </div>
  )
}
