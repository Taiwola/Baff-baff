'use client'

import React from 'react'
import { Tab, Tabs } from '@heroui/react'

import ProductSizes from './ProductSizes'
import ProductBespoke from './ProductBespoke'

type Props = {
   product: Product
}

export default function ProductItemTab({ product }: Props) {
   return (
      <Tabs
         aria-label="Options"
         classNames={{
            base: 'w-full',
            tab: 'px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 w-auto data-[selected=true]:text-black data-[selected=true]:border-b data-[selected=true]:border-black',
            tabList: 'flex gap-4'
         }}
      >
         <Tab key="size" title="SELECT SIZE">
            <ProductSizes sizes={product.sizes} />
         </Tab>

         <Tab key="bespoke" title="BESPOKE">
            <ProductBespoke />
         </Tab>
      </Tabs>
   )
}


