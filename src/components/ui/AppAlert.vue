<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'info' | 'success' | 'warning' | 'error'
    title?: string
  }>(),
  {
    tone: 'info',
  },
)
</script>

<template>
  <div class="app-alert" :class="`app-alert--${tone}`" role="status">
    <strong v-if="title" class="text-label">{{ title }}</strong>
    <p class="text-body-sm">
      <slot />
    </p>
  </div>
</template>

<style scoped>
.app-alert {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-info);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.app-alert p {
  margin: 0;
}

.app-alert--success {
  border-left-color: var(--color-success);
}

.app-alert--warning {
  border-left-color: var(--color-warning);
}

.app-alert--error {
  border-left-color: var(--color-error);
}
</style>
