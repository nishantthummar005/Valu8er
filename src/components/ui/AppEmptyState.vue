<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="app-empty">
    <span v-if="icon" class="app-empty__icon" aria-hidden="true">
      <AppIcon :name="icon" :size="28" />
    </span>
    <h3 class="text-h4">{{ title }}</h3>
    <p v-if="description" class="text-body-sm">{{ description }}</p>
    <div v-if="$slots.default" class="app-empty__actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  padding: var(--space-10) var(--space-6);
  text-align: center;
}

.app-empty__icon {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
}

.app-empty__actions {
  margin-top: var(--space-2);
}
</style>
