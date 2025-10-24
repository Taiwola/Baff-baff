import React from 'react'

export default function StatCards() {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
         {stats.map((s, i) => (
            <StatCard key={i} {...s} />
         ))}
      </div>
   )
}

const stats = [
   { title: "Total Prdocuts", value: 245 },
   { title: "Total Orders", value: 182 },
   { title: "Completed Orders", value: 893 },
   { title: "Pending Orders", value: 34 },
]

type StatCardProps = {
   title: string
   value: string | number
}

function StatCard({ title, value }: StatCardProps) {
   return (
      <div className="bg-white rounded-[10px] p-4 flex flex-col items-center justify-start text-center w-full max-w-md mx-auto">
         <span className="text-xs text-black">{title}</span>
         <span className="text-2xl font-medium text-black mt-2">{value}</span>
      </div>
   )
}