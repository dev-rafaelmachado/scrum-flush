import { cookies } from 'next/headers'

import axios, { AxiosError } from 'axios'

import { AuthTokenError } from '@/shared/utils/errors/AuthToken'

import { signOut } from '../auth/signOut'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const REFRESH_ENDPOINT = '/v1/refresh'

const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
const REFRESH_TOKEN_COOKIE_NAME = process.env
  .NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/', // Cookie path
}

interface AxiosErrorResponse {
  message: string
  status: number
}

let isRefreshing = false
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}[] = []

export function setupAPIClient() {
  const cookieStore = cookies()
  const api = axios.create({
    baseURL: BASE_URL,
  })

  // Get the current token from cookies and set it in axios headers
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value
  api.defaults.headers.common.Authorization = `Bearer ${token}`

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AxiosErrorResponse>) => {
      const originalRequest = error.config

      // Check if error is authentication-related and token is expired
      if (
        error.response?.status === 401 &&
        error.response.data?.message === 'JWT is expired'
      ) {
        const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value

        if (!isRefreshing) {
          isRefreshing = true

          try {
            const response = await api.post(REFRESH_ENDPOINT, { refreshToken })

            const newToken = response.headers.authorization
            const newRefreshToken = response.data.refreshToken

            cookieStore.set(TOKEN_COOKIE_NAME, newToken, COOKIE_OPTIONS)
            cookieStore.set(
              REFRESH_TOKEN_COOKIE_NAME,
              newRefreshToken,
              COOKIE_OPTIONS,
            )

            api.defaults.headers.common.Authorization = `Bearer ${newToken}`

            failedRequestsQueue.forEach((request) =>
              request.onSuccess(newToken),
            )
            failedRequestsQueue = []
          } catch (error) {
            failedRequestsQueue.forEach((request) =>
              request.onFailure(error as AxiosError<AxiosErrorResponse>),
            )
            failedRequestsQueue = []

            if (typeof window !== 'undefined') {
              signOut()
            }
          } finally {
            isRefreshing = false
          }
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (!originalRequest?.headers) return

              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            onFailure: (error: AxiosError) => {
              reject(error)
            },
          })
        })
      } else {
        if (typeof window !== 'undefined') {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
