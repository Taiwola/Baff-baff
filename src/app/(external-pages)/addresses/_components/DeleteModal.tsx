"use client";

import React from "react";
import Image from "next/image";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

import { Button } from "@components/ui";
import WarningIcon from '@assets/svg/warning-icon.png'

interface Props {
   isOpen: boolean;
   onClose: () => void
   onOpenChange: () => void
}

export default function DeleteModal({ isOpen, onOpenChange }: Props) {

   return (
      <Modal
         placement="center"
         hideCloseButton
         isOpen={isOpen}
         onOpenChange={onOpenChange}
         size="full"
         classNames={{
            base: "w-[19.375rem] h-auto rounded-xl shadow-lg bg-white my-5",
         }}
      >
         <ModalContent>
            {(onClose) => (
               <ModalBody className="p-7.5 flex flex-col justify-center items-center focus:outline:none">
                  <Image src={WarningIcon} width={50} height={50} alt="warning icon" />

                  <p className="font-bold text-brand-dark mb-1">Delete</p>
                  <small className="text-center">Are you sure you want to remove this address?</small>

                  <div className="flex justify-center items-center gap-2.5">
                     <Button onClick={onClose} variant="bordered" className="py-2.5 px-12.5 rounded-[2.1875rem]">No</Button>
                     <Button onClick={onClose} className="py-2.5 px-12.5 rounded-[2.1875rem] bg-black">Yes</Button>
                  </div>
               </ModalBody>
            )}
         </ModalContent>
      </Modal>
   );
}
