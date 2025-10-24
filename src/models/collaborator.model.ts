import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICollaborator extends Document {
  id: string
  name: string
  image: string
  instagram?: string
  x?: string
  facebook?: string
  tikTok?: string
  createdAt: Date
  updatedAt: Date
}

const collaboratorSchema: Schema<ICollaborator> = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    instagram: { type: String },
    x: { type: String },
    facebook: { type: String },
    tikTok: { type: String },
  },
  {
    timestamps: true
  }
)

const CollaboratorModel: Model<ICollaborator> = mongoose.models.Collaborator || mongoose.model<ICollaborator>('Collaborator', collaboratorSchema)

export default CollaboratorModel
