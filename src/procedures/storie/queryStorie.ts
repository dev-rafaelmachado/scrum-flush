import { api } from '@/services/api/apiClient'

import {
  GetStorieByIdDTO,
  GetStorieDTO,
} from '@/types/components/models/storie/StorieDTO'

type QueryStorieById = {
  id: string
}

type QueryStorieList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryStorie = QueryStorieById | QueryStorieList

export function queryStorie(params: QueryStorieById): Promise<GetStorieByIdDTO>
export function queryStorie(params: QueryStorieList): Promise<GetStorieDTO>

export async function queryStorie(
  params: QueryStorie,
): Promise<GetStorieByIdDTO | GetStorieDTO> {
  if (isQueryStorieById(params)) {
    const res = await api.get<GetStorieByIdDTO>(`/v1/stories/${params.id}`)
    return res.data
  }
  const res = await api.get<GetStorieDTO>(`/v1/stories`, {
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

function isQueryStorieById(params: QueryStorie): params is QueryStorieById {
  return 'id' in params
}
