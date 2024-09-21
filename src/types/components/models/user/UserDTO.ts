import { GetDTO } from '@/types/dto/GetDTO'

import { GetPlayerByIdDTO } from '../player/PlayerDTO'
import { GetTeamUserByIdDTO } from '../team/resources/team-user/TeamUserDTO'
import { UserEntity, UserModel } from './User'

export type GetUserByIdDTO = UserEntity & {
  teamUsers: Omit<GetTeamUserByIdDTO, 'user'>[] // extension[collection]
  players: Omit<GetPlayerByIdDTO, 'user'>[] // extension[collection]
}

export type CreateUserDTO = UserModel

export type UpdateUserDTO = Partial<UserModel>

export type GetUserDTO = GetDTO<'users', GetUserByIdDTO>
