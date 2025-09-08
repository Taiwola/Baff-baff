"use client";

import React from "react";
import { X } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

import { Button } from "@components/ui";
import { MeasurementForm } from "@components/features/measurement";

interface Props {
  isOpen: boolean;
  onClose: () => void
  onOpenChange: () => void
}

export default function MeasurementFormModal({ isOpen, onOpenChange }: Props) {
  async function handleSubmit() { }

  return (
    <Modal
      placement="top"
      backdrop="opaque"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      classNames={{
        base: "w-[50%] max-w-[50%] h-auto rounded-xl shadow-lg bg-white my-5",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* Header */}
            <ModalHeader className="flex justify-between items-center px-4 py-3">
              <h3 className="text-lg font-semibold">Shirt Measurement</h3>

              <Button
                className="p-1 rounded-full hover:bg-gray-100 bg-none"
                onClick={onClose}
              >
                <X className="icon-button bg-none" />
              </Button>
            </ModalHeader>

            {/* Body (form content goes here) */}
            <ModalBody className="p-4">
              <MeasurementForm action={handleSubmit} />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
