"use client";

import { useState } from "react";
import {
   Modal,
   ModalContent,
   ModalBody,
   useDisclosure,
} from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { X } from "lucide-react";

export default function SearchModal() {
   const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
   const [query, setQuery] = useState("");

   return (
      <>
         {/* Trigger button (example, hook it to your header search button) */}
         <button
            onClick={onOpen}
            className="hidden md:inline"
            aria-label="Search"
         >
            <MagnifyingGlassIcon className="icon-button" />
         </button>

         <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top"
            hideCloseButton
            backdrop="transparent"
            motionProps={{
               variants: {
                  enter: { y: 0, opacity: 1 },
                  exit: { y: -20, opacity: 0 },
               },
            }}
            classNames={{
               wrapper: "mt-[72px] md:mt-[104px]", // 👈 offset below nav (adjust if needed)
               base: "w-full !max-w-full", // full width
               body: "p-0", // no default padding
            }}
         >
            <ModalContent>
               <ModalBody>
                  <div
                     className="
                flex items-center justify-between 
                w-full 
                px-5
                bg-background border-b border-foreground 
                h-[50px] md:h-[74px]
              "
                  >
                     {/* Left: Search icon */}
                     <MagnifyingGlassIcon className="h-5 w-5 text-foreground" />

                     {/* Input */}
                     <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
                  flex-1 mx-4
                  bg-transparent outline-none
                  text-sm md:text-base font-montserrat
                  placeholder:text-gray-400
                "
                     />

                     {/* Right: Close button */}
                     <button onClick={onClose} aria-label="Close search">
                        <X className="h-6 w-6 text-foreground" />
                     </button>
                  </div>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}
