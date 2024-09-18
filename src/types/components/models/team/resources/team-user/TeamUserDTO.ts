import { GetDTO } from '@/types/dto/GetDTO'
import { GetTeamByIdDTO } from '../../TeamDTO'
import { TeamUserEntity, TeamUserModel } from './TeamUser'
import { GetUserByIdDTO } from '../../../user/UserDTO'

export type GetTeamUserByIdDTO = TeamUserEntity & {
  team: Omit<GetTeamByIdDTO, 'teamUsers'> // extension
  user: Omit<GetUserByIdDTO, 'teamUsers'> // extension
}

export type CreateTeamUserDTO = TeamUserModel

export type UpdateTeamUserDTO = Partial<TeamUserModel>

export type GetTeamUserDTO = GetDTO<'teamUsers', GetTeamUserByIdDTO>
