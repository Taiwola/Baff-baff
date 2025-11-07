import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { formatCurrency } from '@utils'
import { getOrder } from '@actions/orders.action'

import UpdateStatus from './UpdateStatus'
import { Header } from '@components/features/dashboard'

type Props = {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params

  const order = await getOrder(id)
  if (!order) return notFound()

  return (
    <div className="w-full h-auto">
      <Header title='Orders' />

      <section className='w-full bg-white rounded-[10px] py-5 px-2 sm:px-5 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
          <Link href={'/dashboard/orders'} className='flex justify-start items-center gap-3 sm:gap-5 text-brand-dark'>
            <ArrowLeftIcon className='w-6 h-6 sm:w-6.5 sm:h-6.5' />
            <span className="text-sm sm:text-base">{id}</span>
          </Link>

          <div className='flex justify-end items-center gap-3 sm:gap-5 mt-2 sm:mt-0'>
            <p className='text-sm sm:text-base text-brand-dark'>{new Date(order.createdAt).toLocaleDateString('default', { day: '2-digit', month: 'short', year: 'numeric' })}</p>

            {order.status === 'paid' ? (
              <UpdateStatus id={order.id} />
            ) : (
              <div className={`w-24 sm:w-30 h-10 sm:h-10.75 rounded-[1.875rem] capitalize ${statusColors[order.status]} flex justify-center items-center text-white text-sm sm:text-base`}>
                {order.status}
              </div>
            )}
          </div>
        </div>

        <hr className='mt-5' />

        {/* Product Info */}
        <div className='w-full p-2 sm:p-5 lg:px-0'>
          <h6 className='text-sm text-brand-dark/50 font-semibold mb-3'>PRODUCT INFO</h6>
          <hr />

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] gap-4 py-3 font-medium text-sm text-brand-dark">
            <span>Image</span>
            <span>Product Name</span>
            <span>Category</span>
            <span>Quantity</span>
            <span>Size</span>
            <span>Price</span>
          </div>

          {/* Product Rows */}
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div
                key={item.product.id + item.fitting + item.size}
                className="flex flex-col sm:grid sm:grid-cols-[100px_2fr_1fr_1fr_1fr_1fr] gap-2 sm:gap-4 py-3 items-center border-b border-gray-200 text-sm text-brand-dark font-medium"
              >
                <div className="w-[70px] h-[70px] relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <span>{item.product.name}</span>
                <span>{item.product.category}</span>
                <span>{item.quantity}</span>
                <span className='uppercase'>{item.size}</span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="w-full px-2 sm:px-5 mt-6 flex flex-col gap-2 max-w-xs ml-auto">
          <div className="flex justify-between text-sm text-gray-600">
            <span>SUBTOTAL</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>DELIVERY FEE</span>
            <span>{formatCurrency(order.deliveryFee)}</span>
          </div>
          <hr className="my-1 border-gray-300" />
          <div className="flex justify-between text-base font-semibold text-black">
            <span>TOTAL</span>
            <span>{formatCurrency(order.total + order.deliveryFee)}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

const statusColors: Record<OrderStatus, string> = {
  cancelled: "bg-red-500",     // Red for error/cancellation
  pending: "bg-yellow-500",    // Yellow for waiting/processing
  paid: "bg-blue-500",         // Blue for confirmed/payment done
  delivered: "bg-green-600",   // Green for success/completion
}