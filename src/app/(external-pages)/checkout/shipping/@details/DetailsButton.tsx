'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@components/ui'
import { checkout } from '@actions/carts.action'

type Props = {
   cart: Cart | null
   address: Address | null
   region: Region | null
}

export default function DetailsButton({ address, region, cart }: Props) {
   const pathname = usePathname()

   async function handleCheckout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault()
      if (!address || !region || !cart?.id) return
      await checkout({ addressId: address.id, cartId: cart.id, regionId: region.id })
   }

   return (
      <Button
         disabled={!address || !region || pathname === '/checkout/shipping/change' ? true : false}
         size="md"
         fullWidth
         className="bg-black disabled:bg-[#B5B5B5]"
         onClick={handleCheckout}
      >
         Proceed to Payment
      </Button>
   )
}
