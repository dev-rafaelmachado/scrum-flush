import { api } from '@/services/api/apiClient'

import {
  UpdateStorieDTO,
  CreateStorieDTO,
  GetStorieByIdDTO,
} from '@/types/components/models/storie/StorieDTO'

type MutateStorieParams =
  | {
      id: string
      storie: UpdateStorieDTO
    }
  | {
      id: undefined
      storie: CreateStorieDTO
    }

export async function mutateStorie(
  params: MutateStorieParams,
): Promise<GetStorieByIdDTO> {
  if (params.id) {
    const res = await api.put<GetStorieByIdDTO>(
      `/v1/stories/${params.id}`,
      params.storie,
    )
    return res.data
  }
  const res = await api.post<GetStorieByIdDTO>(`/v1/stories`, params.storie)
  return res.data
}
