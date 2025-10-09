import mongoose, { Schema, Document, Model } from 'mongoose'
import { ICartItem } from './cart.model'

export interface IOrder extends Document {
  _id: string
  userId?: mongoose.Types.ObjectId | string
  reference: string
  items: ICartItem[]
  total: number
  status: OrderStatus
  shippingAddress: mongoose.Types.ObjectId | string
  deliveryFee: number
  createdAt: Date
  updatedAt: Date
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: String, ref: 'User' },
    reference: { type: String, required: true, unique: true },
    items: { type: [Schema.Types.Mixed], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'delivered', 'cancelled'],
      default: 'pending'
    },
    shippingAddress: { type: String, ref: 'Address' },
    deliveryFee: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
)

const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema)
export default OrderModel
