'use client'

import Image from 'next/image'
import { Spinner } from '@heroui/react'
import React, { useActionState } from 'react'

import { Button, Input } from '@components/ui'
import TermsAndCondition from './TermsAndCondition'

import { register } from '@actions/auth'
import GoogleIcon from '@assets/svg/google-icon.svg'
import { RegisterFormState } from '@utils/validation/auth'

const initialState: RegisterFormState = {
  values: {
    firstName: 'Tobi',
    lastName: 'Olanitori',
    email: 'tobiolanitori@gmail.com',
    password: 'Alicemojisola1.',
    confirmPassword: 'Alicemojisola1.',
    role: 'user',
    termsAndCondition: false
  },
  error: '',
  errors: {}
}

export default function RegisterForm() {
  const [{ errors, values }, dispatch, isPending] = useActionState(register, initialState)

  return (
    <form action={dispatch} className='grid grid-cols-1 gap-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-2.5'>
        <Input
          name='firstName'
          label='First Name'
          type='text'
          value={values.firstName}
          error={errors.firstName}
        />

        <Input
          name='lastName'
          label='Last Name'
          type='text'
          value={values.lastName}
          error={errors.lastName}
        />
      </div>

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

      <Input
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        value={values.confirmPassword}
        error={errors.confirmPassword}
      />

      <TermsAndCondition defaultValue={values.termsAndCondition} />

      <Button
        rounded='md'
        size='md'
        className='bg-black mt-5'
      >
        {isPending ? <Spinner size="sm" color="default" /> : 'Sign up'}
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
        Log In
      </Button>
    </form>
  )
}
