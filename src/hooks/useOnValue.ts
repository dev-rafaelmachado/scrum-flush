import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '@/services/firebase'

type Props<T> = {
  path: string
  initialValue: T
}

type Return<T> = {
  value: T
}

export const useOnValue = <T>({ path, initialValue }: Props<T>): Return<T> => {
  const [value, setValue] = useState<T>(initialValue)
  const itRef = ref(db, path)

  useEffect(() => {
    onValue(itRef, (snapshot) => {
      const data = snapshot.val()
      setValue(data)
    })
  }, [itRef])

  return { value }
}
