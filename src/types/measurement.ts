export type Measurement = ShirtMeasurement | TrouserMeasurement

export interface ShirtMeasurement {
  type: 'shirt'
  id: string
  active: boolean
  chest: number
  arm: number
  sleeve: number
  shoulder: number
  length: number
  neck: number
  createdAt: string
}

export interface TrouserMeasurement {
  type: 'trouser'
  id: string
  active: boolean
  waist: number
  inseam: number
  hip: number
  thigh: number
  length: number
  createdAt: string
}

export const measurements: Measurement[] = [
  {
    id: '1',
    type: 'shirt',
    active: true,
    chest: 38,
    arm: 13,
    sleeve: 24,
    shoulder: 18,
    length: 30,
    neck: 15,
    createdAt: '2025-01-05T10:15:00Z'
  },
  {
    id: '2',
    type: 'shirt',
    active: false,
    chest: 40,
    arm: 14,
    sleeve: 25,
    shoulder: 19,
    length: 31,
    neck: 16,
    createdAt: '2025-01-20T14:30:00Z'
  },
  {
    id: '3',
    type: 'shirt',
    active: false,
    chest: 42,
    arm: 15,
    sleeve: 26,
    shoulder: 20,
    length: 32,
    neck: 16.5,
    createdAt: '2025-02-10T09:45:00Z'
  },
  {
    id: '4',
    type: 'shirt',
    active: false,
    chest: 44,
    arm: 16,
    sleeve: 27,
    shoulder: 21,
    length: 33,
    neck: 17,
    createdAt: '2025-03-01T11:20:00Z'
  },
  {
    id: '5',
    type: 'trouser',
    active: false,
    waist: 32,
    inseam: 30,
    hip: 38,
    thigh: 22,
    length: 40,
    createdAt: '2025-03-15T08:10:00Z'
  }
]
