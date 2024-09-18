import { BaseEntity } from '../BaseEntity'

export type StorieModel = {
  name: string
  description?: string
  points?: number
  sprintId?: string
}

export type StorieEntity = StorieModel & BaseEntity
