'use client'

import useSWR from 'swr'
import React from 'react'

import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { Button, CartSkeleton } from '@components/ui'

import { useCart } from '@contexts/carts.context'

export default function CartList() {
  const { cart, fetchCart, updateItem, removeItem } = useCart()

  const { isLoading } = useSWR<Cart | null>('/api/cart', fetchCart)

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
          <CartItem
            key={item.id}
            item={item}
            setQuantity={changeQuantity}
            remove={removeItem}
          />
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
