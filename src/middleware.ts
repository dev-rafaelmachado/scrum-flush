import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string
const REFRESH_ENDPOINT = '/v1/refresh'

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
const REFRESH_TOKEN_COOKIE_NAME = process.env
  .NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string

const PUBLIC_PATHS = ['/login', '/register']

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/',
}

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value
  const currentPath = req.nextUrl.pathname

  console.log('Middleware running on', currentPath)

  // Check if the page is public
  const isPublicPath = PUBLIC_PATHS.includes(currentPath)

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/app', req.url))
  }

  // If the page is not public and the token does not exist, redirect to /login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (!token) {
    return NextResponse.next()
  }

  // Token renewal logic
  try {
    const api = axios.create({ baseURL: BASE_URL })
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    // await api.get('/auth/validate')
    console.log('Token is valid')
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value

      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}${REFRESH_ENDPOINT}`, {
            refreshToken,
          })

          const newToken = response.headers.authorization
          const newRefreshToken = response.data.refreshToken

          // Update cookies with the new tokens
          cookieStore.set(TOKEN_COOKIE_NAME, newToken, COOKIE_OPTIONS)
          cookieStore.set(
            REFRESH_TOKEN_COOKIE_NAME,
            newRefreshToken,
            COOKIE_OPTIONS,
          )

          return NextResponse.next() // Token successfully renewed, continue to the page
        } catch {
          return NextResponse.redirect(new URL('/login', req.url))
        }
      } else {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|static).*)'],
}
