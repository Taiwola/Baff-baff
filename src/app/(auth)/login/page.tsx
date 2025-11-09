import React from 'react'
import { LoginForm } from './_components'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Login',
   description: 'Login to your account to access exclusive features and services.',
}

export default function LoginPage() {
   return (
      <div className='w-full h-full mx-auto'>
         <h1 className='text-3xl text-center mb-7.5'>WELCOME BACK</h1>
         <LoginForm />
      </div>
   )
}
