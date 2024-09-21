import { api } from '@/services/api/apiClient'

import {
  GetTeamByIdDTO,
  GetTeamDTO,
} from '@/types/components/models/team/TeamDTO'

type QueryTeamById = {
  id: string
}

type QueryTeamList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryTeam = QueryTeamById | QueryTeamList

export function queryTeam(params: QueryTeamById): Promise<GetTeamByIdDTO>
export function queryTeam(params: QueryTeamList): Promise<GetTeamDTO>

export async function queryTeam(
  params: QueryTeam,
): Promise<GetTeamByIdDTO | GetTeamDTO> {
  if (isQueryTeamById(params)) {
    const res = await api.get<GetTeamByIdDTO>(`/v1/teams/${params.id}`)
    return res.data
  }
  const res = await api.get<GetTeamDTO>(`/v1/teams`, {
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

function isQueryTeamById(params: QueryTeam): params is QueryTeamById {
  return 'id' in params
}
