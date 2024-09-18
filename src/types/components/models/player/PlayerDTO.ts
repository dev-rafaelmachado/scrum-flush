import { GetDTO } from '@/types/dto/GetDTO'
import { PlayerEntity, PlayerModel } from './Player'
import { GetRoomPlayerByIdDTO } from '../room/resources/room-player/RoomPlayerDTO'
import { GetUserByIdDTO } from '../user/UserDTO'
import { GetVoteByIdDTO } from '../vote/VoteDTO'

export type GetPlayerByIdDTO = PlayerEntity & {
  user: Omit<GetUserByIdDTO, 'players'> // extension
  roomPlayers: Omit<GetRoomPlayerByIdDTO, 'user'>[] // extension[collection]
  votes: Omit<GetVoteByIdDTO, 'player'>[] // extension[collection]
}
export type CreatePlayerDTO = PlayerModel

export type UpdatePlayerDTO = Partial<PlayerModel>

export type GetPlayerDTO = GetDTO<'players', GetPlayerByIdDTO>
