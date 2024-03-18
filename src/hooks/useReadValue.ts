import { ref, child, get } from 'firebase/database'
import { db } from '@/services/firebase'

type Props = {
  path: string
}

type Return<T> = {
  read: () => Promise<T>
}

export const useReadValue = <T>({ path }: Props): Return<T> => {
  const read = async (): Promise<T> => {
    const dbRef = ref(db)
    return get(child(dbRef, path))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        } else {
          return null
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return { read }
}
