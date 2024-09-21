import { api } from '@/services/api/apiClient'

import {
  GetCardByIdDTO,
  GetCardDTO,
} from '@/types/components/models/card/CardDTO'

type QueryCardById = {
  id: string
}

type QueryCardList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryCard = QueryCardById | QueryCardList

export function queryCard(params: QueryCardById): Promise<GetCardByIdDTO>
export function queryCard(params: QueryCardList): Promise<GetCardDTO>

export async function queryCard(
  params: QueryCard,
): Promise<GetCardByIdDTO | GetCardDTO> {
  if (isQueryCardById(params)) {
    const res = await api.get<GetCardByIdDTO>(`/v1/cards/${params.id}`)
    return res.data
  }
  const res = await api.get<GetCardDTO>(`/v1/cards`, {
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

function isQueryCardById(params: QueryCard): params is QueryCardById {
  return 'id' in params
}
