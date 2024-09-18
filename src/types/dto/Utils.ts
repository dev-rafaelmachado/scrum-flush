export type RemoveNull<T> = T extends null ? never : T

export type FullOptional<T> = {
  [P in keyof T]?: T[P]
}
