import { BaseEntity } from '../../../BaseEntity'

export type TeamSprintModel = {
  sprintId: string
  teamId: string
}

export type TeamSprintEntity = TeamSprintModel & BaseEntity
