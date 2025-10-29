"use client"

import { use, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type TabKey = 'day' | 'week' | 'month' | 'year'

type Tab = {
  key: TabKey
  label: string
}

const tabs: Tab[] = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'year', label: 'Year' },
]

type Props = {
  promise: Promise<RevenueOverview>
}

export default function RevenueChart({ promise }: Props) {
  const overview = use(promise)
  const [activeTab, setActiveTab] = useState<TabKey>('day');

  const lookup: Record<TabKey, RevenueStat[]> = {
    day: overview.daily,
    week: overview.weekly,
    month: overview.monthly,
    year: overview.yearly
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold">Daily Revenue</h2>
          <p className="text-xs text-[#4F4F4F]">{`Between ${formatDate(overview.startDate)} and ${formatDate(overview.endDate)}`}</p>
        </div>

        <div className="text-[8px] md:text-xs text-brand-dark/50 space-x-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${tab.key === activeTab ? 'text-blue-600 font-medium' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lookup[activeTab]}>
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

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('default', { day: '2-digit', month: 'short', year: '2-digit' })
}