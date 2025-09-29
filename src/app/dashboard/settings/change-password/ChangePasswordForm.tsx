import React from 'react'
import { Button, Input } from '@components/ui'

export default function ChangePasswordForm() {
   async function handleSubmit() {
      'use server'
   }

   return (
      <form action={handleSubmit} className='w-full flex flex-col justify-start items-start gap-5'>
         <Input
            name='oldPassword'
            label='Old Password'
            type='password'
         />
         <Input
            name='newPassword'
            label='New Password'
            type='password'
         />
         <Input
            name='confirmPassword'
            label='Confirm Password'
            type='password'
         />

         <Button
            type='submit'
            size='lg'
            fullWidth
            className='rounded-[2.8125rem]'
         >
            Confirm
         </Button>
      </form>
   )
}
