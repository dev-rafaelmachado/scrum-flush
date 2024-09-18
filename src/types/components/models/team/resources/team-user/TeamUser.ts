import { TeamUserRole } from '@/types/enums/TeamUserRole'
import { BaseEntity } from '../../../BaseEntity'

export type TeamUserModel = {
  teamId: string
  userId: string
  userRole: TeamUserRole
}

export type TeamUserEntity = TeamUserModel & BaseEntity
