"use client";

import React from "react";
import { Listbox, ListboxItem } from "@heroui/react";

type FilterListProps = {
   selectedKey: string
   items: { key: string; label: string }[]
   onSelect: (key: string) => void
};

export default function FilterList({ selectedKey, items, onSelect }: FilterListProps) {

   return (
      <Listbox
         disallowEmptySelection
         aria-label="Filter list"
         selectionMode="single"
         variant="flat"
         selectedKeys={selectedKey ? new Set([selectedKey]) : new Set()}
         onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as string
            onSelect(key)
         }}
         itemClasses={{
            base: "p-2 text-base font-montserrat cursor-pointer text-black",
            selectedIcon: "text-brand-purple w-4 h-3",
         }}
      >
         {items.map((item, idx) => (
            <ListboxItem
               key={item.key}
               className="text-black"
               classNames={{
                  base: `py-3.5 px-10 md:px-5 ${idx === 0
                     ? "border-t border-b border-brand-dark" // first item gets top + bottom
                     : idx < items.length - 1
                        ? "border-b border-brand-dark" // middle items get bottom only
                        : "" // last item has no border
                     }`,
               }}
            >
               {item.label}
            </ListboxItem>
         ))}
      </Listbox>
   );
}
