import React from "react";

export default function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[10px] p-4 flex flex-col items-center justify-start text-center w-full max-w-md mx-auto animate-pulse"
        >
          <div className="h-3 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
}
