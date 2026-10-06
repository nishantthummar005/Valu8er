import { computed } from 'vue'

export function useMotion() {
  const reduced = computed(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  return {
    reduced,
    duration: computed(() => (reduced.value ? 0 : 220)),
  }
}
