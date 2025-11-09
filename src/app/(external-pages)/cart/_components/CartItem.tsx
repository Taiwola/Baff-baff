'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

import { formatCurrency } from '@utils'
import { QuantityButton } from '@components/features/cart'
import Link from 'next/link'

type Props = {
   item: CartItem
   remove: (id: string) => void
   setQuantity: (quantity: number, id?: string) => void
}

export default function CartItem({ item, remove, setQuantity }: Props) {
   return (
      <div className="flex flex-row items-start justify-between gap-4 sm:gap-6 md:gap-8 py-4 md:py-6 border-b border-gray-100"
      >
         {/* Product Image */}
         <div className="relative w-[120px] h-[120px] sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] shrink-0 overflow-hidden rounded-lg">
            <motion.div
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.25, ease: 'easeOut' }}
               className="w-full h-full relative"
            >
               <Image
                  src={item.product.images[0]}
                  alt={item.name}
                  fill
                  placeholder="blur"
                  blurDataURL={item.product.images[0].replace('/upload/', '/upload/e_blur:1000,q_1/')}
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 120px, (max-width: 1200px) 160px, 200px"
               />
            </motion.div>
         </div>

         <div className='flex flex-col md:flex-row justify-between gap-4 items-end md:items-start w-full h-full flex-1'>
            {/* Product Info */}
            <div className="flex flex-col flex-1 w-full gap-3 text-center sm:text-left justify-start md:justify-end items-end md:items-start">
               <div className='flex md:flex-col gap-3 justiy-start items-end md:items-start'>
                  <Link href={`/marketplace/product/${item.product.slug}`} className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 uppercase hover:text-brand-purple">
                     {item.name}
                  </Link>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                     <span className="border border-gray-800 text-gray-900 font-medium text-sm md:text-base px-2 py-1 rounded min-w-10 text-center uppercase">
                        {item.size}
                     </span>

                     {item.size !== 'Bespoke' ? (
                        <span className="bg-gray-100 border border-gray-300 text-gray-700 text-sm md:text-base px-2 py-1 rounded min-w-10 text-center capitalize">
                           {item.fitting}
                        </span>
                     ) : null}
                  </div>

               </div>

               <span className="text-sm sm:text-base md:text-lg font-semibold text-brand-dark">
                  {formatCurrency(item.price)}
               </span>
            </div>


            {/* Quantity + Remove */}
            <div className="flex flex-row items-center sm:items-start gap-4 sm:gap-6">

               <div className="flex flex-col items-center sm:items-start">
                  <p className="hidden sm:block font-poppins text-gray-700 mb-2 text-sm">Quantity</p>
                  <QuantityButton
                     id={item.id}
                     quantity={item.quantity}
                     setQuantity={setQuantity}
                  />
               </div>

               <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => remove(item.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
               >
                  <MinusCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
               </motion.button>
            </div>

         </div>

      </div>
   )
}
