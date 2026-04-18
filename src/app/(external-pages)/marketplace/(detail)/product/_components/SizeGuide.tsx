'use client'

import { useState, useEffect } from 'react'
import { getSizeGuideByGender } from '@actions/size-guide.actions'

type GarmentType = 'shirt' | 'trouser' | 'jacket' | 'short'

type Props = {
  modal?: boolean
  initialType?: GarmentType
}

export default function SizeGuide({ modal = false, initialType }: Props) {
  const [gender, setGender] = useState<'women' | 'men'>('men')
  const [selectedType, setSelectedType] = useState<GarmentType>(initialType || 'shirt')
  const [guideData, setGuideData] = useState<SizeGuide | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getSizeGuideByGender(gender).then((data) => {
      setGuideData(data)
      setLoading(false)
    })
  }, [gender])

  const filteredEntries = guideData?.entries.filter(entry => entry.type === selectedType) || []

  const availableTypes = guideData?.entries.length
    ? [...new Set(guideData.entries.map(e => e.type))]
    : []

  // Only fall back if current selectedType doesn't exist in the new gender's data
  useEffect(() => {
    if (availableTypes.length > 0 && !availableTypes.includes(selectedType)) {
      setSelectedType(availableTypes[0])
    }
  }, [availableTypes])

  const getColumns = (type: GarmentType) => {
    const columns: { key: string; label: string }[] = []

    if (type === 'shirt' || type === 'jacket') {
      columns.push({ key: 'chest', label: 'CHEST' })
      columns.push({ key: 'arm', label: 'ARM' })
      columns.push({ key: 'sleeve', label: 'SLEEVE' })
      columns.push({ key: 'shoulder', label: 'SHOULDER' })
      columns.push({ key: 'length', label: 'LENGTH' })
      if (type === 'shirt') {
        columns.push({ key: 'neck', label: 'NECK' })
      }
    } else {
      columns.push({ key: 'waist', label: 'WAIST' })
      columns.push({ key: 'lap', label: 'LAP' })
      columns.push({ key: 'length', label: 'LENGTH' })
      columns.push({ key: 'knee', label: 'KNEE' })
    }

    return columns
  }

  const columns = getColumns(selectedType)

  const typeLabels: Record<GarmentType, string> = {
    shirt: 'Shirts',
    jacket: 'Jackets',
    trouser: 'Trousers',
    short: 'Shorts'
  }

  return (
    <div className="w-full bg-[#f0f0f0] p-6 font-montserrat">
      {/* Gender toggle */}
      <div className="flex gap-4 mb-5">
        {(['men', 'women'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGender(g)}
            className={`text-xs font-medium tracking-widest uppercase pb-1 border-b-2 transition-all ${
              gender === g
                ? 'border-black text-black'
                : 'border-transparent text-black/40 hover:text-black/70'
            }`}
          >
            {g === 'men' ? "Men's" : "Women's"}
          </button>
        ))}
      </div>

      {/* Type selector */}
      {!loading && availableTypes.length > 0 && (
        <div className="flex gap-3 mb-4 flex-wrap">
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 text-[10px] font-bold tracking-[0.18em] uppercase transition-all border ${
                selectedType === type
                  ? 'bg-[#202020] text-white border-[#202020]'
                  : 'bg-transparent text-[#202020]/60 border-[#202020]/20 hover:text-[#202020] hover:border-[#202020]/40'
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>
      )}

      {/* Table card */}
      {!loading && availableTypes.length > 0 && (
        <div className="bg-white border border-[#e0e0e0]">
          <div className="py-4 text-center border-b border-[#e0e0e0]">
            <span className="text-xs font-normal tracking-[0.2em] uppercase text-[#202020]">
              {gender === 'women' ? "Women's" : "Men's"} {typeLabels[selectedType]} Size Chart
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#e0e0e0]">
                  <th className="w-[100px]" />
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="py-3 px-4 text-center text-[11px] font-normal tracking-[0.15em] uppercase text-[#202020]"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="py-10 text-center text-sm text-[#9B8B7A]">
                      No {typeLabels[selectedType].toLowerCase()} size guide available for {gender === 'women' ? "women" : "men"} yet.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr key={`${entry.type}-${entry.size}`} className="border-b border-[#e0e0e0] last:border-b-0">
                      <td className="p-0 w-[100px]">
                        <div className="bg-[#202020] flex items-center justify-center h-full min-h-[70px]">
                          <span className="text-white text-xs font-medium tracking-[0.18em] uppercase">
                            {entry.size}
                          </span>
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.key} className="py-3 px-4 text-center">
                          <span className="text-sm font-normal text-[#202020]">
                            {entry.measurements[col.key as keyof typeof entry.measurements] || '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No data state */}
      {!loading && availableTypes.length === 0 && (
        <div className="bg-white border border-[#e0e0e0] p-10 text-center">
          <span className="text-sm text-[#9B8B7A]">
            No size guide available for {gender === 'women' ? "women" : "men"} yet.
          </span>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-white border border-[#e0e0e0]">
          <div className="py-4 text-center border-b border-[#e0e0e0]">
            <div className="h-4 w-48 bg-[#e8e8e8] animate-pulse rounded mx-auto" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#e0e0e0]">
                  <th className="w-[100px]" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <th key={i} className="py-3 px-4 text-center">
                      <div className="h-3 w-16 bg-[#e8e8e8] animate-pulse rounded mx-auto" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#e0e0e0]">
                    <td className="p-0 w-[100px]">
                      <div className="bg-[#d0d0d0] animate-pulse min-h-[70px]" />
                    </td>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        <div className="h-4 bg-[#e8e8e8] animate-pulse rounded mx-auto w-16" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}