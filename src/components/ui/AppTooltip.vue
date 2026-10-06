<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <v-tooltip :text="text">
    <template #activator="{ props }">
      <span v-bind="props">
        <slot />
      </span>
    </template>
  </v-tooltip>
</template>
