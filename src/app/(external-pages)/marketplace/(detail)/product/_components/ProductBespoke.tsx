'use client'

import React from 'react'
import { formatCurrency, getSize } from '@utils'

type Props = {
  type: ProductType
  sizes: IProductSizes
  shirtMeasurement: ShirtMeasurement
  trouserMeasurement: TrouserMeasurement
  saveMeasurements: boolean
  onChangeShirtMeasurement: (measurement: ShirtMeasurement) => void
  onChangeTrouserMeasurement: (measurement: TrouserMeasurement) => void
  toggleSaveMeasurements: (value: boolean) => void
}

export default function ProductBespoke({ type, sizes, shirtMeasurement, trouserMeasurement, saveMeasurements, onChangeShirtMeasurement, onChangeTrouserMeasurement, toggleSaveMeasurements }: Props) {
  const measurements = type === 'trouser' || type === 'short' ? trouserMeasurement : shirtMeasurement
  let fields = [
    { key: 'chest', label: 'Chest', value: shirtMeasurement.chest },
    { key: 'arm', label: 'Arm', value: shirtMeasurement.arm },
    { key: 'sleeve', label: 'Sleeve', value: shirtMeasurement.sleeve },
    { key: 'shoulder', label: 'Shoulder', value: shirtMeasurement.shoulder },
    { key: 'length', label: 'Length', value: shirtMeasurement.length },
    { key: 'neck', label: 'Neck', value: shirtMeasurement.neck },
  ]

  if (type === 'trouser' || type === 'short') {
    fields = [
      { key: 'waist', label: 'Waist', value: trouserMeasurement.waist },
      { key: 'lap', label: 'Lap', value: trouserMeasurement.lap },
      { key: 'length', label: 'Length', value: trouserMeasurement.length },
      { key: 'knee', label: 'Knee', value: trouserMeasurement.knee },
    ]
  }

  function handleChange(key: string, value: string) {
    if (type === 'shirt' || type === 'jacket') {
      onChangeShirtMeasurement({ ...shirtMeasurement, [key]: value })
    } else if (type === 'trouser' || type === 'short') {
      onChangeTrouserMeasurement({ ...trouserMeasurement, [key]: value })
    }
  }

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
                name={field.key}
                type="number"
                value={field.value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-[70px] h-10 pr-6 pl-2 text-sm text-black focus:outline-none border border-black rounded-none"
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
          checked={saveMeasurements}
          onChange={(e) => toggleSaveMeasurements(e.target.checked)}
        />
        <label
          htmlFor="save-measurements"
          className="text-xs text-black cursor-pointer"
        >
          Save measurements
        </label>
      </div>

      <p className='text-sm'>PRICE</p>
      <p className='font-medium'>{formatCurrency(sizes[getSize(measurements)].discountPrice || sizes[getSize(measurements)].price)}</p>
    </form>
  )
}