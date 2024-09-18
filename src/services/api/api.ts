import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { AuthTokenError } from '@/utils/errors/AuthToken'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const REFRESH_ENDPOINT = '/v1/refresh'

const REFRESH_TOKEN_COOKIE_NAME = 'scrum-flush.refreshToken'
const TOKEN_COOKIE_NAME = 'scrum-flush.token'

const COOKIE_OPTIONS = {
  maxAge: 30 * 24 * 60 * 60, // 30 dias
  path: '/', // Caminho para o cookie
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

  // Adiciona o token e o companyTenantId aos headers nas requisições
  api.defaults.headers.common.Authorization = `Bearer ${cookies[TOKEN_COOKIE_NAME]}`

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AxiosErrorResponse>) => {
      const originalRequest = error.config

      // Se o erro for de autenticação e o token estiver expirado
      if (
        error.response?.status === 401 &&
        error.response.data?.message === 'JWT is expired'
      ) {
        cookies = parseCookies(ctx) // Atualiza os cookies

        const { [REFRESH_TOKEN_COOKIE_NAME]: refreshToken } = cookies

        // Se não está já em processo de refresh do token
        if (!isRefreshing) {
          isRefreshing = true

          try {
            // Faz a requisição de refresh do token
            const response = await api.post(REFRESH_ENDPOINT, { refreshToken })

            const newToken = response.headers.authorization
            const newRefreshToken = response.data.refreshToken

            // Atualiza os cookies com o novo token
            setCookie(ctx, TOKEN_COOKIE_NAME, newToken, COOKIE_OPTIONS)

            // Atualiza o header do axios com o novo token
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`

            // Atualiza o refresh token
            setCookie(
              ctx,
              REFRESH_TOKEN_COOKIE_NAME,
              newRefreshToken,
              COOKIE_OPTIONS,
            )

            // Processa todas as requisições que falharam por conta do token expirado
            failedRequestsQueue.forEach((request) =>
              request.onSuccess(newToken),
            )
            failedRequestsQueue = []
          } catch (error) {
            // Falha no refresh do token, força o logout
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

        // Coloca a requisição na fila de espera até o token ser renovado
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
        // Se for qualquer outro tipo de erro, que não seja de token expirado
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
