import { ISizeGuide, ISizeGuideEntry } from '@models/size-guide.model'

export type AdaptedSizeGuideEntry = {
  size: string
  type: 'shirt' | 'trouser' | 'jacket' | 'short'
  measurements: {
    chest?: string
    arm?: string
    sleeve?: string
    shoulder?: string
    length?: string
    neck?: string
    waist?: string
    lap?: string
    knee?: string
  }
}

export type AdaptedSizeGuide = {
  id?: string
  gender: 'men' | 'women'
  entries: AdaptedSizeGuideEntry[]
  createdAt?: Date
  updatedAt?: Date
}

function adaptEntry(entry: ISizeGuideEntry): AdaptedSizeGuideEntry {
  return {
    size: entry.size,
    type: entry.type,
    measurements: {
      chest: entry.measurements.chest,
      arm: entry.measurements.arm,
      sleeve: entry.measurements.sleeve,
      shoulder: entry.measurements.shoulder,
      length: entry.measurements.length,
      neck: entry.measurements.neck,
      waist: entry.measurements.waist,
      lap: entry.measurements.lap,
      knee: entry.measurements.knee
    }
  }
}

export function adaptSizeGuide(data: ISizeGuide | { gender: 'men' | 'women'; entries: ISizeGuideEntry[] }): AdaptedSizeGuide {
  const result: AdaptedSizeGuide = {
    gender: data.gender,
    entries: data.entries.map(adaptEntry)
  }
  
  if ('id' in data) result.id = data.id
  if ('createdAt' in data) result.createdAt = data.createdAt
  if ('updatedAt' in data) result.updatedAt = data.updatedAt
  
  return result
}

export function adaptSizeGuides(data: ISizeGuide[]): AdaptedSizeGuide[] {
  return data.map(adaptSizeGuide)
}