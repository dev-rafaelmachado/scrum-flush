export interface BaseEntity {
  id: string
  isDeleted: boolean
  modifiedAt?: Date
  modifiedById?: number
  createdAt: Date
  createdById: number
}
