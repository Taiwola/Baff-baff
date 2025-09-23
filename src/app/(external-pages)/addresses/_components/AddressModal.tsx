"use client";

import React from "react";
import { X } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

import { Button } from "@components/ui";
import { AddressForm } from "@components/features/address";

interface Props {
  isOpen: boolean;
  onClose: () => void
  onOpenChange: () => void
}

export default function AddressFormModal({ isOpen, onOpenChange }: Props) {
  async function handleSubmit() { }

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
            {/* Header */}
            <ModalHeader className="flex justify-between items-center px-4 py-3">
              <h3 className="text-lg font-semibold">New Address</h3>

              <Button
                className="p-1 rounded-full hover:bg-gray-100 bg-transparent"
                onClick={onClose}
              >
                <X className="icon-button bg-none" />
              </Button>
            </ModalHeader>

            {/* Body (form content goes here) */}
            <ModalBody className="p-4">
              <AddressForm action={handleSubmit} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
