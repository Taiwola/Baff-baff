'use client'

import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  id?: string
  quantity: number
  setQuantity: (quantity: number, id?: string) => void
}

export default function QuantityButton({ id, quantity, setQuantity }: Props) {
  const decrease = () => setQuantity(Math.max(1, quantity - 1), id)
  const increase = () => setQuantity(quantity + 1, id)

  return (
    <div className="flex text-black text-xs select-none">
      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: '#f3f3f3' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
        onClick={decrease}
        className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none font-bold"
      >
        -
      </motion.button>

      <motion.div
        key={quantity} // triggers subtle animation on change
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border-t border-b border-brand-dark flex items-center justify-center bg-[#FBFBFB]"
      >
        {quantity}
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9, backgroundColor: '#f3f3f3' }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.15 }}
        onClick={increase}
        className="w-7 md:w-[2.75rem] h-7 md:h-[2.5rem] border border-brand-dark flex items-center justify-center rounded-none font-bold"
      >
        +
      </motion.button>
    </div>
  )
}
