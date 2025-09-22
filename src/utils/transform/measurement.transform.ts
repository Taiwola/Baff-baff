import { Measurement } from '@index'
import { IMeasurement } from '@models/measurement.model'

export function transformMeasurement(data: IMeasurement): Measurement {
  return {
    id: data._id?.toString() || data.id,
    arm: data.arm,
    chest: data.chest,
    knee: data.knee,
    lap: data.lap,
    length: data.length,
    neck: data.neck,
    shoulder: data.shoulder,
    sleeve: data.sleeve,
    trouserLength: data.trouserLength,
    userId: data.userId,
    waist: data.waist,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export function transformMeasurements(data: IMeasurement[]): Measurement[] {
  return data.map(transformMeasurement)
}
