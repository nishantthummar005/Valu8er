<script setup lang="ts">
defineProps<{
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
}>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <v-switch
    v-model="model"
    class="app-field"
    :label="label"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    persistent-hint
  />
</template>
