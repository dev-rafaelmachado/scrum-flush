import { BaseEntity } from '../BaseEntity'

export type CardModel = {
  collectionId: string
  value?: number
}

export type CardEntity = CardModel & BaseEntity
