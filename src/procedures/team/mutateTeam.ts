import { api } from '@/services/api/apiClient'

import {
  UpdateTeamDTO,
  CreateTeamDTO,
  GetTeamByIdDTO,
} from '@/types/components/models/team/TeamDTO'

type MutateTeamParams =
  | {
      id: string
      team: UpdateTeamDTO
    }
  | {
      id: undefined
      team: CreateTeamDTO
    }

export async function mutateTeam(
  params: MutateTeamParams,
): Promise<GetTeamByIdDTO> {
  if (params.id) {
    const res = await api.put<GetTeamByIdDTO>(
      `/v1/teams/${params.id}`,
      params.team,
    )
    return res.data
  }
  const res = await api.post<GetTeamByIdDTO>(`/v1/teams`, params.team)
  return res.data
}
