import { api } from '@/services/api/apiClient'

import {
  GetTeamUserByIdDTO,
  GetTeamUserDTO,
} from '@/types/components/models/team/resources/team-user/TeamUserDTO'

type QueryTeamUserById = {
  id: string
}

type QueryTeamUserList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryTeamUser = QueryTeamUserById | QueryTeamUserList

export function queryTeamUser(
  params: QueryTeamUserById,
): Promise<GetTeamUserByIdDTO>
export function queryTeamUser(
  params: QueryTeamUserList,
): Promise<GetTeamUserDTO>

export async function queryTeamUser(
  params: QueryTeamUser,
): Promise<GetTeamUserByIdDTO | GetTeamUserDTO> {
  if (isQueryTeamUserById(params)) {
    const res = await api.get<GetTeamUserByIdDTO>(`/v1/team-users/${params.id}`)
    return res.data
  }
  const res = await api.get<GetTeamUserDTO>(`/v1/team-users`, {
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

function isQueryTeamUserById(
  params: QueryTeamUser,
): params is QueryTeamUserById {
  return 'id' in params
}
