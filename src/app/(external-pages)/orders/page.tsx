import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

// import { formatCurrency } from '@utils'

import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function Orders() {
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <div className='w-full hidden md:block'>
            <BreadCrumbs
               separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
               items={items}
            />
         </div>

         <h2 className='md:hidden font-semibold text-black text-[1.125rem]'>ORDER HISTORY</h2>

         <div className='mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start mt-5'>
            {orders.map((order) => (
               <OrderItem key={order.id} order={order} />
            ))}
         </div>
      </main>
   )
}

function OrderItem({ order }: { order: Order }) {
   return (
      <div className="w-full border border-foreground md:rounded-lg overflow-hidden">
{/*       
         <div className="flex justify-start items-center p-4 md:px-7.5 md:py-5 border-b border-foreground gap-5 md:gap-5">
            <div className='text-[10px] md:text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Order number</span>
               <span>{order.reference}</span>
            </div>

            <div className='text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Date Placed</span>
               <span>{order.datePlaced}</span>
            </div>

            <div className='text-xs text-brand-dark flex flex-col justify-start items-start'>
               <span className='font-semibold'>Total Amount</span>
               <span>{formatCurrency(order.totalAmount)}</span>
            </div>
         </div>

       
         <div className="divide-y divide-foreground">
            {order.products.map((p) => (
               <ProductItem key={p.id} product={p} />
            ))}
         </div> */}
      </div>
   )
}

function ProductItem({ product }: { product: Product }) {
   return (
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 p-4 h-full">
         {/* <div className='flex justify-start items-start gap-4 md:gap-7.5'>
  
            <div className="w-[7.5rem] h-[7.5rem] md:w-[9.375rem] md:h-[9.375rem] rounded-[20px] overflow-hidden flex-shrink-0">
               <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
               />
            </div>

            <div className="flex flex-col">
               <span className="text-base md:text-[1.125rem] text-black">{product.name}</span>
               <span className="text-sm md:text-base text-black font-semibold md:font-bold">{formatCurrency(product.price)}</span>
            </div>
         </div>

         <div className="flex items-center justify-between md:justify-center md:gap-4 h-full mt-auto text-[#008080] w-full md:w-auto">
            <Link href={`/products/${product.id}`} className="text-[10px] md:text-sm text-[#008080] font-bold">
               View Product
            </Link>
            <span className='hidden md:block'>|</span>
            <button className="text-[10px] md:text-sm font-bold">Buy Again</button>
         </div> */}
      </div>
   )
}

const items: BreadCrumbItemType[] = [
   {
      label: 'HOME',
      href: '/',
      isCurrent: false,
      isDisabled: false
   },
   {
      label: 'ORDER HISTORY',
      href: '/orders',
      isCurrent: true,
      isDisabled: false
   },
]

const orders: Order[] = []
