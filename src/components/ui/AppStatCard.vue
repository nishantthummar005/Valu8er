<script setup lang="ts">
import AppCard from './AppCard.vue'
import AppIcon from './AppIcon.vue'
import AppBadge from './AppBadge.vue'

defineProps<{
  label: string
  value: string
  delta?: string
  icon?: string
}>()
</script>

<template>
  <AppCard variant="metric" class="app-stat">
    <div class="app-stat__top">
      <span class="text-caption">{{ label }}</span>
      <span v-if="icon" class="app-stat__icon">
        <AppIcon :name="icon" :size="18" />
      </span>
    </div>
    <strong class="text-h2">{{ value }}</strong>
    <AppBadge v-if="delta" tone="brand">{{ delta }}</AppBadge>
  </AppCard>
</template>

<style scoped>
.app-stat {
  display: grid;
  gap: var(--space-3);
}

.app-stat__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.app-stat__icon {
  display: inline-flex;
  color: var(--color-brand-primary);
}
</style>
