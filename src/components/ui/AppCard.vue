<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'standard' | 'outlined' | 'elevated' | 'feature' | 'metric' | 'interactive' | 'glass'
    padding?: 'sm' | 'md' | 'lg'
  }>(),
  {
    variant: 'standard',
    padding: 'md',
  },
)

const classes = computed(() => [
  'app-card',
  `app-card--${props.variant}`,
  `app-card--pad-${props.padding}`,
])
</script>

<template>
  <article :class="classes">
    <slot />
  </article>
</template>

<style scoped>
.app-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
}

.app-card--pad-sm {
  padding: var(--space-4);
}

.app-card--pad-md {
  padding: var(--space-6);
}

.app-card--pad-lg {
  padding: var(--space-8);
}

.app-card--outlined {
  background: transparent;
}

.app-card--elevated {
  box-shadow: var(--shadow-sm);
}

.app-card--feature {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 7%, var(--color-surface)), var(--color-surface));
  box-shadow: var(--shadow-sm);
}

.app-card--feature::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--color-brand-primary), transparent 70%);
}

.app-card--metric {
  background: var(--color-surface-elevated);
}

.app-card--interactive {
  cursor: pointer;
  transition:
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out);
}

.app-card--interactive:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
  box-shadow: var(--shadow-md);
}

.app-card--glass {
  background: color-mix(in srgb, var(--color-surface) 78%, transparent);
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-xs);
}

@media (prefers-reduced-motion: reduce) {
  .app-card--interactive:hover {
    transform: none;
  }
}
</style>
