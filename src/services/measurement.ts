import { IMeasurement, MeasurementModel } from '@models/measurement.model'
import { CreateMeasurementDto, UpdateMeasurementDto } from '@validations/measurement'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createMeasurement(data: CreateMeasurementDto, session?: ClientSession): Promise<IMeasurement> {
  const Measurements = new MeasurementModel({
    ...data
  })

  await Measurements.save({ session })
  return Measurements
}

export async function getAllMeasurements(filter?: FilterQuery<MeasurementFilter>): Promise<IMeasurement[]> {
  return await MeasurementModel.find(filter || {}).limit(filter?.limit)
}

export async function getOneMeasurementById(id: string): Promise<IMeasurement | null> {
  return await MeasurementModel.findById(id)
}

export async function getMeasurementByFilter(filter: FilterQuery<IMeasurement>): Promise<IMeasurement | null> {
  return await MeasurementModel.findOne(filter)
}

export async function updateMeasurement(id: string, data: UpdateMeasurementDto, session?: ClientSession): Promise<IMeasurement | null> {
  const Measurement = await MeasurementModel.findByIdAndUpdate(id, { $set: data }, { new: true, session })
  return Measurement
}

export async function upsertMeasurementByUserId(userId: string, data: UpdateMeasurementDto, session?: ClientSession): Promise<IMeasurement> {
  const measurement = await MeasurementModel.findOneAndUpdate(
    { userId },
    { $set: data },
    {
      new: true, // return the updated or created doc
      upsert: true, // create if not found
      setDefaultsOnInsert: true,
      session
    }
  )

  return measurement
}

export async function deleteMeasurement(id: string): Promise<IMeasurement | null> {
  return await MeasurementModel.findByIdAndDelete(id)
}
