import mongoose, { Document, Schema, model } from 'mongoose'

export const measurements: Measurement[] = []

export interface IMeasurement extends Document {
  id: string
  userId: mongoose.Types.ObjectId | string
  chest: string
  arm: string
  sleeve: string
  shoulder: string
  length: string
  neck: string
  waist: string
  lap: string
  trouserLength: string
  knee: string
  createdAt: Date
  updatedAt: Date
}

const measurementSchema: Schema<IMeasurement> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    chest: { type: String, default: '' },
    arm: { type: String, default: '' },
    sleeve: { type: String, default: '' },
    shoulder: { type: String, default: '' },
    length: { type: String, default: '' },
    neck: { type: String, default: '' },
    waist: { type: String, default: '' },
    lap: { type: String, default: '' },
    trouserLength: { type: String, default: '' },
    knee: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

// Mongoose model for Measurement
export const MeasurementModel = model<IMeasurement>('Measurement', measurementSchema)
