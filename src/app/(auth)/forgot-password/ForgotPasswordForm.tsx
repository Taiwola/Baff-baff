'use client'

import React, { useActionState } from 'react'

import { Button, Input } from '@components/ui'
import { forgotPassword } from '@actions/auth.action'
import { ForgotPasswordFormState } from '@validations/auth'

const initialState: ForgotPasswordFormState = {
   values: {
      email: ''
   },
   error: '',
   errors: {}
}

export default function ForgotPasswordForm() {
   const [{ errors, values }, action, pending] = useActionState(forgotPassword, initialState)

   return (
      <form action={action} className='grid grid-cols-1 gap-5'>
         <Input
            name='email'
            label='Email Address'
            type='email'
            value={values.email}
            error={errors.email}
         />

         <Button
            rounded='md'
            size='md'
            className='bg-black'
         >
            {pending ? 'Loading...' : 'Proceed'}
         </Button>
      </form>
   )
}
