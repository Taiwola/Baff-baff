import React from 'react'

import { Button, Input } from '@components/ui'

export default function ForgotPasswordPage() {
   async function action() {
      'use server'
   }

   return (
      <div className='w-full h-full mx-auto mt-5'>
         <h1 className='text-3xl text-center mb-7.5'>Forgot Password</h1>

         <form action={action} className='grid grid-cols-1 gap-5'>
            <Input name='email' label='Email Address' type='email' />
            <Button rounded='md' size='md' className='bg-black'>Proceed</Button>
         </form>
      </div>
   )
}
