import { BaseEntity } from '../BaseEntity'

export type RoundModel = {
  roomId: string
  storieId: string
}

export type RoundEntity = RoundModel & BaseEntity
