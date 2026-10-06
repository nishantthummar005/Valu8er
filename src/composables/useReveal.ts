import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useReveal(target: Ref<HTMLElement | null>, threshold = 0.18) {
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      visible.value = true
      return
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )

    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { visible }
}
