<script setup lang="ts">
import AppCard from './AppCard.vue'

withDefaults(
  defineProps<{
    title?: string
    width?: number | string
  }>(),
  {
    width: 480,
  },
)

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <v-dialog v-model="model" :width="width" scrollable>
    <AppCard class="app-dialog" padding="lg">
      <header v-if="title" class="app-dialog__header">
        <h3 class="text-h3">{{ title }}</h3>
      </header>
      <div class="app-dialog__body">
        <slot />
      </div>
      <footer v-if="$slots.actions" class="app-dialog__actions">
        <slot name="actions" />
      </footer>
    </AppCard>
  </v-dialog>
</template>

<style scoped>
.app-dialog__header {
  margin-bottom: var(--space-4);
}

.app-dialog__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
</style>
