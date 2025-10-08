"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

import { Button } from "@components/ui";

interface Props {
  title: string
  isOpen: boolean;
  onOpenChange: () => void
  children: ReactNode
}

export default function AddressModal({ title, isOpen, children, onOpenChange }: Props) {

  return (
    <Modal
      placement="top"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      classNames={{
        base: "w-[75%] max-w-[75%] h-auto rounded-xl shadow-lg bg-white my-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center px-4 py-3">
              <h3 className="text-lg font-semibold">{title}</h3>

              <Button
                className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                onClick={onClose}
              >
                <X className="icon-button bg-none" />
              </Button>
            </ModalHeader>
            
            <ModalBody className="p-4">
              {children}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
