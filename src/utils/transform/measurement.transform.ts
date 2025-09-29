import { Measurement } from '@index'
import { IMeasurement } from '@models/measurement.model'

export function transformMeasurement(data: IMeasurement): Measurement {
  return {
    id: data.id,
    userId: data.userId,
    shirt: {
      arm: data.arm,
      chest: data.chest,
      length: data.length,
      neck: data.neck,
      shoulder: data.shoulder,
      sleeve: data.sleeve
    },
    trouser: {
      knee: data.knee,
      lap: data.lap,
      length: data.trouserLength,
      waist: data.waist
    },
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformMeasurements(data: IMeasurement[]): Measurement[] {
  return data.map(transformMeasurement)
}
