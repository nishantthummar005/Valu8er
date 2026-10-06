<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    rows?: number
  }>(),
  {
    rows: 4,
  },
)

const model = defineModel<string>({ default: '' })
</script>

<template>
  <v-textarea
    v-model="model"
    class="app-field"
    :label="label"
    :placeholder="placeholder"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    :rows="rows"
    persistent-hint
    auto-grow
  />
</template>
