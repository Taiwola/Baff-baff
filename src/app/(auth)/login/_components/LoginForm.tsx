'use client'

import Image from 'next/image'
import React, { useActionState, useEffect } from 'react'

import { Button, Input } from '@components/ui'

import { useToast } from '@hooks/useToast'
import { LoginFormState } from '@validations/auth'
import GoogleIcon from '@assets/svg/google-icon.svg'
import { googleLogin, login } from '@actions/auth.action'

const initialState: LoginFormState = {
   values: {
      email: '',
      password: ''
   },
   error: '',
   errors: {}
}

export default function LoginForm() {
   const { error: toast } = useToast()
   const [{ errors, values, error }, action, pending] = useActionState(login, initialState)

   useEffect(() => {
      if (error) {
         toast({ description: error })
      }
   }, [toast, error]);

   return (
      <form action={action} className='grid grid-cols-1 gap-5'>
         <Input
            name='email'
            label='Email Address'
            type='email'
            value={values.email}
            error={errors.email}
         />

         <Input
            name='password'
            label='Password'
            type='password'
            value={values.password}
            error={errors.password}
         />

         <div className='w-full flex justify-end items-center -mt-2.5'>
            <Button
               as={'link'}
               href={'/forgot-password'}
               className='bg-transparent text-brand-dark text-md w-max p-0 text-end hover:bg-transparent hover:text-foreground'
            >
               Forgot Password?
            </Button>
         </div>

         <Button rounded='md' size='md' className='bg-black mt-5'>
            {pending ? 'Loading...' : 'Login'}
         </Button>

         <div className='flex justify-center items-center mt-5'>
            <small className='text-sm text-[#464646]'>OR</small>
         </div>

         <Button rounded='md' size='md' variant='bordered' className='gap-1' type='button' onClick={googleLogin}>
            <Image
               src={GoogleIcon}
               alt='google-icon'
               style={{ width: 'auto', height: 'auto' }}
            />
            <span>Continue with Google</span>
         </Button>

         <hr className='w-full mt-5' />

         <div className='flex justify-center items-center'>
            <p className='text-[#464646] font-medium'>Don&apos;t have an Account?</p>
         </div>

         <Button
            as='link'
            size='md'
            rounded='md'
            href='/register'
            variant='bordered'
            className='gap-1 text-[#464646]'
         >
            Sign Up?
         </Button>
      </form>
   )
}