import { api } from '@/services/api/apiClient'

import {
  GetSprintByIdDTO,
  GetSprintDTO,
} from '@/types/components/models/sprint/SprintDTO'

type QuerySprintById = {
  id: string
}

type QuerySprintList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QuerySprint = QuerySprintById | QuerySprintList

export function querySprint(params: QuerySprintById): Promise<GetSprintByIdDTO>
export function querySprint(params: QuerySprintList): Promise<GetSprintDTO>

export async function querySprint(
  params: QuerySprint,
): Promise<GetSprintByIdDTO | GetSprintDTO> {
  if (isQuerySprintById(params)) {
    const res = await api.get<GetSprintByIdDTO>(`/v1/sprints/${params.id}`)
    return res.data
  }
  const res = await api.get<GetSprintDTO>(`/v1/sprints`, {
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

function isQuerySprintById(params: QuerySprint): params is QuerySprintById {
  return 'id' in params
}
