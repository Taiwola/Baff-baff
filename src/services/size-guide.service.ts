import SizeGuideModel, { ISizeGuide, ISizeGuideEntry } from '@models/size-guide.model'

export async function getSizeGuideByGender(gender: 'men' | 'women'): Promise<ISizeGuide | null> {
  return SizeGuideModel.findOne({ gender })
}

export async function getSizeGuideByGenderAndType(
  gender: 'men' | 'women',
  type: 'shirt' | 'trouser' | 'jacket' | 'short'
): Promise<{ gender: 'men' | 'women'; entries: ISizeGuideEntry[] } | null> {
  const sizeGuide = await SizeGuideModel.findOne({ gender }).lean()
  
  if (!sizeGuide) return null
  
  // Filter entries by type
  const filteredEntries = sizeGuide.entries.filter(entry => entry.type === type)
  
  // Return only gender and filtered entries
  return {
    gender: sizeGuide.gender,
    entries: filteredEntries
  }
}

export async function getAllSizeGuides(): Promise<ISizeGuide[]> {
  return SizeGuideModel.find()
}

export async function upsertSizeGuide(
  gender: 'men' | 'women',
  entries: ISizeGuide['entries']
): Promise<ISizeGuide> {
  return SizeGuideModel.findOneAndUpdate(
    { gender },
    { gender, entries },
    { new: true, upsert: true, runValidators: true }
  )
}

export async function deleteSizeGuide(gender: 'men' | 'women'): Promise<ISizeGuide | null> {
  return SizeGuideModel.findOneAndDelete({ gender })
}