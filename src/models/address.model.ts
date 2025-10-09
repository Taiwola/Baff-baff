import mongoose, { Schema, model, Document } from 'mongoose'

export interface IAddress extends Document {
  id: string
  userId?: mongoose.Types.ObjectId
  fullName: string
  email: string
  phoneNumber: string
  altPhoneNumber: string
  city: string
  state: string
  address: string
  active: boolean
  createdAt: string
  updatedAt: string
}

// Mongoose schema for Address
const addressSchema = new Schema<IAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [100, 'Full name must be at most 100 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\+?\d{10,15}$/, 'Please provide a valid phone number']
    },
    altPhoneNumber: {
      type: String,
      match: [/^\+?\d{10,15}$/, 'Please provide a valid alternate phone number'],
      default: ''
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      minlength: [2, 'City must be at least 2 characters long'],
      maxlength: [50, 'City must be at most 50 characters long']
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      minlength: [2, 'State must be at least 2 characters long'],
      maxlength: [50, 'State must be at most 50 characters long']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      minlength: [5, 'Address must be at least 5 characters long'],
      maxlength: [200, 'Address must be at most 200 characters long']
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

// Mongoose model for Address
const AddressModel = model<IAddress>('Address', addressSchema)

export default AddressModel
