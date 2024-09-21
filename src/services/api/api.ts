import { GetServerSidePropsContext, PreviewData } from 'next'

import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { ParsedUrlQuery } from 'querystring'

import { AuthTokenError } from '@/shared/utils/errors/AuthToken'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const REFRESH_ENDPOINT = '/v1/refresh'

const REFRESH_TOKEN_COOKIE_NAME = 'scrum-flush.refreshToken'
const TOKEN_COOKIE_NAME = 'scrum-flush.token'

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

export function setupAPIClient(
  ctx?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: BASE_URL,
  })

  // Add token and companyTenantId to headers in requests
  api.defaults.headers.common.Authorization = `Bearer ${cookies[TOKEN_COOKIE_NAME]}`

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AxiosErrorResponse>) => {
      const originalRequest = error.config

      // If the error is authentication-related and the token is expired
      if (
        error.response?.status === 401 &&
        error.response.data?.message === 'JWT is expired'
      ) {
        cookies = parseCookies(ctx) // Update cookies

        const { [REFRESH_TOKEN_COOKIE_NAME]: refreshToken } = cookies

        // If not already refreshing the token
        if (!isRefreshing) {
          isRefreshing = true

          try {
            // Make the token refresh request
            const response = await api.post(REFRESH_ENDPOINT, { refreshToken })

            const newToken = response.headers.authorization
            const newRefreshToken = response.data.refreshToken

            // Update cookies with the new token
            setCookie(ctx, TOKEN_COOKIE_NAME, newToken, COOKIE_OPTIONS)

            // Update axios header with the new token
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`

            // Update the refresh token
            setCookie(
              ctx,
              REFRESH_TOKEN_COOKIE_NAME,
              newRefreshToken,
              COOKIE_OPTIONS,
            )

            // Process all failed requests due to expired token
            failedRequestsQueue.forEach((request) =>
              request.onSuccess(newToken),
            )
            failedRequestsQueue = []
          } catch (error) {
            // Token refresh failed, force logout
            failedRequestsQueue.forEach((request) =>
              request.onFailure(error as AxiosError<AxiosErrorResponse>),
            )
            failedRequestsQueue = []

            if (typeof window !== 'undefined') {
              //   signOut();
              console.log('signOut')
            }
          } finally {
            isRefreshing = false
          }
        }

        // Put the request in the waiting queue until the token is renewed
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
        // If it's any other type of error, not related to expired token
        if (typeof window !== 'undefined') {
          //   signOut();
          console.log('signOut')
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(error)
    },
  )

  return api
}
