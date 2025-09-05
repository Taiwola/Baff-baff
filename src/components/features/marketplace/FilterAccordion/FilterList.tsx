"use client";

import React from "react";
import { Listbox, ListboxItem, Selection } from "@heroui/react";

type FilterListProps = {
   items: { key: string; label: string }[];
};

export default function FilterList({ items }: FilterListProps) {
   const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
      new Set([items[0]?.key])
   );

   return (
      <Listbox
         disallowEmptySelection
         aria-label="Filter list"
         selectedKeys={selectedKeys}
         selectionMode="single"
         variant="flat"
         onSelectionChange={setSelectedKeys}
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
                  base: `py-3.5 px-5 ${idx === 0
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
