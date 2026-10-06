<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  items: Array<string | { title: string; value: string | number }>
}>()

const model = defineModel<string | number | null>({ default: null })
</script>

<template>
  <v-autocomplete
    v-model="model"
    class="app-field"
    :items="items"
    :label="label"
    :placeholder="placeholder"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    persistent-hint
    auto-select-first
  />
</template>
