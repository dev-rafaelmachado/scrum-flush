import { api } from '@/services/api/apiClient'

import {
  GetCollectionByIdDTO,
  GetCollectionDTO,
} from '@/types/components/models/collection/CollectionDTO'

type QueryCollectionById = {
  id: string
}

type QueryCollectionList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryCollection = QueryCollectionById | QueryCollectionList

export function queryCollection(
  params: QueryCollectionById,
): Promise<GetCollectionByIdDTO>
export function queryCollection(
  params: QueryCollectionList,
): Promise<GetCollectionDTO>

export async function queryCollection(
  params: QueryCollection,
): Promise<GetCollectionByIdDTO | GetCollectionDTO> {
  if (isQueryCollectionById(params)) {
    const res = await api.get<GetCollectionByIdDTO>(
      `/v1/collections/${params.id}`,
    )
    return res.data
  }
  const res = await api.get<GetCollectionDTO>(`/v1/collections`, {
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

function isQueryCollectionById(
  params: QueryCollection,
): params is QueryCollectionById {
  return 'id' in params
}
