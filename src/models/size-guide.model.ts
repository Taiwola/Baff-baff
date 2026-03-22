import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISizeGuideEntry {
  size: string
  us: string
  measurement1: string
  measurement1Cm: string
  waist: string
  waistCm: string
  hip: string
  hipCm: string
}

export interface ISizeGuide extends Document {
  id: string
  gender: 'men' | 'women'
  entries: ISizeGuideEntry[]
  createdAt: Date
  updatedAt: Date
}

const sizeGuideEntrySchema = new Schema<ISizeGuideEntry>(
  {
    size: { type: String, required: true },
    us: { type: String, required: true },
    measurement1: { type: String, required: true },
    measurement1Cm: { type: String, required: true },
    waist: { type: String, required: true },
    waistCm: { type: String, required: true },
    hip: { type: String, required: true },
    hipCm: { type: String, required: true }
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