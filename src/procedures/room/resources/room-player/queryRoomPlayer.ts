import { api } from '@/services/api/apiClient'

import {
  GetRoomPlayerByIdDTO,
  GetRoomPlayerDTO,
} from '@/types/components/models/room/resources/room-player/RoomPlayerDTO'

type QueryRoomPlayerById = {
  id: string
}

type QueryRoomPlayerList = {
  limit: number
  offset: number
  orderBy: string
  sortBy: string
  searchKey: string
}

type QueryRoomPlayer = QueryRoomPlayerById | QueryRoomPlayerList

export function queryRoomPlayer(
  params: QueryRoomPlayerById,
): Promise<GetRoomPlayerByIdDTO>
export function queryRoomPlayer(
  params: QueryRoomPlayerList,
): Promise<GetRoomPlayerDTO>

export async function queryRoomPlayer(
  params: QueryRoomPlayer,
): Promise<GetRoomPlayerByIdDTO | GetRoomPlayerDTO> {
  if (isQueryRoomPlayerById(params)) {
    const res = await api.get<GetRoomPlayerByIdDTO>(
      `/v1/room-players/${params.id}`,
    )
    return res.data
  }
  const res = await api.get<GetRoomPlayerDTO>(`/v1/room-players`, {
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

function isQueryRoomPlayerById(
  params: QueryRoomPlayer,
): params is QueryRoomPlayerById {
  return 'id' in params
}
