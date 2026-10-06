<script setup lang="ts">
defineProps<{
  label?: string
  disabled?: boolean
  value: string | number
}>()

const model = defineModel<string | number | null>({ default: null })
</script>

<template>
  <v-radio
    v-model="model"
    :label="label"
    :value="value"
    :disabled="disabled"
  />
</template>
