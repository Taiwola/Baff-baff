import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMaterial extends Document {
  id: string
  name: string
  stock: number
  image: string
  createdAt: Date
  updatedAt: Date
}

const materialSchema: Schema<IMaterial> = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const MaterialModel: Model<IMaterial> = mongoose.models.Material || mongoose.model<IMaterial>('Material', materialSchema)

export default MaterialModel
