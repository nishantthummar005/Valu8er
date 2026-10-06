<script setup lang="ts">
defineProps<{
  items: Array<{ value: string; label: string }>
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <v-tabs v-model="model" class="app-tabs" color="primary" slider-color="primary">
    <v-tab v-for="item in items" :key="item.value" :value="item.value">
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<style scoped>
.app-tabs {
  border-bottom: 1px solid var(--color-border);
}
</style>
