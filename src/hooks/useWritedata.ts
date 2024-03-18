import { ref, set } from 'firebase/database'
import { db } from '@/services/firebase'

type Props = {
  path: string
}

type Return<T> = {
  write: (data: T) => void
}

export const useWriteData = <T>({ path }: Props): Return<T> => {
  const write = (data: T) => {
    set(ref(db, path), data)
  }

  return { write }
}
