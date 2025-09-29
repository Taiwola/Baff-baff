'use client'
import React, { ReactNode } from 'react'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'

type Props = {
   separator: string | ReactNode
   items: BreadCrumbItemType[]
}

export default function BreadCrumbsComp({ separator, items }: Props) {
   return (
      <Breadcrumbs
         className="text-sm font-montserrat"
         separator={separator}
      >
         {items.map((i) => (
            <BreadcrumbItem
               key={i.label}
               href={i.href}
               isCurrent={i.isCurrent}
               isDisabled={i.isDisabled}
               classNames={{
                  item: `cursor-pointer transition-colors text-xs ${i.isCurrent ? 'text-black font-bold' : 'text-[#00000080]'}`,
                  separator: `px-2 text-black`
               }}
            >
               {i.label}
            </BreadcrumbItem>
         ))}
      </Breadcrumbs>
   )
}

export type BreadCrumbItemType = {
   label: string
   href: string
   isDisabled: boolean
   isCurrent: boolean
}
