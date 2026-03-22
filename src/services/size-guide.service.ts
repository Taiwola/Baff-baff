import SizeGuideModel, { ISizeGuide } from '@models/size-guide.model'

export async function getSizeGuideByGender(gender: 'men' | 'women'): Promise<ISizeGuide | null> {
  return SizeGuideModel.findOne({ gender })
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