import { api } from '@/services/api/apiClient'

import {
  GetUserByIdDTO,
  GetUserDTO,
} from '@/types/components/models/user/UserDTO'

type QueryUserById = {
  id: string
}

type QueryUserList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryUser = QueryUserById | QueryUserList

export function queryUser(params: QueryUserById): Promise<GetUserByIdDTO>
export function queryUser(params: QueryUserList): Promise<GetUserDTO>

export async function queryUser(
  params: QueryUser,
): Promise<GetUserByIdDTO | GetUserDTO> {
  if (isQueryUserById(params)) {
    const res = await api.get<GetUserByIdDTO>(`/v1/users/${params.id}`)
    return res.data
  }
  const res = await api.get<GetUserDTO>(`/v1/users`, {
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

function isQueryUserById(params: QueryUser): params is QueryUserById {
  return 'id' in params
}
