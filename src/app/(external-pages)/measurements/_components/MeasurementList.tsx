'use client'
import React from 'react'
import { useDisclosure } from '@heroui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

import { Button } from '@components/ui'
import { Measurement } from '@models/measurement.model'

import { DeleteModal } from '@components/ui/Modals'
import MeasurementFormModal from './MeasurementModal'

type Props = {
   measurements: Measurement[]
}
export default function MeasurementList({ measurements }: Props) {
   const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
   const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpenChange: onOpenChangeDelete, onOpen: onOpenDelete } = useDisclosure()


   return (
      <>
         <section className="mx-auto w-full md:max-w-[65%] flex flex-col gap-8 justify-center items-start font-montserrat">
            {measurements.map((measurement) => {
               const { id, type, createdAt, active, ...rest } = measurement

               return (
                  <div
                     key={id}
                     className="w-full h-[11.3125rem] py-7.5 px-5 rounded-[1.25rem] border border-foreground"
                  >
                     {/* Header */}
                     <div className="flex justify-between items-start mb-3.5">
                        <p className="text-sm text-brand-dark opacity-60 capitalize">
                           {`${type} Measurement`}
                        </p>

                        <div className="flex justify-center items-center">
                           <PencilIcon onClick={onOpen} className="icon-button w-6 h-6" />
                           <TrashIcon onClick={onOpenDelete} className="icon-button w-6 h-6" />
                        </div>
                     </div>

                     {/* Render measurement fields */}
                     <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm text-black">
                        {Object.entries(rest).map(([key, value]) => (
                           <div key={key} className="flex gap-2">
                              <span className="capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )
            })}

            <Button onClick={onOpen} className="bg-black rounded-[3rem]">
               Add Measurement
            </Button>
         </section>

         <MeasurementFormModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
         <DeleteModal
            confirm='Are you sure you want to remove this Measurement?'
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            onOpenChange={onOpenChangeDelete}
         />
      </>
   )
}
