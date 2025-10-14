'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@components/ui'

type Props = {
   address: Address | null
}

export default function DetailsButton({ address }: Props) {
   const pathname = usePathname()

   return (
      <Button
         disabled={!address || pathname === '/checkout/shipping/change' ? true : false}
         size="md"
         fullWidth
         className="bg-black disabled:bg-[#B5B5B5]"
      >
         Proceed to Payment
      </Button>
   )
}
