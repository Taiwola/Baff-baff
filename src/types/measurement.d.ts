type Measurement = {
  id: string
  userId: mongoose.Types.ObjectId | string
  shirt: ShirtMeasurement
  trouser: TrouserMeasurement
  createdAt: string
  updatedAt: string
}

type BespokeMeasurement = ShirtMeasurement & TrouserMeasurement & {
  tLength: string
}

type ShirtMeasurement = {
  chest: string
  arm: string
  sleeve: string
  shoulder: string
  length: string
  neck: string
}

type TrouserMeasurement = {
  waist: string
  lap: string
  length: string
  knee: string
}

type MeasurementFilter = {
  page?: number
  limit?: number
  userId?: string
}
