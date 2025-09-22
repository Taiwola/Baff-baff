import { IMeasurement, MeasurementModel } from '@models/measurement.model'
import { CreateMeasurementDto, UpdateMeasurementDto } from '@utils/validation/measurement'
import { FilterQuery, ClientSession } from 'mongoose'

export async function createMeasurement(data: CreateMeasurementDto, session?: ClientSession): Promise<IMeasurement> {
  const Measurements = new MeasurementModel({
    ...data
  })

  await Measurements.save({ session })
  return Measurements
}

export async function getAllMeasurements(filter?: FilterQuery<IMeasurement>): Promise<IMeasurement[]> {
  return await MeasurementModel.find(filter || {})
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

export async function deleteMeasurement(id: string): Promise<IMeasurement | null> {
  return await MeasurementModel.findByIdAndDelete(id)
}
