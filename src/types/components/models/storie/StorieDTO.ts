import { GetDTO } from '@/types/dto/GetDTO'
import { GetRoundByIdDTO } from '../round/RoundDTO'
import { GetSprintByIdDTO } from '../sprint/SprintDTO'
import { StorieEntity, StorieModel } from './Storie'

export type GetStorieByIdDTO = StorieEntity & {
  sprint: Omit<GetSprintByIdDTO, 'stories'> // extension
  rounds: Omit<GetRoundByIdDTO, 'storie'>[] // extension[collection]
}

export type CreateStorieDTO = StorieModel

export type UpdateStorieDTO = Partial<StorieModel>

export type GetStorieDTO = GetDTO<'stories', GetStorieByIdDTO>
