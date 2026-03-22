'use client'

import { useState, useEffect } from 'react'
import { getSizeGuideByGender } from '@actions/size-guide.actions'

type Props = {
  modal?: boolean
}

export default function SizeGuide({ modal = false }: Props) {
  const [gender, setGender] = useState<'women' | 'men'>('women')
  const [guideData, setGuideData] = useState<SizeGuide | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getSizeGuideByGender(gender).then((data) => {
      setGuideData(data)
      setLoading(false)
    })
  }, [gender])

  const col3Label = gender === 'women' ? 'BUST' : 'CHEST'

  return (
    <div className="w-full bg-[#f0f0f0] p-6 font-montserrat">
      {/* Gender toggle */}
      <div className="flex gap-4 mb-5">
        {(['women', 'men'] as const).map((g) => (
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
            {g === 'women' ? "Women's" : "Men's"}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white border border-[#e0e0e0]">
        {/* Table title */}
        <div className="py-4 text-center border-b border-[#e0e0e0]">
          <span className="text-xs font-normal tracking-[0.2em] uppercase text-[#202020]">
            {gender === 'women' ? "Women's" : "Men's"} Size Chart
          </span>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e0e0e0]">
              <th className="w-[100px]" />
              <th className="py-3 px-4 text-center text-[11px] font-normal tracking-[0.15em] uppercase text-[#202020]">
                US SIZE
              </th>
              <th className="py-3 px-4 text-center text-[11px] font-normal tracking-[0.15em] uppercase text-[#202020]">
                {col3Label}
              </th>
              <th className="py-3 px-4 text-center text-[11px] font-normal tracking-[0.15em] uppercase text-[#202020]">
                WAIST
              </th>
              <th className="py-3 px-4 text-center text-[11px] font-normal tracking-[0.15em] uppercase text-[#202020]">
                HIP
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-[#e0e0e0]">
                  <td className="p-0 w-[100px]">
                    <div className="bg-[#d0d0d0] animate-pulse min-h-[70px]" />
                  </td>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <td key={j} className="py-3 px-4 text-center">
                      <div className="h-3 bg-[#e8e8e8] animate-pulse rounded mx-auto w-16 mb-1" />
                      <div className="h-3 bg-[#e8e8e8] animate-pulse rounded mx-auto w-12" />
                    </td>
                  ))}
                </tr>
              ))
            ) : !guideData || guideData.entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-[#9B8B7A]">
                  No size guide available for {gender === 'women' ? "women" : "men"} yet.
                </td>
              </tr>
            ) : (
              guideData.entries.map((entry) => (
                <tr key={entry.size} className="border-b border-[#e0e0e0] last:border-b-0">
                  {/* Size label — black cell */}
                  <td className="p-0 w-[100px]">
                    <div className="bg-[#202020] flex items-center justify-center h-full min-h-[70px]">
                      <span className="text-white text-xs font-medium tracking-[0.18em] uppercase">
                        {entry.size}
                      </span>
                    </div>
                  </td>

                  {/* US Size */}
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-normal text-[#202020]">{entry.us}</span>
                  </td>

                  {/* Bust / Chest */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{entry.measurement1}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{entry.measurement1Cm}</span>
                  </td>

                  {/* Waist */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{entry.waist}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{entry.waistCm}</span>
                  </td>

                  {/* Hip */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{entry.hip}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{entry.hipCm}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}