import { api } from '@/services/api/apiClient'

import {
  GetVoteByIdDTO,
  GetVoteDTO,
} from '@/types/components/models/vote/VoteDTO'

type QueryVoteById = {
  id: string
}

type QueryVoteList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryVote = QueryVoteById | QueryVoteList

export function queryVote(params: QueryVoteById): Promise<GetVoteByIdDTO>
export function queryVote(params: QueryVoteList): Promise<GetVoteDTO>

export async function queryVote(
  params: QueryVote,
): Promise<GetVoteByIdDTO | GetVoteDTO> {
  if (isQueryVoteById(params)) {
    const res = await api.get<GetVoteByIdDTO>(`/v1/votes/${params.id}`)
    return res.data
  }
  const res = await api.get<GetVoteDTO>(`/v1/votes`, {
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

function isQueryVoteById(params: QueryVote): params is QueryVoteById {
  return 'id' in params
}
