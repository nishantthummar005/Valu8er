import { onMounted, onUnmounted, ref } from 'vue'

export function useHeaderScroll(threshold = 8) {
  const scrolled = ref(false)

  const update = () => {
    scrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { scrolled }
}
