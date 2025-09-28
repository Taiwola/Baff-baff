import React from 'react'
import { DataTable } from '@components/layouts';
import Link from 'next/link';
// import { Order, OrderStatus } from '@types/order';

export default function OrdersList() {
   return <DataTable columns={columns} rows={rowsForTable} />;
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
   notStart: "bg-gray-400",
   processing: "bg-orange-500",
   delivered: "bg-green-500"
}

// Helper function to get random status
const randomStatus = (): OrderStatus => {
   const statuses: OrderStatus[] = ["notStart", "processing", "delivered"]
   return statuses[Math.floor(Math.random() * statuses.length)]
}

// Generate 20 orders
const rows: Order[] = Array.from({ length: 20 }).map((_, i) => ({
   id: `${i + 1}`,
   date: "2025-09-28",
   orderId: `ORD-${String(i + 1).padStart(3, "0")}`,
   fullName: `Customer ${i + 1}`,
   email: `customer${i + 1}@example.com`,
   phoneNumber: `+44 7000 000${String(i + 1).padStart(2, "0")}`,
   deliveryZone: ["Lagos Mainland", "Ikeja", "Lekki", "Victoria Island"][i % 4],
   address: `${i + 1} Sample Street`,
   status: randomStatus()
}))

// Map to JSX elements for DataTable
const rowsForTable = rows.map(row => ({
   ...row,
   orderId: <Link className='underline text-[#3156DB]' href={`/dashboard/orders/${row.id}`}>{row.orderId}</Link>,
   status: <div className={`w-[15px] h-[15px] rounded-full ${statusColors[row.status]}`} />
}))