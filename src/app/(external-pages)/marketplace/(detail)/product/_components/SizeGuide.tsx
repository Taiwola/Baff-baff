'use client'

import { useState } from 'react'

const womenData = [
  { size: 'XXS', us: '00', bust: ['29.5" - 30.5"', '75cm - 77.5cm'], waist: ['23.5" - 24.5"', '60cm - 62.5cm'], hip: ['33.5" - 34.5"', '85cm - 88cm'] },
  { size: 'XS', us: '0 - 2', bust: ['31.5" - 32.5"', '80cm - 83cm'], waist: ['25" - 25.5"', '63.5cm - 65cm'], hip: ['35" - 35.5"', '89cm - 90cm'] },
  { size: 'S', us: '4 - 6', bust: ['33.5" - 34.5"', '85cm - 88cm'], waist: ['26.5" - 27.5"', '67.5cm - 70cm'], hip: ['36.5" - 37.5"', '93cm - 95.5cm'] },
  { size: 'M', us: '8 - 10', bust: ['35.5" - 36.5"', '90cm - 93cm'], waist: ['28.5" - 29.5"', '72.5cm - 75cm'], hip: ['38.5" - 39.5"', '98cm - 100.5cm'] },
  { size: 'L', us: '12', bust: ['38"', '96.5cm'], waist: ['31"', '79cm'], hip: ['41"', '104cm'] },
  { size: 'XL', us: '14', bust: ['40"', '102cm'], waist: ['33"', '84cm'], hip: ['43"', '109cm'] },
  { size: '2X', us: '16', bust: ['42"', '107cm'], waist: ['35"', '89cm'], hip: ['45"', '114cm'] }
]

const menData = [
  { size: 'XS', us: '28 - 30', chest: ['33" - 35"', '84cm - 89cm'], waist: ['27" - 29"', '68.5cm - 73.5cm'], hip: ['33" - 35"', '84cm - 89cm'] },
  { size: 'S', us: '30 - 32', chest: ['35" - 37"', '89cm - 94cm'], waist: ['29" - 31"', '73.5cm - 79cm'], hip: ['35" - 37"', '89cm - 94cm'] },
  { size: 'M', us: '32 - 34', chest: ['37" - 39"', '94cm - 99cm'], waist: ['31" - 33"', '79cm - 84cm'], hip: ['37" - 39"', '94cm - 99cm'] },
  { size: 'L', us: '34 - 36', chest: ['39" - 41"', '99cm - 104cm'], waist: ['33" - 35"', '84cm - 89cm'], hip: ['39" - 41"', '99cm - 104cm'] },
  { size: 'XL', us: '36 - 38', chest: ['41" - 43"', '104cm - 109cm'], waist: ['35" - 37"', '89cm - 94cm'], hip: ['41" - 43"', '104cm - 109cm'] },
  { size: 'XXL', us: '38 - 40', chest: ['43" - 45"', '109cm - 114cm'], waist: ['37" - 39"', '94cm - 99cm'], hip: ['43" - 45"', '109cm - 114cm'] },
  { size: '2X', us: '40 - 42', chest: ['45" - 47"', '114cm - 119cm'], waist: ['39" - 41"', '99cm - 104cm'], hip: ['45" - 47"', '114cm - 119cm'] }
]

type Props = {
  modal?: boolean
}

export default function SizeGuide({ modal = false }: Props) {
  const [gender, setGender] = useState<'women' | 'men'>('women')

  const data = gender === 'women' ? womenData : menData
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
          {/* Column headers */}
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
            {data.map((row) => {
              const col3Data = gender === 'women'
                ? (row as (typeof womenData)[0]).bust
                : (row as (typeof menData)[0]).chest

              return (
                <tr key={row.size} className="border-b border-[#e0e0e0] last:border-b-0">
                  {/* Size label — black cell */}
                  <td className="p-0 w-[100px]">
                    <div className="bg-[#202020] flex items-center justify-center h-full min-h-[70px]">
                      <span className="text-white text-xs font-medium tracking-[0.18em] uppercase">
                        {row.size}
                      </span>
                    </div>
                  </td>

                  {/* US Size */}
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-normal text-[#202020]">{row.us}</span>
                  </td>

                  {/* Bust / Chest */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{col3Data[0]}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{col3Data[1]}</span>
                  </td>

                  {/* Waist */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{row.waist[0]}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{row.waist[1]}</span>
                  </td>

                  {/* Hip */}
                  <td className="py-3 px-4 text-center">
                    <span className="block text-sm font-normal text-[#202020]">{row.hip[0]}</span>
                    <span className="block text-xs font-normal text-[#202020] mt-0.5">{row.hip[1]}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}