import { api } from '@/services/api/apiClient'

import {
  CreateRoundDTO,
  GetRoundByIdDTO,
  UpdateRoundDTO,
} from '@/types/components/models/round/RoundDTO'

type MutateRoundParams =
  | {
      id: string
      round: UpdateRoundDTO
    }
  | {
      id: undefined
      round: CreateRoundDTO
    }

export async function mutateRound(
  params: MutateRoundParams,
): Promise<GetRoundByIdDTO> {
  if (params.id) {
    const res = await api.put<GetRoundByIdDTO>(
      `/v1/rounds/${params.id}`,
      params.round,
    )
    return res.data
  }
  const res = await api.post<GetRoundByIdDTO>(`/v1/rounds`, params.round)
  return res.data
}
