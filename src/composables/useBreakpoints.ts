import { computed, onMounted, onUnmounted, ref } from 'vue'
import { breakpoints } from '@/themes/tokens'
import { currentBreakpoint } from '@/utils/breakpoints'

export function useBreakpoints() {
  const width = ref(typeof window === 'undefined' ? breakpoints.desktop : window.innerWidth)

  const update = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return {
    width,
    name: computed(() => currentBreakpoint(width.value)),
    isMobile: computed(() => width.value < breakpoints.tablet),
    isTablet: computed(() => width.value >= breakpoints.tablet && width.value < breakpoints.desktop),
    isDesktop: computed(() => width.value >= breakpoints.desktop),
    isNavDesktop: computed(() => width.value >= breakpoints.nav),
    isLargeDesktop: computed(() => width.value >= breakpoints.xxl),
  }
}
