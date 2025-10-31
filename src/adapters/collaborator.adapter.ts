import { paginate } from '@utils/pagination'
import { ICollaborator } from '@models/collaborator.model'

export function adaptCollaborator(data: ICollaborator): Collaborator {
  return {
    id: data.id,
    name: data.name,
    image: data.image,
    instagram: data.instagram,
    x: data.x,
    facebook: data.facebook,
    tikTok: data.tikTok,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString()
  }
}

export function adaptCollaborators({ data, total, page, pageSize }: AdaptersOptions<ICollaborator[]>): Pagination<Collaborator> {
  return paginate({ data: data.map(adaptCollaborator), total, page, pageSize })
}