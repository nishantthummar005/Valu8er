export interface ApiFaq {
  id: number
  question: string
  answer: string
  is_active: number
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface ApiFaqsResponse {
  success: boolean
  data: ApiFaq[]
}

export interface FaqItem {
  id?: number | string
  question: string
  answer: string
  link?: { label: string; to: string }
}

/**
 * Fetch FAQs dynamically from http://valu8er.instaging.net/api/v1/faqs
 * Supports Vite proxy, https, and http fallbacks with graceful offline degradation.
 */
export async function getFaqs(fallbackFaqs: FaqItem[] = []): Promise<FaqItem[]> {
  const endpoints = [
    '/api/v1/faqs',
    'https://valu8er.instaging.net/api/v1/faqs',
    'http://valu8er.instaging.net/api/v1/faqs',
  ]

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const result: ApiFaqsResponse = await response.json()
        if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
          const activeFaqs = result.data
            .filter((item) => item.is_active === 1)
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
            .map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))

          if (activeFaqs.length > 0) {
            return activeFaqs
          }
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  return fallbackFaqs
}

