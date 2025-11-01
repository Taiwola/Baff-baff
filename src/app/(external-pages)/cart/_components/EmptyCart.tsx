import Image from 'next/image'
import React from 'react'
import EmptyCartSvg from '@assets/svg/empty-cart.png'
import { Button } from '@components/ui'

export default function EmptyCart() {
  return (
    <div className="border border-brand-dark w-full h-91.75 rounded-[1.25rem] flex flex-col items-center justify-center gap-2.5 px-4 text-center font-poppins">
      <Image
        src={EmptyCartSvg}
        alt="Empty cart"
        width={108}
        height={110}
        className="object-contain"
      />

      <h2 className="text-2xl font-medium text-brand-dark font-poppins">
        Your bag is empty!
      </h2>

      <p className="text-lg text-brand-dark">
        Browse our categories and discover our best deals!
      </p>

      <Button as={'link'} href={'/marketplace'} className="bg-black text-white text-sm font-medium w-53">
        Start Shopping
      </Button>
    </div>
  )
}
