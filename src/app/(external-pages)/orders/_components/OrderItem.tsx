'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import { formatCurrency } from '@utils'
import { useCart } from '@contexts/carts.context'

type Props = {
   item: OrderItem
}

export default function OrderItem({ item }: Props) {
   const { addItem } = useCart()

   function handleBuyAgain() {
      addItem({ ...item, id: uuidv4() })
   }

   return (
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 h-full">
         <div className='flex justify-start items-start gap-4 md:gap-7.5'>

            <div className="w-[7.5rem] h-[7.5rem] md:w-[9.375rem] md:h-[9.375rem] rounded-[20px] overflow-hidden flex-shrink-0">
               <Image
                  src={item.product.images[0]}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
               />
            </div>

            <div className="flex flex-col">
               <span className="text-base md:text-[1.125rem] text-black">{item.name}</span>
               <span className="text-sm md:text-base text-black font-semibold md:font-bold">{formatCurrency(item.price)}</span>
            </div>
         </div>

         <div className="flex items-center justify-between md:justify-center md:gap-4 h-full mt-auto text-[#008080] w-full md:w-auto">
            <Link href={`/products/${item.product.slug}`} className="text-[10px] md:text-sm text-[#008080] font-bold">
               View Product
            </Link>
            <span className='hidden md:block'>|</span>
            <button
               className="text-[10px] md:text-sm font-bold"
               onClick={handleBuyAgain}
            >
               Buy Again
            </button>
         </div>
      </div>
   )
}
