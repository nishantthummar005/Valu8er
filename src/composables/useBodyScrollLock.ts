import { onUnmounted, watch, type Ref } from 'vue'

export function useBodyScrollLock(locked: Ref<boolean>) {
  const apply = (value: boolean) => {
    document.body.style.overflow = value ? 'hidden' : ''
  }

  watch(locked, apply, { immediate: true })

  onUnmounted(() => {
    document.body.style.overflow = ''
  })
}
