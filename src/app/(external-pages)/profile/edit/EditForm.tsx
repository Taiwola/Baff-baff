'use client'

import React, { useActionState, useEffect } from 'react'

import { Button, Input } from '@components/ui'
import { updateUser } from '@actions/users.action'
import { UpdateUserFormState } from '@validations/users/update-user.validation'
import { useToast } from '@hooks/useToast'

type Props = {
   user: User
}

export default function EditForm({ user }: Props) {
   const toast = useToast()
   const updateUserWithId = updateUser.bind(null, user.id)

   const initialState: UpdateUserFormState = {
      errors: {},
      error: '',
      values: {
         firstName: user.firstName,
         lastName: user.lastName,
         phoneNumber: user.phoneNumber,
         gender: user.gender,
      }
   }

   const [{ errors, error, values }, action, isPending] = useActionState(updateUserWithId, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
      }
   }, [error, toast])


   return (
      <form action={action} className="flex flex-col gap-6 mx-auto w-full md:max-w-[85%]">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
               name="firstName"
               label="First Name"
               value={values.firstName}
               error={errors.firstName}
            />
            <Input
               name="lastName"
               label="Last Name"
               value={values.lastName}
               error={errors.lastName}
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
               name="phoneNumber"
               label="Phone Number"
               value={values.phoneNumber}
               error={errors.phoneNumber}
            />

            <Input
               name="gender"
               label="Gender"
               type="select"
               options={[
                  { key: 'Male', label: 'Male' },
                  { key: 'Female', label: 'Female' }
               ]}
               value={values.gender}
               error={errors.gender}
            />
         </div>

         <Button
            type="submit"
            className="w-full bg-black text-white rounded-[10px] py-3"
         >
            {isPending ? 'Saving....' : 'Save Changes'}
         </Button>
      </form>
   )
}
