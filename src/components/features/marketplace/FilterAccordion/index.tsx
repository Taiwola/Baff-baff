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
   const type = searchParams.get('type') ?? 'shirt'
   const price = searchParams.get('price') ?? ''
   const design = searchParams.get('design') ?? ''
   const category = pathname.split('/marketplace/')[1] || ''

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
            {sections.filter(i => !(i.id === 'design' && (category !== 'corporates' && category !== 'casuals'))).map((section) => (
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
                     section.id === 'status' ? status : section.id === 'price' ? price : section.id === 'design' ? design : ''
                  }
                     items={section.getItems(type, category)}
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
      getItems() {
         return this.items
      }
   },
   {
      id: "design",
      title: "Design",
      items: [
         { key: "modern", label: "Modern" },
         { key: "classic", label: "Classic" },
         { key: "minimal", label: "Minimal" },
      ],
      corporateShirtItems: [
         { key: "plain", label: "Plain" },
         { key: "checkered", label: "Checkered" },
         { key: "patterned", label: "Patterned" },
         { key: "striped", label: "Striped" },
      ],
      casualShirtItems: [
         { key: "plain", label: "Plain" },
         { key: "checkered", label: "Checkered" },
         { key: "abstract", label: "Abstract" },
         { key: "print", label: "Print" },
      ],
      corporateTrouserItems: [
         { key: "plain", label: "Plain" },
         { key: "stripe", label: "Stripe" },
         { key: "abstract", label: "Abstract" },
         { key: "patterned", label: "Patterned" },
      ],
      causualTrouserItems: [
         { key: "plain", label: "Plain" },
         { key: "patterned", label: "Patterned" },
         { key: "jeans", label: "Jeans" },
         { key: "chinos", label: "Chinos" },
         { key: "corduroy", label: "Corduroy" },
      ],
      jacketItems: [
         { key: "plain", label: "Plain" },
         { key: "jeans", label: "Jeans" },
         { key: "corduroy", label: "Corduroy" },
         { key: "patterned", label: "Patterned" },
         { key: "track", label: "Track" },
      ],
      getItems(type: string, category: string) {
         if (type === 'shirt' && category === 'corporates') {
            return this.corporateShirtItems
         } else if (type === 'shirt' && category === 'casuals') {
            return this.casualShirtItems
         } else if (type === 'trouser' && category === 'corporates') {
            return this.corporateTrouserItems
         } else if (type === 'trouser' && category === 'casuals') {
            return this.causualTrouserItems
         } else if (type === 'jacket') {
            return this.jacketItems
         } else if (type === 'short') {
            return this.causualTrouserItems
         }
         else return this.items
      }
   },
   {
      id: "price",
      title: "Price",
      items: [
         { key: "low", label: `${formatCurrency(0)} - ${formatCurrency(15000)}` },
         { key: "mid", label: `${formatCurrency(15000)} - ${formatCurrency(20000)}` },
         { key: "high", label: `${formatCurrency(20000)}+` },
      ],
      trouserItems: [
         { key: "low", label: `${formatCurrency(0)} - ${formatCurrency(20000)}` },
         { key: "mid", label: `${formatCurrency(20000)} - ${formatCurrency(25000)}` },
         { key: "high", label: `${formatCurrency(25000)}+` },
      ],
      jacketItems: [
         { key: "low", label: `${formatCurrency(0)} - ${formatCurrency(30000)}` },
         { key: "mid", label: `${formatCurrency(30000)} - ${formatCurrency(35000)}` },
         { key: "high", label: `${formatCurrency(35000)}+` },
      ],
      getItems(type: string) {
         if (type === 'jacket') {
            return this.jacketItems
         } else if (type === 'trouser') {
            return this.trouserItems
         } else return this.items
      }
   },
];