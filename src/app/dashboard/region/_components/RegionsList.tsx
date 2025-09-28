import React from 'react'
import ActionButton from './ActionButton'
import { DataTable } from '@components/layouts'

type Region = {
  id: string
  state: string
  city: string
  deliveryPrice: number
}

export default function RegionsList() {
  return <DataTable columns={columns} rows={rows} />;
}


const columns = [
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "deliveryPrice", label: "Delivery Price" },
  { key: "actions", label: "" },
];

const rows: Array<Region & { actions: React.ReactNode }> = [
  {
    id: "1",
    state: "Lagos",
    city: "Ikeja",
    deliveryPrice: 2500,
    actions: <ActionButton id="1" />,
  },
  {
    id: "2",
    state: "Lagos",
    city: "Surulere",
    deliveryPrice: 2000,
    actions: <ActionButton id="2" />,
  },
  {
    id: "3",
    state: "Abuja",
    city: "Garki",
    deliveryPrice: 3000,
    actions: <ActionButton id="3" />,
  },
  {
    id: "4",
    state: "Abuja",
    city: "Maitama",
    deliveryPrice: 3500,
    actions: <ActionButton id="4" />,
  },
  {
    id: "5",
    state: "Oyo",
    city: "Ibadan",
    deliveryPrice: 1800,
    actions: <ActionButton id="5" />,
  },
  {
    id: "6",
    state: "Rivers",
    city: "Port Harcourt",
    deliveryPrice: 2800,
    actions: <ActionButton id="6" />,
  },
]

