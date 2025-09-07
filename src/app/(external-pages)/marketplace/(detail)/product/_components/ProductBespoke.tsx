'use client'

import React from 'react'

export default function ProductBespoke() {
  const fields = [
    { key: 'chest', label: 'Chest' },
    { key: 'arm', label: 'Arm' },
    { key: 'sleeve', label: 'Sleeve' },
    { key: 'shoulder', label: 'Shoulder' },
    { key: 'length', label: 'Length' },
    { key: 'neck', label: 'Neck' },
  ]

  return (
    <form className="flex flex-col gap-6 w-full">
      {/* Measurements row */}
      <div className="flex flex-wrap gap-2.5">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col items-start">
            <label
              htmlFor={field.key}
              className="text-sm font-medium text-brand-dark mb-1"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.key}
                type="number"
                className="w-[70px] h-[40px] pr-6 pl-2 text-sm text-black focus:outline-none border border-black rounded-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                in
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Save measurements checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="save-measurements"
          className="w-4 h-4 accent-black cursor-pointer"
        />
        <label
          htmlFor="save-measurements"
          className="text-xs text-black cursor-pointer"
        >
          Save measurements
        </label>
      </div>
    </form>
  )
}
