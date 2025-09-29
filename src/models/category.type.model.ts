import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICategoryType extends Document {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const categoryTypeSchema: Schema<ICategoryType> = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const CategoryTypeModel: Model<ICategoryType> = mongoose.models.categoryType || mongoose.model<ICategoryType>('CategoryType', categoryTypeSchema)

export default CategoryTypeModel
