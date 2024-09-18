import { RoomPlayerRole } from '@/types/enums/RoomPlayerRole'
import { BaseEntity } from '../../../BaseEntity'

export type RoomPlayerModel = {
  playerId: string
  playerRole: RoomPlayerRole
  roomId: string
}

export type RoomPlayerEntity = RoomPlayerModel & BaseEntity
