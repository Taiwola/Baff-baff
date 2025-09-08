'use client'

import React from 'react'
import { BreadCrumbItemType, BreadCrumbs } from '@components/ui'

export default function CheckoutBreadcrumbs() {
   return (
      <BreadCrumbs separator='/' items={items} />
   )
}

const items: BreadCrumbItemType[] = [
   {
      label: 'Shopping Bag',
      href: '/cart',
      isCurrent: false,
      isDisabled: false
   },
   {
      label: 'Shipping Details',
      href: '/checkout/shipping',
      isCurrent: true,
      isDisabled: false
   },
   {
      label: 'Payment',
      href: '/checkout/shipping',
      isCurrent: false,
      isDisabled: true
   }
]


