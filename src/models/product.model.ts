import slugify from 'slugify'
import { ICollaborator } from './collaborator.model'
import mongoose, { Schema, Document, Model } from 'mongoose'

export const products: Product[] = []

export const fittings: Fitting[] = ['fit', 'baggy', 'straight'] as const

const statusMap: Record<ProductStatus, string> = {
  inStock: 'In Stock',
  outOfStock: 'Out of Stock'
}

export interface ISizeDetails extends Document {
  _id: string
  price: number
  discountPrice?: number
  quantity: number
}

export interface IProduct extends Document {
  _id: string
  slug: string
  images: string[]
  description: string
  category: ProductCategory
  type: ProductType
  material: mongoose.Types.ObjectId | string
  collaborator?: mongoose.Types.ObjectId | string | ICollaborator
  design: ProductDesign
  yard: number
  name: string
  status: ProductStatus
  s: ISizeDetails
  m: ISizeDetails
  l: ISizeDetails
  xl: ISizeDetails
  xxl: ISizeDetails
  xxxl: ISizeDetails
  createdAt: Date
  updatedAt: Date
}

const sizeDetailsSchema: Schema = new Schema<ISizeDetails>({
  price: { type: Number, required: true, default: 0 },
  discountPrice: { type: Number },
  quantity: { type: Number, required: true, default: 0 }
})

const productSchema: Schema = new Schema<IProduct>(
  {
    images: { type: [String], required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    design: {
      type: String,
      required: true,
      enum: ['plain', 'checkered', 'patterned', 'striped', 'abstract', 'print', 'jeans', 'chinos', 'corduroy']
    },
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: true },
    collaborator: { type: Schema.Types.ObjectId, ref: 'Collaborator' },
    yard: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    status: { type: String, required: true, enum: Object.keys(statusMap), default: 'inStock' },
    s: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    m: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    l: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xxl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } },
    xxxl: { type: sizeDetailsSchema, required: true, default: { price: 0, quantity: 0 } }
  },
  {
    timestamps: true
  }
)

productSchema.pre<IProduct>('save', async function (next) {
  if (this.isModified('name')) {
    const baseSlug = slugify(this.name, { lower: true, strict: true, trim: true })
    let slug = baseSlug

    // Check for existing products with same slug
    const existing = await ProductModel.findOne({ slug, _id: { $ne: this._id } })

    if (existing) {
      // Append a random short ID or counter to make it unique
      const count = await ProductModel.countDocuments({ slug: new RegExp(`^${baseSlug}`) })
      slug = `${baseSlug}-${count + 1}`
    }

    this.slug = slug
  }

  next()
})

const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema)

export default ProductModel
