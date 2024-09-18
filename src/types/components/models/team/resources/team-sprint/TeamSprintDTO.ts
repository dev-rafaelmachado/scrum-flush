import { GetDTO } from '@/types/dto/GetDTO'
import { GetSprintByIdDTO } from '../../../sprint/SprintDTO'
import { GetTeamByIdDTO } from '../../TeamDTO'
import { TeamSprintEntity, TeamSprintModel } from './TeamSprint'

export type GetTeamSprintByIdDTO = TeamSprintEntity & {
  team: Omit<GetTeamByIdDTO, 'teamSprints'> // extension
  sprint: Omit<GetSprintByIdDTO, 'teamSprints'> // extension
}

export type CreateTeamSprintDTO = TeamSprintModel

export type UpdateTeamSprintDTO = Partial<TeamSprintModel>

export type GetTeamSprintDTO = GetDTO<'teamSprints', GetTeamSprintByIdDTO>
