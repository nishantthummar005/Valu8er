import axios from 'axios'

export interface SsoRequestPayload {
  email: string
  password: string
}

export interface SsoResponse {
  token: string
  consume_url: string
  [key: string]: any
}

/**
 * SSO Authentication endpoint as verified in Postman:
 * POST https://valu8er.instaging.net/api/v1/sso/request
 */
export const SSO_API_URL = 'https://valu8er.instaging.net/api/v1/sso/request'

export async function requestSsoLogin(
  payload: SsoRequestPayload,
): Promise<{ token: string; consume_url: string }> {
  const endpoints = [
    SSO_API_URL,
    '/api/v1/sso/request',
  ]

  let lastError: any = null

  for (const url of endpoints) {
    try {
      const response = await axios.post<SsoResponse>(
        url,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      const token = response.data?.token || ''
      const consumeUrl = response.data?.consume_url || ''

      if (!token || !consumeUrl) {
        throw new Error('Authentication response did not return token or consume_url.')
      }

      return {
        token,
        consume_url: consumeUrl,
      }
    } catch (err: any) {
      lastError = err
      // If 401 or 422, it's a valid response from auth server with invalid credentials
      if (err.response?.status === 401 || err.response?.status === 422) {
        throw err
      }
    }
  }

  throw lastError || new Error('Network error. Unable to connect to authentication server.')
}

