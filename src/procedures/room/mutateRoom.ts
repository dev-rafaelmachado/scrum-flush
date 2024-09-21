import { api } from '@/services/api/apiClient'

import {
  CreateRoomDTO,
  UpdateRoomDTO,
  GetRoomByIdDTO,
} from '@/types/components/models/room/RoomDTO'

type MutateRoomParams =
  | {
      id: string
      room: UpdateRoomDTO
    }
  | {
      id: undefined
      room: CreateRoomDTO
    }

export async function mutateRoom(
  params: MutateRoomParams,
): Promise<GetRoomByIdDTO> {
  if (params.id) {
    const res = await api.put<GetRoomByIdDTO>(
      `/v1/rooms/${params.id}`,
      params.room,
    )
    return res.data
  }
  const res = await api.post<GetRoomByIdDTO>(`/v1/rooms`, params.room)
  return res.data
}
