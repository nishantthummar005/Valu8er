<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    radius?: string
  }>(),
  {
    width: '100%',
    height: '1rem',
    radius: 'var(--radius-sm)',
  },
)
</script>

<template>
  <span
    class="app-skeleton"
    :style="{ width, height, borderRadius: radius }"
    aria-hidden="true"
  />
</template>

<style scoped>
.app-skeleton {
  display: block;
  background: linear-gradient(
    90deg,
    var(--color-surface-muted) 0%,
    color-mix(in srgb, var(--color-surface) 70%, var(--color-surface-muted)) 50%,
    var(--color-surface-muted) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s var(--ease-in-out) infinite;
}

@keyframes shimmer {
  from {
    background-position: 100% 0;
  }

  to {
    background-position: -100% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-skeleton {
    animation: none;
  }
}
</style>
