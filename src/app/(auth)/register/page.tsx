import React from 'react'
import Image from 'next/image'
import { EyeIcon } from '@heroicons/react/24/outline'

import { Button, Input } from '@components/ui'
import { TermsAndCondition } from './_components'

import GoogleIcon from '@assets/svg/google-icon.svg'

export default function RegisterPage() {
   async function action() {
      'use server'
   }
   return (
      <div className='w-full h-full mx-auto'>
         <h1 className='text-3xl text-center mb-7.5'>CREATE ACCOUNT</h1>

         <form action={action} className='grid grid-cols-1 gap-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2.5'>
               <Input name='firstName' label='First Name' type='text' />
               <Input name='lastName' label='Last Name' type='text' />
            </div>

            <Input name='email' label='Email Address' type='email' />
            <Input name='password' label='Password' type='password' endContent={<EyeIcon className='w-6 h-6 text-grey-2 icon-button' />} />
            <Input name='confirmPassword' label='Confirm Password' type='password' endContent={<EyeIcon className='w-6 h-6 text-grey-2 icon-button' />} />

            <TermsAndCondition />

            <Button rounded='md' size='md' className='bg-black mt-5'>Sign up</Button>

            <div className='flex justify-center items-center mt-5'>
               <small className='text-sm text-[#464646]'>OR</small>
            </div>

            <Button rounded='md' size='md' variant='bordered' className='gap-1'>
               <Image src={GoogleIcon} width={24} height={24} alt='google-icon' />
               <span>Continue with Google</span>
            </Button>

            <hr className='w-full mt-5' />

            <div className='flex justify-center items-center'>
               <p className='text-[#464646] font-medium'>Already have an account?</p>
            </div>

            <Button
               as='link'
               size='md'
               rounded='md'
               href='/login'
               variant='bordered'
               className='gap-1 text-[#464646]'
            >
               Login
            </Button>
         </form>
      </div>
   )
}
