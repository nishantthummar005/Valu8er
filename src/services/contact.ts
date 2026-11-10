export interface ContactPayload {
  fname: string
  lname: string
  email: string
  phone: string
  company: string
  subject?: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: number
    fname: string
    lname: string
    phone: string
    company: string
    email: string
    subject?: string
    message: string
    created_at?: string
    updated_at?: string
  }
}

/**
 * Submits contact form data to the live API endpoint:
 * POST https://valu8er.instaging.net/api/v1/contact
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const endpoints = [
    '/api/v1/contact',
    'https://valu8er.instaging.net/api/v1/contact',
    'http://valu8er.instaging.net/api/v1/contact',
  ]

  let lastError: Error | null = null

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data?.success) {
        return data as ContactResponse
      }

      if (!response.ok) {
        let errorMsg = data?.message
        if (data?.errors && typeof data.errors === 'object') {
          const firstErrList = Object.values(data.errors)[0]
          if (Array.isArray(firstErrList) && firstErrList[0]) {
            errorMsg = firstErrList[0]
          }
        }
        throw new Error(errorMsg || 'Failed to submit contact message. Please try again.')
      }
    } catch (err: any) {
      lastError = err
      // If validation error from API (422), do not retry other URLs
      if (err?.message && !err.message.includes('fetch') && !err.message.includes('Failed to fetch')) {
        throw err
      }
    }
  }

  throw lastError || new Error('Network error: Unable to submit contact message. Please try again.')
}

