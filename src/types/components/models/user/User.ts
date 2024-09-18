import { BaseEntity } from '../BaseEntity'

export type UserModel = {
  email: string
  name: string
  position?: string
  role: unknown // enum
}

export type UserEntity = UserModel & BaseEntity
