import { GetDTO } from '@/types/dto/GetDTO'
import { GetCardByIdDTO } from '../card/CardDTO'
import { CollectionEntity, CollectionModel } from './Collection'

export type GetCollectionByIdDTO = CollectionEntity & {
  cards: Omit<GetCardByIdDTO, 'collection'>[] // extension[collection]
}

export type CreateCollectionDTO = CollectionModel

export type UpdateCollectionDTO = Partial<CollectionModel>

export type GetCollectionDTO = GetDTO<'collections', GetCollectionByIdDTO>
