'use client'

import React from 'react'
// import { useDisclosure } from '@heroui/react'

import { EmptyState } from '@components/layouts'
// import MeasurementFormModal from './MeasurementModal'

export default function EmptyMeasurement() {
   // const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

   return (
      <>
         <EmptyState
            title='You currently have no measurements saved'
            description='Add a measurement for a quicker checkout experience'
            btnText='Add Measurement'
            onAdd={() => {}}
         />

         {/* <MeasurementFormModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} /> */}
      </>
   )
}
