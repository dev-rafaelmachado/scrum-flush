import { GetDTO } from '@/types/dto/GetDTO'

import { GetRoomByIdDTO } from '../room/RoomDTO'
import { GetStorieByIdDTO } from '../storie/StorieDTO'
import { GetVoteByIdDTO } from '../vote/VoteDTO'
import { RoundEntity, RoundModel } from './Round'

export type GetRoundByIdDTO = RoundEntity & {
  room: Omit<GetRoomByIdDTO, 'roomRounds'> // extension
  storie: Omit<GetStorieByIdDTO, 'rounds'> // extension
  votes: Omit<GetVoteByIdDTO, 'round'>[] // extension[collection]
}

export type CreateRoundDTO = RoundModel

export type UpdateRoundDTO = Partial<RoundModel>

export type GetRoundDTO = GetDTO<'rounds', GetRoundByIdDTO>
