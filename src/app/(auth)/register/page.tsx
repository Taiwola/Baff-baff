import React from 'react'
import { RegisterForm } from './_components'

export default function RegisterPage() {

   return (
      <div className='w-full h-full mx-auto'>
         <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            CREATE ACCOUNT
         </h1>
         <RegisterForm />
      </div>
   )
}
