import { GetDTO } from '@/types/dto/GetDTO'
import { RoomEntity, RoomModel } from './Room'
import { GetRoomPlayerByIdDTO } from './resources/room-player/RoomPlayerDTO'
import { GetRoundByIdDTO } from '../round/RoundDTO'
import { GetSprintByIdDTO } from '../sprint/SprintDTO'

export type GetRoomByIdDTO = RoomEntity & {
  sprint: Omit<GetSprintByIdDTO, 'rooms'> // extension
  roomPlayers: Omit<GetRoomPlayerByIdDTO, 'room'>[] // extension[collection]
  roomRounds: Omit<GetRoundByIdDTO, 'room'>[] // extension[collection]
}

export type CreateRoomDTO = RoomModel

export type UpdateRoomDTO = Partial<RoomModel>

export type GetRoomDTO = GetDTO<'rooms', GetRoomByIdDTO>
