import { GetDTO } from '@/types/dto/GetDTO'

import { GetCollectionByIdDTO } from '../collection/CollectionDTO'
import { GetVoteByIdDTO } from '../vote/VoteDTO'
import { CardEntity, CardModel } from './Card'

export type GetCardByIdDTO = CardEntity & {
  collection: Omit<GetCollectionByIdDTO, 'cards'> // extension[collection]
  votes: Omit<GetVoteByIdDTO, 'card'>[] // extension[card]
}

export type CreateCardDTO = CardModel

export type UpdateCardDTO = Partial<CardModel>

export type GetCardDTO = GetDTO<'cards', GetCardByIdDTO>
