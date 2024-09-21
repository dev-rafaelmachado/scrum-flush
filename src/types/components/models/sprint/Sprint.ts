import { SprintStatus } from '@/types/enums/SprintStatus'

import { BaseEntity } from '../BaseEntity'

export type SprintModel = {
  name: string
  status: SprintStatus
  totalPoints: number
}

export type SprintEntity = SprintModel & BaseEntity
