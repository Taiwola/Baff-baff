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
  quantity: number
}

export interface IProduct extends Document {
  _id: string
  images: string[]
  description: string
  category: string
  category_type: string
  material: mongoose.Types.ObjectId | string
  yard: number
  name: string
  status: Status
  sizes: ISizeVariant[]
  createdAt: Date
  updatedAt: Date
}

const productSchema: Schema = new Schema<IProduct>(
  {
    images: { type: [String], required: true },
    category: { type: String, required: true },
    category_type: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    yard: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true, enum: Object.values(Status), default: Status.IN_STOCK },
    sizes: [
      {
        size: { type: String, required: true, enum: Object.values(Size) },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 }
      }
    ]
  },
  {
    timestamps: true
  }
)

const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)

export default ProductModel
