'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { Button } from '@components/ui'
import { UpsertSizeGuideDto } from '@validations/size-guide'

type Entry = UpsertSizeGuideDto['entries'][0]

type Props = {
  pending: boolean
  initialState: UpsertSizeGuideDto
  gender: 'men' | 'women'
  errors: Partial<Record<string, string | undefined>>
  action: (payload: FormData) => void
}

const emptyEntry = (): Entry => ({
  size: '',
  us: '',
  measurement1: '',
  measurement1Cm: '',
  waist: '',
  waistCm: '',
  hip: '',
  hipCm: ''
})

export default function SizeGuideForm({ errors, gender, initialState, action, pending }: Props) {
  const [entries, setEntries] = useState<Entry[]>(initialState.entries.length > 0 ? initialState.entries : [emptyEntry()])

  function handleEntryChange(index: number, field: keyof Entry, value: string) {
    setEntries((prev) => prev.map((e, i) => (i === index ? { ...e, [field]: value } : e)))
  }

  function addRow() {
    setEntries((prev) => [...prev, emptyEntry()])
  }

  function removeRow(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  // Serialize entries into hidden inputs for FormData
  function buildHiddenInputs() {
    return entries.map((entry, i) =>
      Object.entries(entry).map(([key, val]) => <input key={`${i}-${key}`} type="hidden" name={`entries[${i}][${key}]`} value={val} />)
    )
  }

  const col1Label = gender === 'women' ? 'Bust (in)' : 'Chest (in)'
  const col1CmLabel = gender === 'women' ? 'Bust (cm)' : 'Chest (cm)'

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

      {/* Entries table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {['Size', 'US Size', col1Label, col1CmLabel, 'Waist (in)', 'Waist (cm)', 'Hip (in)', 'Hip (cm)', ''].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[10px] font-semibold tracking-widest uppercase text-black whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {(['size', 'us', 'measurement1', 'measurement1Cm', 'waist', 'waistCm', 'hip', 'hipCm'] as (keyof Entry)[]).map((field) => (
                  <td key={field} className="px-2 py-1.5">
                    <input
                      type="text"
                      value={entry[field]}
                      onChange={(e) => handleEntryChange(i, field, e.target.value)}
                      className="w-[90px] h-8 px-2 text-black text-xs border border-gray-200 focus:border-black focus:outline-none rounded"
                      placeholder="—"
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    disabled={entries.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:opacity-20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
