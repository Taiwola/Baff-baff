'use client'

import React from 'react'
import { Checkbox } from '@heroui/react'

export default function TermsAndCondition() {
   return (
      <div className='w-full flex justify-end items-center mt-[-10px] gap-0.5 p-0'>
         <Checkbox name='termsAndCondition' className='w-4.5 h-4.5 p-0' />
         <span className='text-xs text-black text-wrap font-medium'>By registering, you agree to our Terms & Conditions and Privacy Policy</span>
      </div>
   )
}
