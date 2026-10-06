<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <v-text-field
    v-model="model"
    class="app-field"
    :label="label"
    :placeholder="placeholder || 'Search'"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    prepend-inner-icon="mdi-magnify"
    persistent-hint
    clearable
  />
</template>
