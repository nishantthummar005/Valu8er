import axios from 'axios'

export interface SsoRequestPayload {
  email: string
  password: string
}

export interface UserOrganization {
  id?: number
  uuid?: string
  company_name?: string
  logo?: string
  [key: string]: any
}

export interface UserPlan {
  id?: number
  name?: string
  price?: string
  [key: string]: any
}

export interface AuthUser {
  id: number
  first_name: string
  last_name: string
  full_name: string
  email: string
  phone?: string | null
  avatar?: string | null
  status?: string
  organization?: UserOrganization | null
  current_plan?: UserPlan | null
  [key: string]: any
}

export interface SsoResponse {
  user?: AuthUser
  token: string
  consume_url: string
  [key: string]: any
}

export interface LoginResult {
  user?: AuthUser
  token: string
  consume_url: string
}

/**
 * SSO Authentication endpoint as verified in Postman:
 * POST https://valu8er.instaging.net/api/v1/sso/request
 */
export const SSO_API_URL = 'https://valu8er.instaging.net/api/v1/sso/request'

export async function requestSsoLogin(
  payload: SsoRequestPayload,
): Promise<LoginResult> {
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
      const user = response.data?.user

      if (!token || !consumeUrl) {
        throw new Error('Authentication response did not return token or consume_url.')
      }

      return {
        user,
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

/**
 * SSO Logout endpoint as verified in Postman / API docs:
 * POST https://valu8er.instaging.net/api/v1/sso/logout
 */
export const SSO_LOGOUT_API_URL = 'https://valu8er.instaging.net/api/v1/sso/logout'

export async function requestSsoLogout(token?: string | null): Promise<void> {
  const endpoints = [
    SSO_LOGOUT_API_URL,
    '/api/v1/sso/logout',
  ]

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const payload = token ? { token } : {}

  for (const url of endpoints) {
    try {
      await axios.post(
        url,
        payload,
        {
          headers,
          timeout: 6000,
        },
      )
      return
    } catch {
      // Continue to next endpoint or silently proceed
    }
  }
}
