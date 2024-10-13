import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
const REFRESH_TOKEN_COOKIE_NAME = process.env
  .NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/', // Cookie path
}

export function signIn(token: string, refreshToken: string) {
  const cookieStore = cookies()
  cookieStore.set(TOKEN_COOKIE_NAME, token, COOKIE_OPTIONS)
  cookieStore.set(REFRESH_TOKEN_COOKIE_NAME, refreshToken, COOKIE_OPTIONS)

  redirect('/app')
}
