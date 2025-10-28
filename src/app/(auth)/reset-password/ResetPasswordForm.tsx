'use client'

import { useSearchParams } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'

import { Button, Input } from '@components/ui'

import { useToast } from '@hooks/useToast'
import { resetPassword } from '@actions/auth.action'
import { ResetPasswordFormState } from '@validations/auth'


export default function ResetPasswordForm() {
   const toast = useToast()
   const searchParams = useSearchParams()

   const initialState: ResetPasswordFormState = {
      values: {
         token: searchParams.get('token') || '',
         password: '',
         confirmPassword: ''
      },
      error: '',
      errors: {}
   }

   const [{ error, errors, values }, action, pending] = useActionState(resetPassword, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ title: 'Reset Password Failed', description: error })
      }
   }, [toast, error]);

   return (
      <form action={action} className='grid grid-cols-1 gap-5'>
         <Input
            name='password'
            label='Password'
            type='password'
            value={values.password}
            error={errors.password}
         />

         <Input
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            value={values.confirmPassword}
            error={errors.confirmPassword}
         />

         <Button
            rounded='md'
            size='md'
            className='bg-black'
         >
            {pending ? 'Loading...' : 'Reset Password'}
         </Button>
      </form>
   )
}
