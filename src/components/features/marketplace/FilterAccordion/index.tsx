"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import FilterList from "./FilterList";

export default function FilterAccordion() {
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
                  <FilterList items={section.items} />
               </AccordionItem>
            ))}
         </Accordion>
      </div>
   );
}

const sections = [
   {
      id: "availability",
      title: "Availability",
      items: [
         { key: "in_stock", label: "In Stock" },
         { key: "out_stock", label: "Out of Stock" },
         { key: "preorder", label: "Preorder" },
      ],
   },
   {
      id: "design",
      title: "Design",
      items: [
         { key: "modern", label: "Modern" },
         { key: "classic", label: "Classic" },
         { key: "minimal", label: "Minimal" },
      ],
   },
   {
      id: "price",
      title: "Price",
      items: [
         { key: "low", label: "$0 - $50" },
         { key: "mid", label: "$50 - $150" },
         { key: "high", label: "$150+" },
      ],
   },
];