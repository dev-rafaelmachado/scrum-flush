import { BaseEntity } from '../BaseEntity'

export type TeamModel = {
  name: string
  description?: string
}

export type TeamEntity = TeamModel & BaseEntity
