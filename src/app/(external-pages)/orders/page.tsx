import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

import { formatCurrency } from '@utils'
import { Order } from '@models/order.model'

import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function Orders() {
   return (
      <main className='app-container py-5 md:py-12 font-montserrat'>
         <BreadCrumbs
            separator={<ChevronRightIcon className='text-base text-black w-4 h-4' />}
            items={items}
         />

         <div className='mx-auto max-w-[65%] flex flex-col justify-center items-start mt-5'>
            <div className="mx-auto w-full max-w-[60rem] flex flex-col gap-8">
               {orders.map((order) => (
                  <OrderItem key={order.id} order={order} />
               ))}
            </div>
         </div>
      </main>
   )
}

function OrderItem({ order }: { order: Order }) {
   return (
      <div className="w-full border border-foreground rounded-lg overflow-hidden">
         {/* Header */}
         <div className="flex justify-start items-center px-7.5 py-5 border-b border-foreground gap-5">
            <div className='text-xs text-brand-dark flex flex-col justify-start items-start'>
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

         {/* Products */}
         <div className="divide-y divide-foreground">
            {order.products.map((p) => (
               <ProductItem key={p.id} product={p} />
            ))}
         </div>
      </div>
   )
}

function ProductItem({ product }: { product: Product }) {
   return (
      <div className="flex items-start justify-between gap-4 p-4 h-full">
         <div className='flex justify-start items-start gap-7.5'>
            {/* Image */}
            <div className="w-[9.375rem] h-[9.375rem] rounded-[20px] overflow-hidden flex-shrink-0">
               <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
               />
            </div>

            <div className="flex flex-col">
               <span className="text-[1.125rem] text-black">{product.name}</span>
               <span className="text-base text-black font-bold">{formatCurrency(product.price)}</span>
            </div>
         </div>

         {/* Info + Actions */}

         <div className="flex items-center justify-center gap-4 h-full mt-auto text-[#008080]">
            <Link href={`/products/${product.id}`} className="text-sm text-[#008080] font-bold">
               View Product
            </Link>
            <span>|</span>
            <button className="text-sm font-bold">Buy Again</button>
         </div>
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

const orders: Order[] = [
   {
      id: "1",
      reference: "WU881137111",
      datePlaced: "16th Jan 2024",
      totalAmount: 130000,
      products: [
         {
            id: "p1",
            name: "Classic White Shirt",
            price: 45000,
            images: ["https://picsum.photos/id/1011/300/300"],
         },
         {
            id: "p2",
            name: "Blue Denim Jacket",
            price: 90000,
            images: ["https://picsum.photos/id/1012/300/300"],
         },
      ],
   },
]

type Product = {
   id: string
   name: string
   price: number
   images: string[]
}
