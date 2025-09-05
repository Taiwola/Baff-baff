'use client'
import React from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'

export default function SortButton() {
   return (
      <Dropdown>
         <DropdownTrigger>
            <button className='flex justify-start items-center gap-1 bg-none hover:bg:none cursor-pointer'>
               <Bars3BottomLeftIcon className='icon-button' />
               <small>Sort By</small>
            </button>
         </DropdownTrigger>

         <DropdownMenu
            aria-label="Sorting Actions"
            className='bg-brand-light w-[12.75rem] rounded-[1.25rem] border border-[#BCBCBC]'
            classNames={{ list: 'text-black text-base' }}
         >
            <DropdownItem key="featured" className='border-b border-[#BCBCBC] py-3.5 px-5 '>Featured</DropdownItem>
            <DropdownItem key="best-selling" className='border-b border-[#BCBCBC] py-3.5 px-5 '>Best Selling</DropdownItem>
            <DropdownItem key="a-z" className='border-b border-[#BCBCBC] py-3.5 px-5 '>Alphabetically, A-Z</DropdownItem>
            <DropdownItem key="z-a" className='border-b border-[#BCBCBC] py-3.5 px-5 '>Alphabetically, Z-A</DropdownItem>
            <DropdownItem key="o-n" className='border-b border-[#BCBCBC] py-3.5 px-5 '>Date, Old to New</DropdownItem>
            <DropdownItem key="n-o" className='py-3.5 px-5'>Date, New to Old</DropdownItem>
      
         </DropdownMenu>
      </Dropdown>
   )
}
