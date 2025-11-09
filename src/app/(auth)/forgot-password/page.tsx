import React from 'react'

import ForgotPasswordForm from './ForgotPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password',
 description: 'Reset your password if you have forgotten it.',
}

export default function ForgotPasswordPage() {

   return (
      <div className='w-full h-full mx-auto mt-5'>
         <h1 className='text-3xl text-center mb-7.5'>Forgot Password</h1>
         <ForgotPasswordForm />
      </div>
   )
}
