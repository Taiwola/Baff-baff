'use client'

import React from 'react'
import { Tab, Tabs } from '@heroui/react'
import ProductSizes from './ProductSizes'
import ProductBespoke from './ProductBespoke'

export default function ProductItemTab() {
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
            <p className="text-sm">SIZE</p>
            <ProductSizes />
            <button
               className="w-[18.75rem] text-end text-black underline text-xs mt-2.5 transition-transform active:scale-95"
            >
               View size guide
            </button>
         </Tab>

         <Tab key="bespoke" title="BESPOKE">
            <ProductBespoke />
         </Tab>
      </Tabs>
   )
}
