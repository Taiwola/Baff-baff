import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOrder extends Document {
  _id: string
  userId?: mongoose.Types.ObjectId | string
  reference: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  shippingAddress: OrderShippingAddress
  deliveryFee: number
  createdAt: Date
  updatedAt: Date
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    reference: { type: String, required: true, unique: true },
    items: [
      {
        product: {
          id: { type: String, required: true },
          name: { type: String, required: true },
          type: { type: String, required: true },
          category: { type: String, required: true },
          images: { type: [String], default: [] }
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
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
        quantity: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'delivered', 'cancelled', 'failed'],
      default: 'pending'
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      altPhoneNumber: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      address: { type: String, required: true }
    },
    deliveryFee: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
)

const OrderModel: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema)
export default OrderModel
