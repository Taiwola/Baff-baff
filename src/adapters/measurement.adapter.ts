import { IMeasurement } from '@models/measurement.model'
import { paginate } from '@utils/pagination'

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
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  }
}

export function transformMeasurements({ data, total, page, pageSize }: AdaptersOptions<IMeasurement[]>): Pagination<Measurement> {
  return paginate({ data: data.map(transformMeasurement), total, page, pageSize })
}
