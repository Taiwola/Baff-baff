import mongoose, { Schema, Document, Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  gender?: Gender
  phoneNumber?: string
  termsAndCondition: boolean
  googleProviderId: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const usersSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String, enum: ['Male', 'Female']},
    termsAndCondition: { type: Boolean, default: false },
    googleProviderId: { type: String }
  },
  {
    timestamps: true
  }
)

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error)
    } else {
      next(new Error('Unknown error occurred during password hashing'))
    }
  }
})

usersSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', usersSchema)

export default UserModel
