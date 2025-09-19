import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICategories extends Document {
  _id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const categorySchema: Schema<ICategories> = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const CategoryModel: Model<ICategories> = mongoose.models.Category || mongoose.model<ICategories>('Category', categorySchema)

export default CategoryModel
