import { PlayerType } from '@/types/enums/PlayerType'
import { BaseEntity } from '../BaseEntity'

export type PlayerModel = {
  name: string
  role: string
  type: PlayerType
  userId?: string
}

export type PlayerEntity = PlayerModel & BaseEntity
