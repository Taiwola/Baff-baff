import mongoose, { Schema, Document } from 'mongoose'

export type IOrderProduct = {
  id: string
  name: string
  price: number
  image: string
  category: string
  size: string
  quantity: string
}

export interface IOrder extends Document {
  id: string
  reference: string
  userId: mongoose.Types.ObjectId | string
  datePlaced: Date
  totalAmount: number
  email: string
  amount: number
  deliveryFee: number
  address: string
  state: string
  region: string
  fullName: string
  paymentStatus: string
  status: string
  phoneNumber: string
  products: IOrderProduct[]
}

const productSchema: Schema<IOrderProduct> = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: String, required: true }
})

const orderSchema: Schema<IOrder> = new Schema(
  {
    reference: { type: String, required: true, unique: true },
    userId: { type: String, required: true, ref: 'User' },
    datePlaced: { type: Date, required: true, default: Date.now },
    totalAmount: { type: Number, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 0 },
    address: { type: String, required: true },
    state: { type: String, required: true },
    region: { type: String, required: true },
    fullName: { type: String, required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['unpaid', 'paid'],
      default: 'unpaid'
    },
    status: {
      type: String,
      required: true,
      enum: ['not_start', 'processing', 'delivered'],
      default: 'not_start'
    },
    phoneNumber: { type: String, required: true },
    products: [productSchema]
  },
  {
    timestamps: true
  }
)

// Export the model
const OrderModel = mongoose.model<IOrder>('Order', orderSchema)

export default OrderModel
