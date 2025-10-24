'use client'

import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
import CollaboratorForm from './CollaboratorForm'
import { updateCollaborator } from '@actions/collaborators.action'
import { UpdateCollaboratorFormState } from '@validations/collaborators'

type Props = {
   collaborator: Collaborator
}

export default function EditCollaborator({ collaborator }: Props) {
   const toast = useToast()

   const initialState: UpdateCollaboratorFormState = {
      errors: {},
      error: '',
      values: {
         name: collaborator.name,
         image: collaborator.image,
         instagram: collaborator.instagram,
         x: collaborator.x,
         tikTok: collaborator.tikTok,
         facebook: collaborator.facebook,
      }
   }

   const [{ values, errors, error }, action, pending] = useActionState(updateCollaborator.bind(null, collaborator.id), initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])

   return (
      <CollaboratorForm
         type='edit'
         action={action}
         initialState={values}
         errors={errors}
         pending={pending}
      />
   )
}
