import React from 'react'
import { notFound } from 'next/navigation'

import { EditCollaborator } from '../../_components'
import { getCollaborator } from '@actions/collaborators.action'

type Props = {
   params: Promise<{ id: string }>
}

export default async function EditCollaboratorPage({ params }: Props) {
   const { id } = await params

   const collaborator = await getCollaborator(id)
   if(!collaborator) return notFound()

  return <EditCollaborator collaborator={collaborator} />
}
