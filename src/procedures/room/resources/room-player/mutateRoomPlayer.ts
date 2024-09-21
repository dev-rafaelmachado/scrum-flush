import { api } from '@/services/api/apiClient'

import {
  UpdateRoomPlayerDTO,
  CreateRoomPlayerDTO,
  GetRoomPlayerByIdDTO,
} from '@/types/components/models/room/resources/room-player/RoomPlayerDTO'

type MutateRoomPlayerParams =
  | {
      id: string
      roomPlayer: UpdateRoomPlayerDTO
    }
  | {
      id: undefined
      roomPlayer: CreateRoomPlayerDTO
    }

export async function mutateRoomPlayer(
  params: MutateRoomPlayerParams,
): Promise<GetRoomPlayerByIdDTO> {
  if (params.id) {
    const res = await api.put<GetRoomPlayerByIdDTO>(
      `/v1/room-players/${params.id}`,
      params.roomPlayer,
    )
    return res.data
  }
  const res = await api.post<GetRoomPlayerByIdDTO>(
    `/v1/room-players`,
    params.roomPlayer,
  )
  return res.data
}
