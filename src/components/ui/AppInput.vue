<script setup lang="ts">
import { useSlots } from 'vue'

withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    type?: string
    autocomplete?: string
    name?: string
    id?: string
  }>(),
  {
    type: 'text',
  },
)

const model = defineModel<string>({ default: '' })
const slots = useSlots()
</script>

<template>
  <v-text-field
    v-model="model"
    class="app-field"
    :id="id"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :hint="hint"
    :error-messages="error"
    :disabled="disabled"
    :type="type"
    :autocomplete="autocomplete"
    :persistent-hint="Boolean(hint)"
    :hide-details="error || hint ? false : 'auto'"
  >
    <template v-if="slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
  </v-text-field>
</template>
