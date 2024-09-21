import { api } from '@/services/api/apiClient'

import {
  UpdateTeamUserDTO,
  CreateTeamUserDTO,
  GetTeamUserByIdDTO,
} from '@/types/components/models/team/resources/team-user/TeamUserDTO'

type MutateTeamUserParams =
  | {
      id: string
      teamUser: UpdateTeamUserDTO
    }
  | {
      id: undefined
      teamUser: CreateTeamUserDTO
    }

export async function mutateTeamUser(
  params: MutateTeamUserParams,
): Promise<GetTeamUserByIdDTO> {
  if (params.id) {
    const res = await api.put<GetTeamUserByIdDTO>(
      `/v1/team-users/${params.id}`,
      params.teamUser,
    )
    return res.data
  }
  const res = await api.post<GetTeamUserByIdDTO>(
    `/v1/team-users`,
    params.teamUser,
  )
  return res.data
}
