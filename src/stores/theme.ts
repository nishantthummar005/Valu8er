import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useTheme as useVuetifyTheme } from 'vuetify'
import { applyCssVariables, type ThemeMode } from '@/themes/tokens'

const STORAGE_KEY = 'valu8er-theme'

function readStoredTheme(): ThemeMode | null {
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' ? value : null
}

function systemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const vuetifyTheme = useVuetifyTheme()
  const mode = ref<ThemeMode>('light')

  const isDark = computed(() => mode.value === 'dark')

  function apply(next: ThemeMode) {
    mode.value = next
    applyCssVariables(next)
    vuetifyTheme.change(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  function toggle() {
    apply(mode.value === 'dark' ? 'light' : 'dark')
  }

  function init() {
    apply(readStoredTheme() ?? systemTheme())
  }

  return {
    mode,
    isDark,
    apply,
    toggle,
    init,
  }
})
