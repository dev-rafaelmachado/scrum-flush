import { api } from '@/services/api/apiClient'

import {
  GetRoomByIdDTO,
  GetRoomDTO,
} from '@/types/components/models/room/RoomDTO'

type QueryRoomById = {
  id: string
}

type QueryRoomList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryRoom = QueryRoomById | QueryRoomList

export function queryRoom(params: QueryRoomById): Promise<GetRoomByIdDTO>
export function queryRoom(params: QueryRoomList): Promise<GetRoomDTO>

export async function queryRoom(
  params: QueryRoom,
): Promise<GetRoomByIdDTO | GetRoomDTO> {
  if (isQueryRoomById(params)) {
    const res = await api.get<GetRoomByIdDTO>(`/v1/rooms/${params.id}`)
    return res.data
  }
  const res = await api.get<GetRoomDTO>(`/v1/rooms`, {
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

function isQueryRoomById(params: QueryRoom): params is QueryRoomById {
  return 'id' in params
}
