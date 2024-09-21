import { api } from '@/services/api/apiClient'

import {
  CreateCollectionDTO,
  GetCollectionByIdDTO,
  UpdateCollectionDTO,
} from '@/types/components/models/collection/CollectionDTO'

type MutateCollectionParams =
  | {
      id: string
      collection: UpdateCollectionDTO
    }
  | {
      id: undefined
      collection: CreateCollectionDTO
    }

export async function mutateCollection(
  params: MutateCollectionParams,
): Promise<GetCollectionByIdDTO> {
  if (params.id) {
    const res = await api.put<GetCollectionByIdDTO>(
      `/v1/collections/${params.id}`,
      params.collection,
    )
    return res.data
  }
  const res = await api.post<GetCollectionByIdDTO>(
    `/v1/collections`,
    params.collection,
  )
  return res.data
}
