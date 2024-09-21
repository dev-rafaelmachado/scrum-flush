import { api } from '@/services/api/apiClient'

import {
  GetVoteByIdDTO,
  UpdateVoteDTO,
} from '@/types/components/models/vote/VoteDTO'

type MutateVoteParams =
  | {
      id: string
      vote: UpdateVoteDTO
    }
  | {
      id: undefined
      vote: UpdateVoteDTO
    }

export async function mutateVote(
  params: MutateVoteParams,
): Promise<GetVoteByIdDTO> {
  if (params.id) {
    const res = await api.put<GetVoteByIdDTO>(
      `/v1/votes/${params.id}`,
      params.vote,
    )
    return res.data
  }
  const res = await api.post<GetVoteByIdDTO>(`/v1/votes`, params.vote)
  return res.data
}
