import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

type Props = {
   data: DailyItem[]
}
export default function DayChart({ data }: Props) {
   return (
      <LineChart data={data}>
         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
         <XAxis className="text-[8px] md:text-xstext-xs" dataKey="dayName" />
         <YAxis className="text-[8px] md:text-xs" tickFormatter={(value) => value.toLocaleString()} />
         <Tooltip formatter={(value: number) => value.toLocaleString()} />
         <Line
            type="monotone"
            dataKey="totalSales"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ef4444" }}
            activeDot={{ r: 6 }}
         />
      </LineChart>
   )
}
