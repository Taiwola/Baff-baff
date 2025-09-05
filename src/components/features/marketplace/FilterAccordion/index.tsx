"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { Accordion, AccordionItem } from "@heroui/accordion";

import FilterList from "./FilterList";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function FilterAccordion() {
   return (
      <div className="flex flex-col w-full">
         <Accordion
            className="w-full p-0 m-0"
            itemClasses={{
               titleWrapper: "w-full px-0",
               title: "text-sm font-montserrat font-normal flex justify-start",
               trigger: "px-4 md:px-0 py-4 md:py-6 m-0 flex justify-start cursor-pointer w-full",
               content: "text-sm font-montserrat px-0",
               base: "p-0 w-full m-0",
            }}
            dividerProps={{ className: "text-brand-dark" }}
         >
            <AccordionItem
               key="availability"
               aria-label="Availability"
               title="Availability"
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
               <FilterList items={availabilityItems} />
            </AccordionItem>

            <AccordionItem
               key="design"
               aria-label="Design"
               title="Design"
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
               <FilterList items={designItems} />
            </AccordionItem>

            <AccordionItem
               key="price"
               aria-label="Price"
               title="Price"
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
               <FilterList items={priceItems} />
            </AccordionItem>
         </Accordion>
      </div>
   );
}

const availabilityItems = [
   { key: "in_stock", label: "In Stock" },
   { key: "out_stock", label: "Out of Stock" },
   { key: "preorder", label: "Preorder" },
];

const designItems = [
   { key: "modern", label: "Modern" },
   { key: "classic", label: "Classic" },
   { key: "minimal", label: "Minimal" },
];

const priceItems = [
   { key: "low", label: "$0 - $50" },
   { key: "mid", label: "$50 - $150" },
   { key: "high", label: "$150+" },
];
