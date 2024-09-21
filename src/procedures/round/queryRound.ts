import { api } from '@/services/api/apiClient'

import {
  GetRoundByIdDTO,
  GetRoundDTO,
} from '@/types/components/models/round/RoundDTO'

type QueryRoundById = {
  id: string
}

type QueryRoundList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryRound = QueryRoundById | QueryRoundList

export function queryRound(params: QueryRoundById): Promise<GetRoundByIdDTO>
export function queryRound(params: QueryRoundList): Promise<GetRoundDTO>

export async function queryRound(
  params: QueryRound,
): Promise<GetRoundByIdDTO | GetRoundDTO> {
  if (isQueryRoundById(params)) {
    const res = await api.get<GetRoundByIdDTO>(`/v1/rounds/${params.id}`)
    return res.data
  }
  const res = await api.get<GetRoundDTO>(`/v1/rounds`, {
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

function isQueryRoundById(params: QueryRound): params is QueryRoundById {
  return 'id' in params
}
