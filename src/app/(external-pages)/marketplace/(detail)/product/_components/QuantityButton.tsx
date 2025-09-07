'use client'

import React, { useState } from 'react'
import { Button } from '@heroui/react'

export default function QuantityButton() {
  const [quantity, setQuantity] = useState(1)

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => q + 1)

  return (
    <div className="flex text-black text-xs">
      <Button
        onPress={decrease}
        className="w-[2.75rem] h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none"
        variant="light"
      >
        -
      </Button>
      <div className="w-[2.75rem] h-[2.5rem] border-t border-b border-brand-dark flex items-center justify-center bg-[#FBFBFB]">
        {quantity}
      </div>
      <Button
        onPress={increase}
        className="w-[2.75rem] h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none"
        variant="light"
      >
        +
      </Button>
    </div>
  )
}
