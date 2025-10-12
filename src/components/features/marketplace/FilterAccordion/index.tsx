"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import FilterList from "./FilterList";
import { formatCurrency } from "@utils";

export default function FilterAccordion() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const status = searchParams.get('status') ?? 'inStock'
   const price = searchParams.get('price') ?? ''

   function handleSelect(filterKey: string, value: string) {
      const params = new URLSearchParams(searchParams.toString())
      if (params.get(filterKey) === value) params.delete(filterKey)
      else params.set(filterKey, value)
      router.replace(`${pathname}?${params.toString()}`)
   }

   return (
      <div className="flex flex-col w-full">
         <Accordion
            className="w-full p-0 m-0"
            itemClasses={{
               titleWrapper: "w-full px-0",
               title: "text-sm font-montserrat font-normal flex justify-start text-black",
               trigger: "px-4 md:px-0 py-4 md:py-6 m-0 flex justify-start cursor-pointer w-full",
               content: "text-sm font-montserrat px-0",
               base: "p-0 w-full m-0",
            }}
            dividerProps={{ className: "bg-brand-dark h-[0.5px]" }}
         >
            {sections.map((section) => (
               <AccordionItem
                  key={section.id}
                  aria-label={section.title}
                  title={section.title}
                  indicator={({ isOpen }) =>
                     isOpen ? (
                        <>
                           <Minus className="h-6 w-6 text-black hidden md:block" />
                           <ChevronDownIcon className="h-4 w-4 text-black block md:hidden" />
                        </>
                     ) : (
                        <>
                           <Plus className="h-6 w-6 text-black hidden md:block" />
                           <ChevronRightIcon className="h-4 w-4 text-black block md:hidden" />
                        </>
                     )
                  }
               >
                  <FilterList selectedKey={
                     section.id === 'status' ? status : section.id === 'price' ? price : ''
                  }
                     items={section.items}
                     onSelect={(value) => handleSelect(section.id, value)}
                  />
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   );
}

const sections = [
   {
      id: "status",
      title: "Availability",
      items: [
         { key: "inStock", label: "In Stock" },
         { key: "outOfStock", label: "Out of Stock" },
      ],
   },
   // {
   //    id: "design",
   //    title: "Design",
   //    items: [
   //       { key: "modern", label: "Modern" },
   //       { key: "classic", label: "Classic" },
   //       { key: "minimal", label: "Minimal" },
   //    ],
   // },
   {
      id: "price",
      title: "Price",
      items: [
         { key: "low", label: `${formatCurrency(0)} - ${formatCurrency(10000)}` },
         { key: "mid", label: `${formatCurrency(10000)} - ${formatCurrency(100000)}` },
         { key: "high", label: `${formatCurrency(100000)}+` },
      ],
   },
];