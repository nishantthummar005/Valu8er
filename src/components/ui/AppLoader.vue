<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: 'Loading',
  },
)
</script>

<template>
  <div class="app-loader" role="status" :aria-label="label">
    <span class="app-loader__ring" />
    <span class="text-caption">{{ label }}</span>
  </div>
</template>

<style scoped>
.app-loader {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
}

.app-loader__ring {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--color-border-strong);
  border-top-color: var(--color-brand-primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-loader__ring {
    animation: none;
    border-top-color: var(--color-border-strong);
  }
}
</style>
