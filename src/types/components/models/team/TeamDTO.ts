import { GetDTO } from '@/types/dto/GetDTO'

import { GetTeamSprintByIdDTO } from './resources/team-sprint/TeamSprintDTO'
import { GetTeamUserByIdDTO } from './resources/team-user/TeamUserDTO'
import { TeamEntity, TeamModel } from './Team'

export type GetTeamByIdDTO = TeamEntity & {
  teamUsers: Omit<GetTeamUserByIdDTO, 'team'>[] // extension[collection]
  teamSprints: Omit<GetTeamSprintByIdDTO, 'team'>[] // extension[collection]
}

export type CreateTeamDTO = TeamModel

export type UpdateTeamDTO = Partial<TeamModel>

export type GetTeamDTO = GetDTO<'teams', GetTeamByIdDTO>
