import React from 'react'
import ResetPasswordForm from './ResetPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password',
   description: 'Reset your account password securely.',
}

export default function page() {

   return (
      <div className='w-full h-full mx-auto mt-5'>
         <h1 className='text-3xl text-center mb-7.5'>Reset Password</h1>
         <ResetPasswordForm />
      </div>
   )
}
