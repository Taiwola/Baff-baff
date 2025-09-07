'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { formatCurrency } from '@utils'
import { QuantityButton } from '@components/features/cart'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@components/ui'

export default function CartContent() {
  const [items, setItems] = useState(cartItems)

  // const handleQuantityChange = (id: string, type: 'inc' | 'dec') => {
  //   setItems(prev =>
  //     prev.map(item =>
  //       item.id === id
  //         ? {
  //           ...item,
  //           quantity:
  //             type === 'inc'
  //               ? item.quantity + 1
  //               : Math.max(1, item.quantity - 1),
  //         }
  //         : item
  //     )
  //   )
  // }

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="w-full flex flex-col font-montserrat">
      {/* Cart items */}
      <div className="border-t border-b border-brand-dark">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-start justify-between py-5 md:py-7.5 gap-5"
          >
            {/* Product image */}
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="object-cover"
            />

            {/* Product details */}
            <div className="flex flex-col flex-1 gap-5">
              <h3 className="text-xs md:text-[1.625rem] font-medium text-black uppercase">{item.name}</h3>

              <span className="w-[30px] md:w-[50px] h-[30px] md:h-[44px] border border-brand-dark flex items-center justify-center text-base text-black font-montserrat">
                {item.size}
              </span>

              <span className="text-xs md:text-[1.125rem] font-medium text-brand-dark">
                {formatCurrency(item.price)}
              </span>
            </div>

            {/* Quantity + Remove */}
            <div className="flex flex-col-reverse items-end md:flex-row md:items-start gap-12 md:gap-24">
              {/* Quantity button */}
              <div>
                <p className='hidden md:block font-poppins text-black mb-2.5'>Quantity</p>
                <QuantityButton />
              </div>

              {/* Remove button */}
              <button
                onClick={() => handleRemove(item.id)}
              >
                <MinusCircleIcon className='icon-button w-4.5 md:w-6.5 h-4.5 md:h-6.5 text-brand-dark' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="flex flex-col items-end gap-2.5 mt-6">
        <div className="flex items-center justify-between w-full md:w-[19rem]">
          <span className="text-[18px] text-black">Subtotal</span>
          <span className="text-[18px] font-bold text-brand-dark">
            ₦{(subtotal / 100).toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-black w-full md:w-[19rem] text-center">
          Taxes and shipping calculated at checkout
        </p>

        <Button
          as={'link'}
          href={'cart/shipping'}
          className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition w-full md:w-[300px]"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}


// mock cart items
const cartItems = [
  {
    id: '1',
    name: 'Wavy Boy Shirt',
    size: 'L',
    price: 70000,
    image: '/images/product-image.png',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Classic Black Blazer',
    size: 'M',
    price: 120000,
    image: '/images/product-image.png',
    quantity: 2,
  },
]