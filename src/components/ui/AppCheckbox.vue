<script setup lang="ts">
import { useSlots } from 'vue'

defineProps<{
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
}>()

const model = defineModel<boolean>({ default: false })
const slots = useSlots()
</script>

<template>
  <v-checkbox
    v-model="model"
    class="app-field"
    :label="slots.default ? undefined : label"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    :persistent-hint="Boolean(hint)"
    :hide-details="error || hint ? false : 'auto'"
  >
    <template v-if="slots.default" #label>
      <slot />
    </template>
  </v-checkbox>
</template>
