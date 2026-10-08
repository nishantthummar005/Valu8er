<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<template>
  <header class="app-page-header">
    <p v-if="eyebrow" class="text-caption">{{ eyebrow }}</p>
    <h1 class="text-h1 text-balance">{{ title }}</h1>
    <p v-if="description" class="text-body-lg text-pretty">{{ description }}</p>
    <div v-if="$slots.actions" class="app-page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.app-page-header {
  display: grid;
  gap: var(--space-3);
  min-width: 0;
}

.app-page-header :deep(*) {
  overflow-wrap: break-word;
}

.app-page-header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
</style>
