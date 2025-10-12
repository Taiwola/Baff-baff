'use client'

import React from 'react'
import Image from 'next/image'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

import { formatCurrency } from '@utils'

import EmptyCart from './EmptyCart'
import { Button, CartSkeleton } from '@components/ui'
import { QuantityButton } from '@components/features/cart'
import { useCart } from '@contexts/carts.context'

export default function CartContent() {
  const { cart, isLoading, updateItem, removeItem } = useCart()

  if (isLoading) return <CartSkeleton />

  if (cart.items.length < 1) return <EmptyCart />

  async function changeQuantity(quantity: number, id?: string) {
    if (id) {
      await updateItem(id, quantity)
    }
  }

  return (
    <div className="w-full flex flex-col font-montserrat">
      <div className="border-t border-b border-brand-dark">
        {cart.items.map(item => (
          <div
            key={item.id}
            className="flex items-start justify-between py-5 md:py-7.5 gap-5"
          >
            <Image
              src={item.product.images[0]}
              alt={item.name}
              width={200}
              height={200}
              className="object-cover"
            />

            <div className="flex flex-col flex-1 gap-5">
              <h3 className="text-xs md:text-[1.625rem] font-medium text-black uppercase">{item.name}</h3>
              <span className="w-[30px] md:w-[50px] h-[30px] md:h-[44px] border border-brand-dark flex items-center justify-center text-base text-black font-montserrat">
                {item.size}
              </span>
              <span className="text-xs md:text-[1.125rem] font-medium text-brand-dark">
                {formatCurrency(item.price)}
              </span>
            </div>

            <div className="flex flex-col-reverse items-end md:flex-row md:items-start gap-12 md:gap-24">
              <div>
                <p className="hidden md:block font-poppins text-black mb-2.5">Quantity</p>
                <QuantityButton
                  id={item.id}
                  quantity={item.quantity}
                  setQuantity={changeQuantity}
                />
              </div>

              <button type="button" onClick={() => removeItem(item.id)}>
                <MinusCircleIcon className="icon-button w-4.5 md:w-6.5 h-4.5 md:h-6.5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end gap-2.5 mt-6">
        <div className="flex items-center justify-between w-full md:w-[19rem]">
          <span className="text-[18px] text-black">Subtotal</span>
          <span className="text-[18px] font-bold text-brand-dark">
            ₦{cart.items.reduce((prev, curr) => (prev += curr.price * curr.quantity), 0).toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-black w-full md:w-[19rem] text-center">
          Taxes and shipping calculated at checkout
        </p>

        <Button
          as={'link'}
          href={'checkout/shipping'}
          className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition w-full md:w-[300px]"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
