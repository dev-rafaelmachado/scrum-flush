import { GetDTO } from '@/types/dto/GetDTO'
import { GetRoomByIdDTO } from '../room/RoomDTO'
import { SprintEntity, SprintModel } from './Sprint'
import { GetStorieByIdDTO } from '../storie/StorieDTO'
import { GetTeamSprintByIdDTO } from '../team/resources/team-sprint/TeamSprintDTO'

export type GetSprintByIdDTO = SprintEntity & {
  teamSprint: Omit<GetTeamSprintByIdDTO, 'sprint'> // extension
  stories: Omit<GetStorieByIdDTO, 'sprint'>[] // extension[collection]
  rooms: Omit<GetRoomByIdDTO, 'sprint'>[] // extension[collection]
}

export type CreateSprintDTO = SprintModel

export type UpdateSprintDTO = Partial<SprintModel>

export type GetSprintDTO = GetDTO<'sprints', GetSprintByIdDTO>
