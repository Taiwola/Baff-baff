'use client'

import React from 'react'
import { DatePicker } from '@heroui/react'
import { DateValue } from '@internationalized/date'

export default function DateSelector() {
   const [date, setDate] = React.useState<DateValue | null>(null)

   return (
      <DatePicker
         classNames={{
            selectorButton: 'mr-3 w-5 h-5 p-0 birder border-blue-900',
            innerWrapper: '',
            popoverContent: 'bg-white',

            // base: "base-classes border border-red-900",
            // calendar: "calendar-classes border border-red-900",
            selectorIcon: "w-5 h-5",
            // calendarContent: "calendar-content-classes border border-red-900",
            // inputWrapper: "input-wrapper-classes border border-red-900",
            input: "flex justify-center item-center",
            segment: "flex justify-center item-center focus:border",
         }}
         hideTimeZone
         aria-label="Select date"
         variant="bordered"
         value={date}
         onChange={setDate}
         className="w-[154px] gap-2 border border-[#121212] py-2.5 rounded-[8px] text-sm text-[#121212] h-10"
         selectorButtonPlacement="start"
         showMonthAndYearPickers
      />
   )
}
