<script setup lang="ts">
withDefaults(
  defineProps<{
    accent?: boolean
  }>(),
  {
    accent: false,
  },
)
</script>

<template>
  <hr class="app-divider" :class="{ 'accent-rule': accent }" />
</template>

<style scoped>
.app-divider {
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background: var(--color-border);
}
</style>
