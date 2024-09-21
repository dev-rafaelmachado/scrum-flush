import { api } from '@/services/api/apiClient'

import {
  UpdateSprintDTO,
  CreateSprintDTO,
  GetSprintByIdDTO,
} from '@/types/components/models/sprint/SprintDTO'

type MutateSprintParams =
  | {
      id: string
      sprint: UpdateSprintDTO
    }
  | {
      id: undefined
      sprint: CreateSprintDTO
    }

export async function mutateSprint(
  params: MutateSprintParams,
): Promise<GetSprintByIdDTO> {
  if (params.id) {
    const res = await api.put<GetSprintByIdDTO>(
      `/v1/sprints/${params.id}`,
      params.sprint,
    )
    return res.data
  }
  const res = await api.post<GetSprintByIdDTO>(`/v1/sprints`, params.sprint)
  return res.data
}
