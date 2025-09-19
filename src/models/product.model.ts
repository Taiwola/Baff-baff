import mongoose, { Schema, Document, Model } from 'mongoose'

export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl'
}

export enum Status {
  IN_STOCK = 'in_stock',
  OUT_OF_STOCK = 'out_of_stock'
}

export interface ISizeVariant {
  size: Size
  price: number
}

export interface IProduct extends Document {
  _id: string
  range?: string
  images: string[]
  description: string
  category: string
  category_type: string
  material: string
  yard: number
  name: string
  status: Status
  sizes: ISizeVariant[]
  createdAt: Date
  updatedAt: Date
}

const productSchema: Schema = new Schema<IProduct>(
  {
    range: { type: String, default: null },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    category_type: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: String, required: true },
    yard: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(Status), default: Status.IN_STOCK },
    sizes: [
      {
        size: { type: String, required: true, enum: Object.values(Size) },
        price: { type: Number, required: true, default: 0 }
      }
    ]
  },
  {
    timestamps: true
  }
)

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)

export default Product
