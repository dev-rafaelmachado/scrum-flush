import { BaseEntity } from '../BaseEntity'

export type RoomModel = {
  code: string
  name: string
  sprintId: string
}

export type RoomEntity = RoomModel & BaseEntity
