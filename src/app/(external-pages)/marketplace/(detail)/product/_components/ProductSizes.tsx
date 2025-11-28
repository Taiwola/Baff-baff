'use client'

import React from 'react'
import { Tab, Tabs } from '@heroui/react'

import { formatCurrency } from '@utils'
import ProductFittings from './ProductFittings'

type Props = {
  sizes: IProductSizes
  activeFitting: Fitting
  type: ProductType
  price: number
  discountPrice: number
  onChangeFitting: (fitting: Fitting) => void
  onChangeSize: (size: Size) => void
}

export default function ProductSizes({ activeFitting, sizes, type, price, discountPrice, onChangeFitting, onChangeSize }: Props) {
  return (
    <>
      <>{type === 'trouser' || type === 'short' ? <ProductFittings activeFitting={activeFitting} onChangeFitting={onChangeFitting} /> : null}</>

      <p className="text-sm">SIZE</p>

      <div className="w-max">
        <Tabs
          aria-label="Product Sizes"
          classNames={{
            panel: 'p-0',
            base: 'flex flex-row gap-3',
            tabList: 'flex flex-row gap-3 p-0',
            tab: 'w-[3.125rem] h-[2.5rem] text-black border border-foreground cursor-pointer hover:bg-gray-100 data-[selected=true]:border-brand-dark'
          }}
          onSelectionChange={(key) => onChangeSize(key as Size)}
        >
          {Object.entries(sizes).map(([key, details]) => (
            <Tab key={key} title={key.toUpperCase()}>
              <div className="w-full flex justify-end items-center">
                <button className="text-black mt-2.5 underline text-xs transition-transform active:scale-95 text-end">View size guide</button>
              </div>

              <div className="py-1.5 px-2.5 w-max text-[10px] bg-foreground rounded-[3.75rem] text-brand-dark">
                <span>{details.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>

              <p className="mt-5 text-sm">PRICE</p>
              <p className="mt-1.5 font-medium">{formatCurrency(discountPrice || price)}</p>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  )
}
