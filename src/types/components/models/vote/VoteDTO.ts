import { GetDTO } from '@/types/dto/GetDTO'
import { GetCardByIdDTO } from '../card/CardDTO'
import { GetPlayerByIdDTO } from '../player/PlayerDTO'
import { GetRoundByIdDTO } from '../round/RoundDTO'
import { VoteEntity, VoteModel } from './Vote'

export type GetVoteByIdDTO = VoteEntity & {
  round: Omit<GetRoundByIdDTO, 'votes'> // extension
  player: Omit<GetPlayerByIdDTO, 'votes'> // extension
  card: Omit<GetCardByIdDTO, 'votes'> // extension
}

export type CreateVoteDTO = VoteModel

export type UpdateVoteDTO = Partial<VoteModel>

export type GetVoteDTO = GetDTO<'votes', GetVoteByIdDTO>
