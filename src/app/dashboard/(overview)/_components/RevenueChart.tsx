"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Monday", revenue: 180000 },
  { name: "Tuesday", revenue: 120000 },
  { name: "Wednesday", revenue: 80000 },
  { name: "Thursday", revenue: 100000 },
  { name: "Friday", revenue: 50000 },
]

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">Daily Revenue</h2>
          <p className="text-xs text-[#4F4F4F]">27th September 2023</p>
        </div>

        <div className="text-[8px] md:text-xs text-brand-dark/50 space-x-3">
          <button className="text-blue-600 font-medium">Day</button>
          <button>Week</button>
          <button>Month</button>
          <button>Year</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis className="text-[8px] md:text-xstext-xs" dataKey="name" />
          <YAxis className="text-[8px] md:text-xs" tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4, fill: "#ef4444" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
