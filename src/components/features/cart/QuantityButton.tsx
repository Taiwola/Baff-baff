'use client'

import React from 'react'
import { Button } from '@heroui/react'

type Props = {
  id?: string
  quantity: number
  setQuantity: (quantity: number, id?: string) => void
}

export default function QuantityButton({ id, quantity, setQuantity }: Props) {

  const decrease = () => setQuantity(Math.max(1, quantity - 1), id)
  const increase = () => setQuantity(quantity + 1, id)

  return (
    <div className="flex text-black text-xs">
      <Button
        onPress={decrease}
        className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none"
        variant="light"
      >
        -
      </Button>
      <div className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border-t border-b border-brand-dark flex items-center justify-center bg-[#FBFBFB]">
        {quantity}
      </div>
      <Button
        onPress={increase}
        className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none"
        variant="light"
      >
        +
      </Button>
    </div>
  )
}
