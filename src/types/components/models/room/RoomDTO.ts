import { GetDTO } from '@/types/dto/GetDTO'

import { GetRoundByIdDTO } from '../round/RoundDTO'
import { GetSprintByIdDTO } from '../sprint/SprintDTO'
import { GetRoomPlayerByIdDTO } from './resources/room-player/RoomPlayerDTO'
import { RoomEntity, RoomModel } from './Room'

export type GetRoomByIdDTO = RoomEntity & {
  sprint: Omit<GetSprintByIdDTO, 'rooms'> // extension
  roomPlayers: Omit<GetRoomPlayerByIdDTO, 'room'>[] // extension[collection]
  roomRounds: Omit<GetRoundByIdDTO, 'room'>[] // extension[collection]
}

export type CreateRoomDTO = RoomModel

export type UpdateRoomDTO = Partial<RoomModel>

export type GetRoomDTO = GetDTO<'rooms', GetRoomByIdDTO>
