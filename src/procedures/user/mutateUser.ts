import { api } from '@/services/api/apiClient'

import {
  UpdateUserDTO,
  CreateUserDTO,
  GetUserByIdDTO,
} from '@/types/components/models/user/UserDTO'

type MutateUserParams =
  | {
      id: string
      user: UpdateUserDTO
    }
  | {
      id: undefined
      user: CreateUserDTO
    }

export async function mutateUser(
  params: MutateUserParams,
): Promise<GetUserByIdDTO> {
  if (params.id) {
    const res = await api.put<GetUserByIdDTO>(
      `/v1/users/${params.id}`,
      params.user,
    )
    return res.data
  }
  const res = await api.post<GetUserByIdDTO>(`/v1/users`, params.user)
  return res.data
}
