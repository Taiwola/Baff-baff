'use client'

import React, { useActionState } from 'react'
import { Button, Input } from '@components/ui'
import { ChangePasswordFormState } from '@validations/auth'
import { changePassword } from '@actions/auth.action'

const initialState: ChangePasswordFormState = {
   values: {
      oldPassword: '',
      password: '',
      confirmPassword: ''
   },
   error: '',
   errors: {}
}

export default function ChangePasswordForm() {
   const [{ errors, values }, action, pending] = useActionState(changePassword, initialState)

   return (
      <form action={action} className='w-full flex flex-col justify-start items-start gap-5'>
         <Input
            name='oldPassword'
            label='Old Password'
            type='password'
            value={values.oldPassword}
            error={errors.oldPassword}
         />
         <Input
            name='password'
            label='New Password'
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
            type='submit'
            size='lg'
            fullWidth
            className='rounded-[2.8125rem]'
         >
            {pending ? 'Loading...' : 'Confirm'}
         </Button>
      </form>
   )
}
