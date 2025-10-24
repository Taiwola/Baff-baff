'use client'

import React from 'react'
import { Checkbox } from '@heroui/react'

type Props = {
   defaultValue?: boolean
}

export default function TermsAndCondition({ defaultValue = false }: Props) {
   const [checked, setChecked] = React.useState(defaultValue)

   return (
      <div className="w-full flex flex-row sm:justify-center sm:items-center gap-2 sm:gap-1 mt-[-10px]">
         <Checkbox
            isSelected={checked}
            onValueChange={setChecked}
            className="w-4.5 h-4.5 p-0"
         />
         <label htmlFor="termsAndCondition" className="text-xs sm:text-sm text-black font-medium text-center sm:text-left">
            By registering, you agree to our Terms & Conditions and Privacy Policy
         </label>

         {/* Hidden input to pass value to FormData */}
         <input type="hidden" name="termsAndCondition" value={checked ? "true" : ""} />
      </div>
   )
}
