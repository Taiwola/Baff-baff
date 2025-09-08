'use client'

import React from 'react'
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react'

export default function CheckoutBreadcrumbs() {
   return (
      <Breadcrumbs
         className="text-sm"
         separator='/'
         itemClasses={{
            item: 'text-[#00000080] cursor-pointer transition-colors text-xs',
            separator: 'px-2 text-black',
         }}
      >
         <BreadcrumbItem href="/cart">Shopping Bag</BreadcrumbItem>
         <BreadcrumbItem className='text-black' classNames={{ item: 'text-black cursor-pointer transition-colors text-xs', separator: 'px-2 text-black' }} href="/checkout/shipping" isCurrent>
            Shipping Details
         </BreadcrumbItem>
         <BreadcrumbItem href="/checkout/shipping" isDisabled={true}>
            Payment
         </BreadcrumbItem>
      </Breadcrumbs>
   )
}



