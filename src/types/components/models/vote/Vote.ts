import { BaseEntity } from '../BaseEntity'

export type VoteModel = {
  roundId: string
  cardId: string
  playerId: string
}

export type VoteEntity = VoteModel & BaseEntity
