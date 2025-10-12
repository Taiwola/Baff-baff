import React from 'react'
// import Link from 'next/link';

import { DataTable } from '@components/layouts';

export default function OrdersList() {
   return <DataTable columns={columns} rows={[]} />;
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

// const statusColors: Record<OrderStatus, string> = {
//    notStart: "bg-gray-400",
//    processing: "bg-orange-500",
//    delivered: "bg-green-500"
// }

// Generate 20 orders
// const rows: Order[] = []
// // Map to JSX elements for DataTable
// const rowsForTable = []