<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info'
  }>(),
  {
    tone: 'neutral',
  },
)
</script>

<template>
  <span class="app-badge" :class="`app-badge--${tone}`">
    <slot />
  </span>
</template>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
  min-height: 1.5rem;
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1;
}

.app-badge--neutral {
  background: var(--color-surface-muted);
  color: var(--color-text-secondary);
}

.app-badge--brand {
  background: color-mix(in srgb, var(--color-brand-primary) 14%, transparent);
  color: var(--color-brand-deep);
}

[data-theme='dark'] .app-badge--brand {
  color: var(--color-brand-highlight);
}

.app-badge--success {
  background: color-mix(in srgb, var(--color-success) 14%, transparent);
  color: var(--color-success);
}

.app-badge--warning {
  background: color-mix(in srgb, var(--color-warning) 16%, transparent);
  color: var(--color-warning);
}

.app-badge--error {
  background: color-mix(in srgb, var(--color-error) 14%, transparent);
  color: var(--color-error);
}

.app-badge--info {
  background: color-mix(in srgb, var(--color-info) 14%, transparent);
  color: var(--color-info);
}
</style>
