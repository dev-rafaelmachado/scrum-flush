import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
const REFRESH_TOKEN_COOKIE_NAME = process.env
  .NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string

export function signOut() {
  const cookieStore = cookies()

  cookieStore.delete(TOKEN_COOKIE_NAME)
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME)

  redirect('/login')
}
