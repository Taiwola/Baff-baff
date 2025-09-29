import mongoose, { Schema, Document, Model } from 'mongoose'
export interface Region {
   id: string
   state: string
   city: string
   deliveryPrice: number
   createdAt: string
}

export interface IRegion extends Document {
  id: string
  state: string
  region: string
  price: number
  createdAt: Date
  updatedAt: Date
}

const regionSchema: Schema<IRegion> = new Schema(
  {
    state: { type: String, required: true },
    region: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'Price must be non-negative'] }
  },
  {
    timestamps: true
  }
)

const RegionModel: Model<IRegion> = mongoose.model<IRegion>('Region', regionSchema)

export default RegionModel
