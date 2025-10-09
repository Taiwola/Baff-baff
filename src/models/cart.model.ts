import mongoose, { Schema, Document, Model, model } from 'mongoose'
import { IProduct } from './product.model'

export interface ICartItem {
  product: IProduct | mongoose.Types.ObjectId | string
  name: string
  price: number
  fitting: Fitting
  size: Size | 'Bespoke'
  measurements?: Partial<ShirtMeasurement> & Partial<TrouserMeasurement> & { trouserLength?: string }
  quantity: number
}

export interface ICart extends Document {
  _id: mongoose.Types.ObjectId
  userId?: mongoose.Types.ObjectId | string
  items: ICartItem[]
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  fitting: { type: String, required: true, enum: ['fit', 'baggy', 'straight'] },
  size: { type: String, required: true },
  measurements: {
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
  quantity: { type: Number, default: 1 }
})

const cartSchema: Schema<ICart> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    items: { type: [CartItemSchema], default: [] }
  },
  {
    timestamps: true
  }
)

const CartModel: Model<ICart> = model<ICart>('Cart', cartSchema)

export default CartModel
