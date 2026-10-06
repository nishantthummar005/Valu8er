<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import lightMark from '@/assets/brand/logo.svg'
import darkMark from '@/assets/brand/logo-dark.svg'
import smallMark from '@/assets/brand/logo-small.svg'

const props = withDefaults(
  defineProps<{
    variant?: 'mark' | 'wordmark' | 'lockup'
    size?: number
  }>(),
  {
    variant: 'lockup',
    size: 36,
  },
)

const theme = useThemeStore()

const mark = computed(() => {
  if (props.variant === 'wordmark') return smallMark
  return theme.isDark ? darkMark : lightMark
})

const height = computed(() => `${props.size}px`)
const width = computed(() => (props.variant === 'wordmark' ? `${Math.round(props.size * 1.45)}px` : `${Math.round(props.size * 0.9)}px`))
</script>

<template>
  <div class="app-logo" :class="`app-logo--${variant}`">
    <img
      :src="mark"
      alt="Valu8er"
      class="app-logo__mark"
      :style="{ height, width }"
    />
    <span v-if="variant === 'lockup'" class="app-logo__word text-h4">Valu8er</span>
  </div>
</template>

<style scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--space-3);
  min-height: 44px;
}

.app-logo__mark {
  object-fit: contain;
}

.app-logo__word {
  letter-spacing: -0.03em;
  white-space: nowrap;
}
</style>
