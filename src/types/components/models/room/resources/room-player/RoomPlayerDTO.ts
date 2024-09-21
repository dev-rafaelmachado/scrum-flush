import { GetDTO } from '@/types/dto/GetDTO'

import { GetPlayerByIdDTO } from '../../../player/PlayerDTO'
import { GetRoomByIdDTO } from '../../RoomDTO'
import { RoomPlayerEntity, RoomPlayerModel } from './RoomPlayer'

export type GetRoomPlayerByIdDTO = RoomPlayerEntity & {
  room: Omit<GetRoomByIdDTO, 'roomPlayers'> // extension
  player: Omit<GetPlayerByIdDTO, 'roomPlayers'> // extension
}

export type CreateRoomPlayerDTO = RoomPlayerModel

export type UpdateRoomPlayerDTO = Partial<RoomPlayerModel>

export type GetRoomPlayerDTO = GetDTO<'roomPlayers', GetRoomPlayerByIdDTO>
