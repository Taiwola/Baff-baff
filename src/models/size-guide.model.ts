import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISizeGuideMeasurements {
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

export interface ISizeGuideEntry {
  size: string
  type: 'shirt' | 'trouser' | 'jacket' | 'short'
  measurements: ISizeGuideMeasurements
}

export interface ISizeGuide extends Document {
  id: string
  gender: 'men' | 'women'
  entries: ISizeGuideEntry[]
  createdAt: Date
  updatedAt: Date
}

const measurementsSchema = new Schema<ISizeGuideMeasurements>(
  {
    chest: { type: String, required: false },
    arm: { type: String, required: false },
    sleeve: { type: String, required: false },
    shoulder: { type: String, required: false },
    length: { type: String, required: false },
    neck: { type: String, required: false },
    waist: { type: String, required: false },
    lap: { type: String, required: false },
    knee: { type: String, required: false }
  },
  { _id: false }
)

const sizeGuideEntrySchema = new Schema<ISizeGuideEntry>(
  {
    size: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['shirt', 'trouser', 'jacket', 'short'], 
      required: true 
    },
    measurements: { type: measurementsSchema, required: true, default: {} }
  },
  { _id: false }
)

const sizeGuideSchema = new Schema<ISizeGuide>(
  {
    gender: { type: String, enum: ['men', 'women'], required: true, unique: true },
    entries: { type: [sizeGuideEntrySchema], required: true, default: [] }
  },
  { timestamps: true }
)

const SizeGuideModel: Model<ISizeGuide> =
  mongoose.models.SizeGuide || mongoose.model<ISizeGuide>('SizeGuide', sizeGuideSchema)

export default SizeGuideModel