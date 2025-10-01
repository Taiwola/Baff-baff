import React from 'react'

type TableSkeletonProps = {
   rows?: number
   columns?: number
}

export default function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
   return (
      <div className="overflow-x-auto w-full">
         <table className="w-full border-collapse">
            <thead>
               <tr>
                  {Array.from({ length: columns }).map((_, i) => (
                     <th key={i} className="p-3 bg-gray-200 rounded animate-pulse">
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-200">
                     {Array.from({ length: columns }).map((_, colIndex) => (
                        <td key={colIndex} className="p-3">
                           <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}
