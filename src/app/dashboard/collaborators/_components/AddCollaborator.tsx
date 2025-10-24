'use client'

import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
import CollaboratorForm from './CollaboratorForm'
import { createCollaborator } from '@actions/collaborators.action'
import { CreateCollaboratorFormState } from '@validations/collaborators'

const initialState: CreateCollaboratorFormState = {
   errors: {},
   error: '',
   values: {
      name: '',
      image: '',
      instagram: '',
      x: '',
      tikTok: '',
      facebook: '',
   }
}

export default function AddCollaborator() {
   const toast = useToast()
   const [{ values, errors, error }, action, pending] = useActionState(createCollaborator, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])

   return (
      <CollaboratorForm
         action={action}
         initialState={values}
         errors={errors}
         pending={pending}
      />
   )
}
