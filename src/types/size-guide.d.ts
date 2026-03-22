type SizeGuideGender = 'men' | 'women'

type SizeGuideEntry = {
  size: string
  us: string
  measurement1: string // bust (women) or chest (men)
  measurement1Cm: string
  waist: string
  waistCm: string
  hip: string
  hipCm: string
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