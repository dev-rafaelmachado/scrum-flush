import { api } from '@/services/api/apiClient'

import {
  GetTeamSprintByIdDTO,
  GetTeamSprintDTO,
} from '@/types/components/models/team/resources/team-sprint/TeamSprintDTO'

type QueryTeamSprintById = {
  id: string
}

type QueryTeamSprintList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryTeamSprint = QueryTeamSprintById | QueryTeamSprintList

export function queryTeamSprint(
  params: QueryTeamSprintById,
): Promise<GetTeamSprintByIdDTO>
export function queryTeamSprint(
  params: QueryTeamSprintList,
): Promise<GetTeamSprintDTO>

export async function queryTeamSprint(
  params: QueryTeamSprint,
): Promise<GetTeamSprintByIdDTO | GetTeamSprintDTO> {
  if (isQueryTeamSprintById(params)) {
    const res = await api.get<GetTeamSprintByIdDTO>(
      `/v1/team-sprints/${params.id}`,
    )
    return res.data
  }
  const res = await api.get<GetTeamSprintDTO>(`/v1/team-sprints`, {
    params: {
      limit: params.limit,
      offset: params.offset,
      orderBy: params.orderBy,
      sortBy: params.sortBy,
      searchKey: params.searchKey,
    },
  })
  return res.data
}

function isQueryTeamSprintById(
  params: QueryTeamSprint,
): params is QueryTeamSprintById {
  return 'id' in params
}
