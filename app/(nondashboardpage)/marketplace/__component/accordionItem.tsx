"use client"

import { Check, Plus, Minus } from "lucide-react"

interface MarketplaceAccordionProps {
  id: number
  title: string
  isOpen: boolean
  items: string[]
  onToggle: () => void
}

export default function MarketplaceAccordionItem({
  title,
  isOpen,
  items,
  onToggle,
}: MarketplaceAccordionProps) {
  return (
    <div>
      <div>
        <div className="border-b-1 border-[#20202066] flex justify-between items-center py-5 px-0">
          <h2 className="font-montserrat font-normal text-sm">{title}</h2>
          {isOpen ? (
            <Minus className="cursor-pointer" onClick={onToggle} />
          ) : (
            <Plus className="cursor-pointer" onClick={onToggle} />
          )}
        </div>
        {isOpen && (
          <div
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <div className="border-b-1 border-[#20202066] flex justify-between items-center px-5 py-3">
                    <h2 className="font-montserrat font-normal text-base text-black">
                      {item}
                    </h2>
                    {index === 0 && <Check className="text-[#5504D4]" />}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
