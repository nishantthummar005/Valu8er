import { ref } from 'vue'

export function useDemoForm() {
  const attempted = ref(false)
  const loading = ref(false)
  const succeeded = ref(false)

  async function submit(isValid: boolean) {
    attempted.value = true
    if (!isValid || loading.value || succeeded.value) return

    loading.value = true
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 160 : 800
    await new Promise((resolve) => window.setTimeout(resolve, delay))
    loading.value = false
    succeeded.value = true
  }

  function reset() {
    attempted.value = false
    loading.value = false
    succeeded.value = false
  }

  return { attempted, loading, succeeded, submit, reset }
}
