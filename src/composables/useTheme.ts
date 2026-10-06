import { useThemeStore } from '@/stores/theme'

export function useAppTheme() {
  const theme = useThemeStore()
  return theme
}
