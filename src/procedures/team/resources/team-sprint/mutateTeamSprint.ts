import { api } from '@/services/api/apiClient'

import {
  UpdateTeamSprintDTO,
  CreateTeamSprintDTO,
  GetTeamSprintByIdDTO,
} from '@/types/components/models/team/resources/team-sprint/TeamSprintDTO'

type MutateTeamSprintParams =
  | {
      id: string
      teamSprint: UpdateTeamSprintDTO
    }
  | {
      id: undefined
      teamSprint: CreateTeamSprintDTO
    }

export async function mutateTeamSprint(
  params: MutateTeamSprintParams,
): Promise<GetTeamSprintByIdDTO> {
  if (params.id) {
    const res = await api.put<GetTeamSprintByIdDTO>(
      `/v1/team-sprints/${params.id}`,
      params.teamSprint,
    )
    return res.data
  }
  const res = await api.post<GetTeamSprintByIdDTO>(
    `/v1/team-sprints`,
    params.teamSprint,
  )
  return res.data
}
