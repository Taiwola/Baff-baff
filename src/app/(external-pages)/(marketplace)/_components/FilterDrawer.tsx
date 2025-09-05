'use client'

import React from 'react'
import { Button } from '@components/ui'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import {
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   useDisclosure
} from '@heroui/react'
import { X } from 'lucide-react'
import { FilterAccordion } from '@components/features/marketplace'

export default function FilterDrawer() {
   const { isOpen, onOpen, onOpenChange } = useDisclosure()

   return (
      <>
         {/* Trigger button */}
         <Button
            onClick={onOpen}
            size="md"
            variant="bordered"
            className="font-montserrat flex-1 gap-[1px] text-[0.6875rem] py-3.5"
         >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span>Filter</span>
         </Button>

         {/* Drawer */}
         <Drawer
            size="full"
            // placement="left"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className='top-23 right-0 left-0 bottom-0'
            closeButton={null}
            classNames={{ closeButton: 'hidden' }}
         >
            <DrawerContent className='w-full h-full bg-[#1212124D]'>
               {(onClose) => (
                  <div className='flex justify-between h-full w-full'>
                     <DrawerBody className='w-[85%]  bg-background p-0 text-xs text-brand-dark'>
                        <div className="flex flex-col w-full">
                           <div className='w-full flex justify-start items-center p-4 border-b border-brand-dark'>
                              <AdjustmentsHorizontalIcon className="w-4 h-4" />
                              <span>Filter</span>
                           </div>

                           <div className='w-full border-t border-b border-brand-dark p-0'>
                              <FilterAccordion />
                           </div>
                           {/* <li
                                 key={link.href}
                                 className="p-4 flex justify-between items-center border-t border-foreground"
                              >
                                 <Link
                                    href={link.href}
                                    className="block w-full nav-link"
                                    onClick={() => setIsOpen(false)}
                                 >
                                    {link.label}
                                 </Link>

                                 <ChevronRightIcon className="icon-button" />
                              </li> */}

                        </div>
                     </DrawerBody>

                     <DrawerFooter className='w-[15%] p-3.5'>
                        <button
                           className="icon-button"
                           onClick={onClose}
                           aria-label="Close Menu"
                        >
                           <X className="h-6 w-6 text-white" />
                        </button>
                     </DrawerFooter>
                  </div>
               )}
            </DrawerContent>
         </Drawer>
      </>
   )
}
