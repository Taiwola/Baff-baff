import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { formatCurrency } from '@utils'

type Props = {
   order: Order
}

export default function Order({ order }: Props) {
   return (
      <div className="w-full border border-foreground md:rounded-lg overflow-hidden">

         <div className="flex justify-start items-center p-4 md:px-7.5 md:py-5 border-b border-foreground gap-5 md:gap-5">
            <div className='text-[10px] md:text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Order number</span>
               <span>{'WU' + order.reference.substring(0, 6)}</span>
            </div>

            <div className='text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Date Placed</span>
               <span>
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                     day: '2-digit',
                     month: 'short',
                     year: 'numeric',
                  })}
               </span>
            </div>

            <div className='text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Total Amount</span>
               <span>{formatCurrency(order.total)}</span>
            </div>
         </div>


         <div className="divide-y divide-foreground">
            {order.items.map((p) => (
               <OrderProduct key={p.product.id + p.size + p.fitting} orderProduct={p} />
            ))}
         </div>
      </div>
   )
}

type OrderProductProps = {
   orderProduct: OrderItem
}

function OrderProduct({ orderProduct }: OrderProductProps) {
   return (
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 h-full">
         <div className='flex justify-start items-start gap-4 md:gap-7.5'>

            <div className="w-[7.5rem] h-[7.5rem] md:w-[9.375rem] md:h-[9.375rem] rounded-[20px] overflow-hidden flex-shrink-0">
               <Image
                  src={orderProduct.product.images[0]}
                  alt={orderProduct.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
               />
            </div>

            <div className="flex flex-col">
               <span className="text-base md:text-[1.125rem] text-black">{orderProduct.name}</span>
               <span className="text-sm md:text-base text-black font-semibold md:font-bold">{formatCurrency(orderProduct.price)}</span>
            </div>
         </div>

         <div className="flex items-center justify-between md:justify-center md:gap-4 h-full mt-auto text-[#008080] w-full md:w-auto">
            <Link href={`/products/${orderProduct.product.slug}`} className="text-[10px] md:text-sm text-[#008080] font-bold">
               View Product
            </Link>
            <span className='hidden md:block'>|</span>
            <button className="text-[10px] md:text-sm font-bold">Buy Again</button>
         </div>
      </div>
   )
}
