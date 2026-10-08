<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
/** Light-colored mark — use on dark surfaces */
import markOnDark from '@/assets/brand/logo.svg'
/** Dark-colored mark — use on light surfaces */
import markOnLight from '@/assets/brand/logo-dark.svg'
import smallMark from '@/assets/brand/logo-small.svg'

const props = withDefaults(
  defineProps<{
    variant?: 'mark' | 'wordmark' | 'lockup'
    /** Logo height in px. Width follows the native asset ratio. */
    size?: number
    /** Force artwork that reads on dark surfaces regardless of app theme */
    onDark?: boolean
  }>(),
  {
    variant: 'lockup',
    size: 44,
    onDark: false,
  },
)

const theme = useThemeStore()

const useLightArtwork = computed(() => props.onDark || theme.isDark)

const mark = computed(() => {
  if (props.variant === 'wordmark') return smallMark
  return useLightArtwork.value ? markOnDark : markOnLight
})

/** Native mark ratio is 89 × 100 */
const markHeight = computed(() => props.size)
const markWidth = computed(() => {
  if (props.variant === 'wordmark') return Math.round(props.size * 1.4)
  return Math.round(props.size * (89 / 100))
})
</script>

<template>
  <div
    class="app-logo"
    :class="[
      `app-logo--${variant}`,
      { 'app-logo--on-dark': onDark || theme.isDark },
    ]"
  >
    <img
      :src="mark"
      alt=""
      aria-hidden="true"
      class="app-logo__mark"
      :width="markWidth"
      :height="markHeight"
      :style="{ width: `${markWidth}px`, height: `${markHeight}px` }"
      draggable="false"
    />
    <span v-if="variant === 'lockup'" class="app-logo__word">Valu8er</span>
  </div>
</template>

<style scoped>
.app-logo {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.75rem;
  min-height: 2.75rem;
  color: var(--color-text);
}

.app-logo__mark {
  display: block;
  flex: 0 0 auto;
  width: auto;
  max-width: none;
  object-fit: contain;
  object-position: center;
  user-select: none;
  pointer-events: none;
}

.app-logo__word {
  color: inherit;
  font-size: clamp(1.05rem, 0.95rem + 0.35vw, 1.2rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
  white-space: nowrap;
}

.app-logo--on-dark {
  color: #f8fafc;
}

.app-logo--mark .app-logo__word {
  display: none;
}

@media (max-width: 429px) {
  .app-logo {
    gap: 0.6rem;
  }

  .app-logo__word {
    font-size: 1.05rem;
  }
}
</style>
