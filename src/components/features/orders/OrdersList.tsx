'use client'

import Link from 'next/link';
import React, { use } from 'react'
import { usePathname, useRouter } from 'next/navigation';

import { DataTable } from '@components/layouts';

type Props = {
   promise: Promise<Pagination<Order>>
}

export default function OrdersList({ promise }: Props) {
   const orders = use(promise)

   const router = useRouter()
   const pathname = usePathname()

   const rows = orders.items.map((item) => ({
      id: item.id,
      date: new Date(item.createdAt).toLocaleDateString(),
      orderId: `ORD-${item.id.substring(0, 6).padStart(3, "0")}`,
      fullName: item.shippingAddress.fullName,
      email: item.shippingAddress.email,
      phoneNumber: item.shippingAddress.phoneNumber,
      deliveryZone: item.shippingAddress.city + ', ' + item.shippingAddress.state,
      address: item.shippingAddress.address,
      status: item.status
   }))
   
   const rowsForTable = rows.map(row => ({
      ...row,
      orderId: <Link className='underline text-[#3156DB]' href={`/dashboard/orders/${row.id}`}>{row.orderId}</Link>,
      status: <div className={`w-[15px] h-[15px] rounded-full ${statusColors[row.status]}`} />
   }))

   function handleChange(page: number) {
      router.push(pathname + `?page=${page}`)
   }

   return <DataTable columns={columns} rows={rowsForTable} metadata={orders.metadata} onChange={handleChange} />;
}


const columns = [
   { key: "date", label: "Date" },
   { key: "orderId", label: "OderId" },
   { key: "fullName", label: "Full Name" },
   { key: "email", label: "Email Address" },
   { key: "phoneNumber", label: "Phone Number" },
   { key: "deliveryZone", label: "Delivery Zone" },
   { key: "address", label: "Address" },
   { key: "status", label: "" },
];

const statusColors: Record<OrderStatus, string> = {
   cancelled: "bg-gray-400",
   pending: "bg-orange-500",
   paid: "bg-green-500",
   delivered: "bg-green-500",
}

