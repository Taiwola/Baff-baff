import { ISizeGuide, ISizeGuideEntry } from '@models/size-guide.model'

function adaptEntry(entry: ISizeGuideEntry) {
  return {
    size: entry.size,
    us: entry.us,
    measurement1: entry.measurement1,
    measurement1Cm: entry.measurement1Cm,
    waist: entry.waist,
    waistCm: entry.waistCm,
    hip: entry.hip,
    hipCm: entry.hipCm
  }
}

export function adaptSizeGuide(data: ISizeGuide): SizeGuide {
  return {
    id: data.id,
    gender: data.gender,
    entries: data.entries.map(adaptEntry),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function adaptSizeGuides(data: ISizeGuide[]): SizeGuide[] {
  return data.map(adaptSizeGuide)
}