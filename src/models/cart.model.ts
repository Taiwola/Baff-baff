import mongoose, { Schema, Document, Model, model } from 'mongoose'
import { IProduct } from './product.model'

export interface ICart extends Document {
  id: string
  price: number
  size: string
  product: IProduct
  quantity: string
  userId: mongoose.Types.ObjectId | string
  createdAt: Date
  updatedAt: Date
}

const cartSchema: Schema<ICart> = new Schema(
  {
    price: { type: Number, default: 0 },
    size: { type: String, default: '' },
    quantity: { type: String, default: '' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
  },
  {
    timestamps: true
  }
)

const CartModel: Model<ICart> = model<ICart>('Cart', cartSchema)

export default CartModel
