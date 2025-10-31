'use client'

import React, { useActionState, useEffect } from 'react'

import { useToast } from '@hooks/useToast'
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
   const toast = useToast()
   const [{ error, success, errors, values }, action, pending] = useActionState(forgotPassword, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ title: 'Forgot Password Failed', description: error })
      }
   }, [toast, error]);

   useEffect(() => {
      if (success) {
         toast.success({ title: 'Email Sent', description: 'Check  your Email' })
      }
   }, [toast, success]);

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
