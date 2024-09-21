import { api } from '@/services/api/apiClient'

import {
  CreateCardDTO,
  GetCardByIdDTO,
  UpdateCardDTO,
} from '@/types/components/models/card/CardDTO'

export type mutateCardParams =
  | {
      cardId: string
      cardData: UpdateCardDTO
    }
  | {
      cardId: undefined
      cardData: CreateCardDTO
    }

export async function mutateCard({
  cardId,
  cardData,
}: mutateCardParams): Promise<GetCardByIdDTO> {
  if (cardId) {
    const res = await api.put<GetCardByIdDTO>(`/v1/cards/${cardId}`, cardData)
    return res.data
  }

  const res = await api.post<GetCardByIdDTO>(`/v1/cards`, cardData)

  return res.data
}
