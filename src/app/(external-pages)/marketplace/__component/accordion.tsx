"use client"

import { useState } from "react"
import MarketplaceAccordionItem from "./accordionItem"

export default function MarketplaceAccordion() {
  const [openId, setOpenId] = useState<number | null>(1)

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const accordionItems = [
    {
      id: 1,
      title: "Availablity",
      items: ["Stocked"],
    },
    {
      id: 2,
      title: "Design",
      items: ["All", "Solid", "Pattern", "Plade", "Others"],
    },
    {
      id: 3,
      title: "Price",
      items: ["Min", "Max"],
    },
  ]

  return (
    <div>
      {accordionItems.map((item) => (
        <MarketplaceAccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openId === item.id}
          items={item.items}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  )
}
