import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthUser } from '@/services/auth'

const STORAGE_USER_KEY = 'valu8er_auth_user'
const STORAGE_TOKEN_KEY = 'valu8er_auth_token'
const STORAGE_CONSUME_KEY = 'valu8er_consume_url'
const STORAGE_CONSUMED_KEY = 'valu8er_token_consumed'

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(readStoredUser())
  const token = ref<string | null>(localStorage.getItem(STORAGE_TOKEN_KEY))
  const consumeUrl = ref<string | null>(localStorage.getItem(STORAGE_CONSUME_KEY))
  const tokenConsumed = ref<boolean>(localStorage.getItem(STORAGE_CONSUMED_KEY) === 'true')

  const isAuthenticated = computed(() => Boolean(user.value))

  const displayName = computed(() => {
    if (!user.value) return ''
    return (
      user.value.first_name ||
      user.value.full_name?.split(' ')[0] ||
      user.value.full_name ||
      'User'
    )
  })

  const fullName = computed(() => {
    if (!user.value) return ''
    return (
      user.value.full_name ||
      `${user.value.first_name || ''} ${user.value.last_name || ''}`.trim()
    )
  })

  const email = computed(() => user.value?.email || '')

  const organizationName = computed(() => user.value?.organization?.company_name || '')

  const initials = computed(() => {
    if (!user.value) return 'U'
    const first = (user.value.first_name || user.value.full_name || 'U').charAt(0).toUpperCase()
    const last = (user.value.last_name || '').charAt(0).toUpperCase()
    return `${first}${last}`.trim() || first
  })

  function setSession(authData: { user?: AuthUser; token?: string; consume_url?: string }) {
    if (authData.user) {
      user.value = authData.user
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(authData.user))
    }
    if (authData.token) {
      token.value = authData.token
      localStorage.setItem(STORAGE_TOKEN_KEY, authData.token)
    }
    if (authData.consume_url) {
      consumeUrl.value = authData.consume_url
      localStorage.setItem(STORAGE_CONSUME_KEY, authData.consume_url)
    }
    tokenConsumed.value = false
    localStorage.removeItem(STORAGE_CONSUMED_KEY)
  }

  function logout() {
    user.value = null
    token.value = null
    consumeUrl.value = null
    tokenConsumed.value = false
    localStorage.removeItem(STORAGE_USER_KEY)
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    localStorage.removeItem(STORAGE_CONSUME_KEY)
    localStorage.removeItem(STORAGE_CONSUMED_KEY)
  }

  function openDashboard() {
    if (consumeUrl.value && token.value && !tokenConsumed.value) {
      tokenConsumed.value = true
      localStorage.setItem(STORAGE_CONSUMED_KEY, 'true')
      window.location.href = `${consumeUrl.value}?token=${token.value}`
    } else {
      window.location.href = 'https://valu8er.instaging.net/dashboard'
    }
  }

  return {
    user,
    token,
    consumeUrl,
    tokenConsumed,
    isAuthenticated,
    displayName,
    fullName,
    email,
    organizationName,
    initials,
    setSession,
    logout,
    openDashboard,
  }
})
