'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { Button } from '@components/ui'
import { UpsertSizeGuideDto } from '@validations/size-guide'

type GarmentType = 'shirt' | 'trouser' | 'jacket' | 'short'
type Entry = UpsertSizeGuideDto['entries'][0]

type Props = {
  pending: boolean
  initialState: UpsertSizeGuideDto
  gender: 'men' | 'women'
  errors: Partial<Record<string, string | undefined>>
  action: (payload: FormData) => void
}

const emptyEntry = (type: GarmentType = 'shirt'): Entry => ({
  size: '',
  type,
  measurements: {
    chest: '',
    arm: '',
    sleeve: '',
    shoulder: '',
    length: '',
    neck: '',
    waist: '',
    lap: '',
    knee: ''
  }
})

// Define which measurements to show per type
const measurementFieldsByType: Record<GarmentType, Array<keyof Entry['measurements']>> = {
  shirt: ['chest', 'arm', 'sleeve', 'shoulder', 'length', 'neck'],
  jacket: ['chest', 'arm', 'sleeve', 'shoulder', 'length'],
  trouser: ['waist', 'lap', 'length', 'knee'],
  short: ['waist', 'lap', 'length', 'knee']
}

// Labels for measurement fields
const measurementLabels: Record<keyof Entry['measurements'], string> = {
  chest: 'Chest',
  arm: 'Arm',
  sleeve: 'Sleeve',
  shoulder: 'Shoulder',
  length: 'Length',
  neck: 'Neck',
  waist: 'Waist',
  lap: 'Lap',
  knee: 'Knee'
}

export default function SizeGuideForm({ errors, gender, initialState, action, pending }: Props) {
  const [entries, setEntries] = useState<Entry[]>(
    initialState.entries.length > 0 ? initialState.entries : [emptyEntry()]
  )

  function handleTypeChange(index: number, newType: GarmentType) {
    setEntries((prev) =>
      prev.map((e, i) =>
        i === index
          ? {
              ...emptyEntry(newType),
              size: e.size // Preserve size when switching types
            }
          : e
      )
    )
  }

  function handleSizeChange(index: number, value: string) {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, size: value } : e)))
  }

  function handleMeasurementChange(index: number, field: keyof Entry['measurements'], value: string) {
    setEntries((prev) =>
      prev.map((e, i) =>
        i === index
          ? {
              ...e,
              measurements: {
                ...e.measurements,
                [field]: value
              }
            }
          : e
      )
    )
  }

  function addRow() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  function removeRow(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  // Serialize entries into hidden inputs for FormData
  function buildHiddenInputs() {
    return entries.flatMap((entry, i) => [
      <input key={`${i}-size`} type="hidden" name={`entries[${i}][size]`} value={entry.size} />,
      <input key={`${i}-type`} type="hidden" name={`entries[${i}][type]`} value={entry.type} />,
      ...Object.entries(entry.measurements).map(([key, val]) => (
        <input key={`${i}-measurements-${key}`} type="hidden" name={`entries[${i}][measurements][${key}]`} value={val} />
      ))
    ])
  }

  const typeOptions: GarmentType[] = ['shirt', 'jacket', 'trouser', 'short']

  return (
    <form action={action} className="flex flex-col gap-6 w-full">
      {/* Hidden gender field */}
      <input type="hidden" name="gender" value={gender} />
      {buildHiddenInputs()}

      {/* Gender display */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Gender</span>
        <span className="px-3 py-1 rounded-full bg-[#202020] text-white text-xs font-medium capitalize">{gender}</span>
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-4">
        {entries.map((entry, i) => {
          const visibleFields = measurementFieldsByType[entry.type]
          
          return (
            <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50/30">
              <div className="flex items-center gap-4 mb-4">
                {/* Size input */}
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-600 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={entry.size}
                    onChange={(e) => handleSizeChange(i, e.target.value)}
                    className="w-full h-10 px-3 text-black text-sm border border-gray-200 focus:border-black focus:outline-none rounded"
                    placeholder="e.g., M, L, 32"
                  />
                </div>

                {/* Type select */}
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-600 mb-1">
                    Type
                  </label>
                  <select
                    value={entry.type}
                    onChange={(e) => handleTypeChange(i, e.target.value as GarmentType)}
                    className="w-full h-10 px-3 text-sm border text-black border-gray-200 focus:border-black focus:outline-none rounded bg-white"
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  disabled={entries.length === 1}
                  className="mt-5 text-red-600 hover:text-red-800 disabled:opacity-20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Measurements grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {visibleFields.map((field) => (
                  <div key={field}>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-gray-600 mb-1">
                      {measurementLabels[field]}
                    </label>
                    <input
                      type="text"
                      value={entry.measurements[field] || ''}
                      onChange={(e) => handleMeasurementChange(i, field, e.target.value)}
                      className="w-full h-10 px-3 text-sm text-black border border-gray-200 focus:border-black focus:outline-none rounded"
                      placeholder="—"
                    />
                  </div>
                ))}
              </div>

              {/* Show error for this entry if exists */}
              {errors[`entries.${i}.size`] && (
                <p className="text-xs text-red-500 mt-2">{errors[`entries.${i}.size`]}</p>
              )}
              {errors[`entries.${i}.type`] && (
                <p className="text-xs text-red-500 mt-2">{errors[`entries.${i}.type`]}</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Add row */}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs font-medium text-[#202020] hover:opacity-60 transition-opacity w-fit"
      >
        <Plus className="w-4 h-4" />
        Add row
      </button>

      {errors.entries && <p className="text-xs text-red-500">{errors.entries}</p>}

      <hr className="border-t border-gray-300 w-full" />

      <div className="flex justify-between w-full gap-4">
        <Button type="button" variant="bordered" rounded="md" fullWidth>
          Cancel
        </Button>
        <Button type="submit" variant="filled" rounded="md" fullWidth disabled={pending}>
          {pending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}