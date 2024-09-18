export type GetDTO<U extends string, T> = {
  [key in `${U}`]: T[]
} & {
  metadata: {
    totalRows: number
    offset: number
    limit: number
  }
}
