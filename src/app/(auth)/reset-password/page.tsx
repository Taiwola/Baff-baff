import React from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'

import { Button, Input } from '@components/ui'

export default function page() {
   async function action() {
      'use server'
   }

   return (
      <div className='w-full h-full mx-auto mt-5'>
         <h1 className='text-3xl text-center mb-7.5'>Reset Password</h1>

         <form action={action} className='grid grid-cols-1 gap-5'>
            <Input name='password' label='Password' type='password' endContent={<EyeIcon className='w-6 h-6 text-grey-2 icon-button' />} />
            <Input name='confirmPassword' label='Confirm Password' type='password' endContent={<EyeIcon className='w-6 h-6 text-grey-2 icon-button' />} />
            <Button rounded='md' size='md' className='bg-black'>Reset Password</Button>
         </form>
      </div>
   )
}
