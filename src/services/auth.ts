import axios from 'axios'

export interface SsoRequestPayload {
  email: string
  password: string
}

export interface SsoResponseData {
  token?: string
  consume_url?: string
  [key: string]: any
}

export interface SsoResponse {
  success?: boolean
  token?: string
  consume_url?: string
  data?: SsoResponseData
  message?: string
}

/**
 * Sends SSO login request to backend:
 * POST https://valu8er.instaging.net/api/v1/sso/request
 */
export async function requestSsoLogin(
  payload: SsoRequestPayload,
): Promise<{ token: string; consume_url: string }> {
  const endpoints = [
    '/api/v1/sso/request',
    'https://valu8er.instaging.net/api/v1/sso/request',
  ]

  let lastError: any = null

  for (const url of endpoints) {
    try {
      const response = await axios.post<SsoResponse>(url, payload, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const raw = response.data
      const data = (raw?.data || raw) as SsoResponseData

      const token = data?.token || raw?.token || ''
      const consumeUrl = data?.consume_url || raw?.consume_url || ''

      return {
        token,
        consume_url: consumeUrl,
      }
    } catch (err: any) {
      lastError = err
      // If 401 or 422, it's a valid response from the auth server with invalid credentials
      if (err.response?.status === 401 || err.response?.status === 422) {
        throw err
      }
    }
  }

  throw lastError || new Error('Network error. Unable to connect to authentication server.')
}
