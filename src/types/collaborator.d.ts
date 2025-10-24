type Collaborator = {
  id: string
  name: string
  image: string
  instagram?: string
  x?: string
  facebook?: string
  tikTok?: string
  createdAt: string
  updatedAt: string
}

type CollaboratorFilter = {
  page?: number
  limit?: number
  search?: string
}
