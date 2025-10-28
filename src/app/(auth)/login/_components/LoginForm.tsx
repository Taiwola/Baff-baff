'use client'

import Image from 'next/image'
import { Spinner } from '@heroui/react'
import React, { useActionState, useEffect } from 'react'

import { login } from '@actions/auth.action'
import { Button, Input } from '@components/ui'
import { LoginFormState } from '@validations/auth'
import GoogleIcon from '@assets/svg/google-icon.svg'
import { useToast } from '@hooks/useToast'

const initialState: LoginFormState = {
   values: {
      email: '',
      password: ''
   },
   error: '',
   errors: {}
}

export default function LoginForm() {
   const toast = useToast()
   const [{ errors, values, error }, action, pending] = useActionState(login, initialState)

   useEffect(() => {
      if (error) {
         toast.error({ description: error })
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

         <div className='w-full flex justify-end items-center mt-[-10px]'>
            <Button
               as={'link'}
               href={'/forgot-password'}
               className='bg-transparent text-brand-dark text-md w-max p-0 text-end hover:bg-transparent hover:text-foreground'
            >
               Forgot Password?
            </Button>
         </div>

         <Button rounded='md' size='md' className='bg-black mt-5'>
            {pending ? <Spinner size="sm" color="default" className='animate-spin' /> : 'Login'}
         </Button>

         <div className='flex justify-center items-center mt-5'>
            <small className='text-sm text-[#464646]'>OR</small>
         </div>

         <Button rounded='md' size='md' variant='bordered' className='gap-1'>
            <Image src={GoogleIcon} width={24} height={24} alt='google-icon' />
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
