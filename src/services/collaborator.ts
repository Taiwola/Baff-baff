import { FilterQuery } from 'mongoose'

import CollaboratorModel, { ICollaborator } from '@models/collaborator.model'
import { CreateCollaboratorDto, UpdateCollaboratorDto } from '@validations/collaborators'

export async function createCollaborator(dto: CreateCollaboratorDto): Promise<ICollaborator> {
  const collaborator = new CollaboratorModel({ ...dto })
  await collaborator.save()
  return collaborator
}

export async function getAllCollaborators({ limit, skip, ...filter }: FilterQuery<Collaborator> = {}): Promise<ICollaborator[]> {
  const collaborators = CollaboratorModel.find(filter)

  if (limit && skip) {
    collaborators.skip(skip).limit(limit)
  }

  return await collaborators
}

export async function getOneCollaborator(filter: FilterQuery<Collaborator>): Promise<ICollaborator | null> {
  return await CollaboratorModel.findOne(filter)
}

export async function getCollaboratorById(id: string): Promise<ICollaborator | null> {
  return await CollaboratorModel.findById(id)
}

export async function updateCollaborator(id: string, dto: UpdateCollaboratorDto): Promise<ICollaborator | null> {
  const collaborator = await CollaboratorModel.findByIdAndUpdate(id, { $set: dto }, { new: true })
  return collaborator
}

export async function deleteCollaborator(filter: FilterQuery<Collaborator>): Promise<ICollaborator | null> {
  return await CollaboratorModel.findOneAndDelete(filter)
}
