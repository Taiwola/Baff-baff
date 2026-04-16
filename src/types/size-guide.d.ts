type SizeGuideGender = 'men' | 'women'

type SizeGuideGarmentType = 'shirt' | 'trouser' | 'jacket' | 'short'

type SizeGuideMeasurements = {
  // Top measurements
  chest?: string
  arm?: string
  sleeve?: string
  shoulder?: string
  length?: string
  neck?: string
  
  // Bottom measurements
  waist?: string
  lap?: string
  knee?: string
}

type SizeGuideEntry = {
  size: string
  type: SizeGuideGarmentType
  measurements: SizeGuideMeasurements
}

type SizeGuide = {
  id: string
  gender: SizeGuideGender
  entries: SizeGuideEntry[]
  createdAt: Date
  updatedAt: Date
}

type SizeGuideFilter = {
  gender?: SizeGuideGender
  page?: number
  limit?: number
}