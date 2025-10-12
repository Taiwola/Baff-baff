'use client'

import React from 'react'
import { EmptyState } from '@components/layouts'

type Props = {
   onClick: () => void
}

export default function EmptyAddress({ onClick }: Props) {

   return (
      <EmptyState
         title='You currently have no addresses saved'
         description='Add address for a quicker checkout experience'
         btnText='Add Address'
         onAdd={onClick}
      />

   )
}
