'use client'
import React, { useState } from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Listbox, Selection, ListboxItem } from '@heroui/react'

import { Button } from '@components/ui'

export default function SortDrawer() {
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
   const [selected, setSelected] = useState<Selection>(new Set())

   const handleSelect = (selection: Selection) => {
      setSelected(selection)
      onClose()
   }

   return (
      <>
         <Button
            size='md'
            variant='bordered'
            className='font-montserrat flex-1 gap-[1px] text-[0.6875rem] py-3.5'
            onClick={onOpen}
         >
            <span>Sort By</span>
            <Bars3BottomLeftIcon className='w-4 h-4' />
         </Button>

         <Drawer
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='bottom'
            closeButton={null}
            classNames={{ closeButton: 'hidden' }}
         >
            <DrawerContent className="rounded-t-[1.25rem] border-t border-[#BCBCBC] bg-brand-light">
               {() => (
                  <>
                     <DrawerHeader className="flex justify-center items-center px-5 py-4 gap-2.5">
                        <Bars3BottomLeftIcon className='w-4.5 h-4.5 text-black font-medium' />
                        <h3 className="font-medium text-base text-center uppercase text-black">Sort By</h3>
                     </DrawerHeader>

                     <DrawerBody className="px-0 divide-y divide-[#BCBCBC]">
                        <Listbox
                           disallowEmptySelection
                           aria-label="Filter list"
                           selectedKeys={selected}
                           selectionMode="single"
                           variant="flat"
                           onSelectionChange={handleSelect}
                           itemClasses={{
                              base: "p-2 text-base font-montserrat cursor-pointer text-black",
                              selectedIcon: "text-brand-purple w-4 h-3",
                           }}
                        >
                           {sortItems.map((item, idx) => (
                              <ListboxItem
                                 key={item.key}
                                 className="text-black"
                                 classNames={{
                                    base: `w-full text-center px-5 py-3.5 text-base transition-colors hover:bg-brand-purple/10 ${idx === 0
                                       ? "border-t border-b border-[#BCBCBC]" // first item gets top + bottom
                                       : idx < sortItems.length - 1
                                          ? "border-b border-[#BCBCBC]" // middle items get bottom only
                                          : "" // last item has no border
                                       }`
                                 }}
                              >
                                 {item.value}
                              </ListboxItem>
                           ))}
                        </Listbox>
                     </DrawerBody>
                  </>
               )}
            </DrawerContent>
         </Drawer>
      </>
   )
}

const sortItems = [
   { key: 'featured', value: 'Featured' },
   { key: 'best-selling', value: 'Best Selling' },
   { key: 'a-z', value: 'Alphabetically, A-Z' },
   { key: 'z-a', value: 'Alphabetically, Z-A' },
   { key: 'o-n', value: 'Date, Old to New' },
   { key: 'n-o', value: 'Date, New to Old' }
]