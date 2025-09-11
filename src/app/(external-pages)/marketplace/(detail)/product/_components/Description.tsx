'use client'

import React from 'react'
import { Accordion, AccordionItem } from '@heroui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Minus, Plus } from 'lucide-react'

export default function Description() {
   return (
      <Accordion
         variant="splitted"
         className="border-y border-brand-dark"
         itemClasses={{
            base: "border-none px-0", 
            title: "text-sm font-medium text-left text-black",
            trigger: "flex justify-between items-center py-3 px-0"
         }}
      >
         <AccordionItem
            key="1"
            aria-label="Description"
            title="DESCRIPTION"
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
            <p className="text-sm text-black">
               This is the product description content. You can put details, materials,
               care instructions, or anything relevant here.
            </p>
         </AccordionItem>
      </Accordion>
   )
}
