export interface CalendlyUser {
  uri: string
  name: string
  slug: string
  email: string
  scheduling_url: string
  timezone: string
  avatar_url?: string | null
  current_organization?: string
}

export interface CalendlyCustomQuestion {
  name: string
  type: string
  position: number
  required: boolean
  answer_choices?: string[]
}

export interface CalendlyEventType {
  uri: string
  name: string
  active: boolean
  slug: string
  scheduling_url: string
  duration: number
  kind: string
  color: string
  description_plain?: string | null
  description_html?: string | null
  locations?: Array<{ kind: string }>
  custom_questions?: CalendlyCustomQuestion[]
}

export const CALENDLY_TOKEN =
  'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzgxNTQxMzgwLCJqdGkiOiI3YzVkMjFkOS1mYzZjLTQ1MmYtYTE0Zi1lOTA2YTgxMzBiMTUiLCJ1c2VyX3V1aWQiOiJiNTFlYmY2Ni1lNGMwLTQxMzMtODg1OS1iZDA5NDNjZWVlZTciLCJzY29wZSI6ImF2YWlsYWJpbGl0eTpyZWFkIGF2YWlsYWJpbGl0eTp3cml0ZSBldmVudF90eXBlczpyZWFkIGV2ZW50X3R5cGVzOndyaXRlIGxvY2F0aW9uczpyZWFkIHJvdXRpbmdfZm9ybXM6cmVhZCBzaGFyZXM6d3JpdGUgc2NoZWR1bGVkX2V2ZW50czpyZWFkIHNjaGVkdWxlZF9ldmVudHM6d3JpdGUgc2NoZWR1bGluZ19saW5rczp3cml0ZSBncm91cHM6cmVhZCBvcmdhbml6YXRpb25zOnJlYWQgb3JnYW5pemF0aW9uczp3cml0ZSB1c2VyczpyZWFkIGNvbnRhY3RzOnJlYWQgY29udGFjdHM6d3JpdGUgYWN0aXZpdHlfbG9nOnJlYWQgZGF0YV9jb21wbGlhbmNlOndyaXRlIG91dGdvaW5nX2NvbW11bmljYXRpb25zOnJlYWQgd2ViaG9va3M6cmVhZCB3ZWJob29rczp3cml0ZSJ9.iyfvqhnSeSjv5DFNNzs378ncPk7oPdmkFgMwwVsmfgs_N7qtStrpwDd8KnYhETH_U9vPDUN6_K1HqJ-J8VoE0A'

// Built-in verified data from Calendly API for instant response & offline resilience
const FALLBACK_USER: CalendlyUser = {
  uri: 'https://api.calendly.com/users/b51ebf66-e4c0-4133-8859-bd0943ceeee7',
  name: 'Rim Grewal',
  slug: 'rim-valexp',
  email: 'rim@valu8er.com',
  scheduling_url: 'https://calendly.com/rim-valexp',
  timezone: 'America/New_York',
  current_organization: 'https://api.calendly.com/organizations/72e7463e-57e6-4606-83b3-aee6347a36e9',
}

const FALLBACK_EVENT_TYPES: CalendlyEventType[] = [
  {
    uri: 'https://api.calendly.com/event_types/1830fc5e-52f9-4218-a9bd-035b776b2475',
    name: 'Demo with Rim Grewal, MBA, CPA, CA, CBV, BVIUK, ABV',
    active: true,
    slug: 'valu8er-demo-1pm-est',
    scheduling_url: 'https://calendly.com/rim-valexp/valu8er-demo-1pm-est',
    duration: 60,
    kind: 'group',
    color: '#0D9488',
    description_plain:
      'This 1 hour zoom meeting covers a complete walkthrough of Valu8er valuation modeling, automated comps, and executive reporting.',
    locations: [{ kind: 'zoom_conference' }],
  },
  {
    uri: 'https://api.calendly.com/event_types/9e2b5534-1122-4361-89c0-fda94306199c',
    name: 'CBV or ASA - ABV Advisory Support 30 Min Call',
    active: true,
    slug: 'cbv-or-asa-abv-advisory-support-30-min-call',
    scheduling_url: 'https://calendly.com/rim-valexp/cbv-or-asa-abv-advisory-support-30-min-call',
    duration: 30,
    kind: 'solo',
    color: '#0284C7',
    description_plain:
      'Direct 30-minute advisory consultation on valuation methodologies, engagement scoping, and model customization.',
    locations: [{ kind: 'zoom_conference' }],
  },
  {
    uri: 'https://api.calendly.com/event_types/9aa44b54-8c19-4319-9f26-2e03dc9cd316',
    name: 'CBV or ASA - ABV Advisory Support 15 Min Call',
    active: true,
    slug: 'cbv-or-asa-abv-advisory-support-15-min-call',
    scheduling_url: 'https://calendly.com/rim-valexp/cbv-or-asa-abv-advisory-support-15-min-call',
    duration: 15,
    kind: 'solo',
    color: '#6366F1',
    description_plain:
      'Quick 15-minute introductory alignment and technical Q&A regarding Valu8er capabilities.',
    locations: [{ kind: 'zoom_conference' }, { kind: 'outbound_call' }],
  },
]

/**
 * Fetch current user details from Calendly API (/users/me)
 */
export async function getCalendlyUser(): Promise<CalendlyUser> {
  const endpoints = ['/api/calendly/users/me', 'https://api.calendly.com/users/me']

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data?.resource) {
          return data.resource as CalendlyUser
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  return FALLBACK_USER
}

/**
 * Fetch active event types for the user from Calendly API (/event_types)
 */
export async function getCalendlyEventTypes(userUri?: string): Promise<CalendlyEventType[]> {
  const targetUserUri = userUri || FALLBACK_USER.uri
  const queryParam = encodeURIComponent(targetUserUri)

  const endpoints = [
    `/api/calendly/event_types?user=${queryParam}`,
    `https://api.calendly.com/event_types?user=${queryParam}`,
  ]

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data?.collection && Array.isArray(data.collection)) {
          const activeEvents = data.collection.filter((ev: CalendlyEventType) => ev.active)
          if (activeEvents.length > 0) {
            return activeEvents as CalendlyEventType[]
          }
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  return FALLBACK_EVENT_TYPES
}

/**
 * Ensure Calendly Widget assets (CSS + JS) are loaded on the page
 */
export function ensureCalendlyAssetsLoaded(): Promise<boolean> {
  return new Promise((resolve) => {
    // 1. Load Calendly CSS
    if (!document.querySelector('link[href*="calendly"]')) {
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    // 2. Load Calendly Script
    if (window.Calendly) {
      resolve(true)
      return
    }

    const existingScript = document.querySelector('script[src*="calendly"]') as HTMLScriptElement | null
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true))
      setTimeout(() => resolve(Boolean(window.Calendly)), 1500)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.head.appendChild(script)

    setTimeout(() => resolve(Boolean(window.Calendly)), 2500)
  })
}

/**
 * Open Calendly popup widget for a specific scheduling URL
 */
export function openCalendlyPopup(url: string) {
  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url })
  } else {
    // If widget script is not yet loaded, open in new tab
    window.open(url, '_blank')
  }
}
