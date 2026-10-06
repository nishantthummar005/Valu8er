<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppInput from '@/components/ui/AppInput.vue'

withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    hint?: string
    error?: string
    disabled?: boolean
    autocomplete?: string
    name?: string
    id?: string
  }>(),
  {
    label: 'Password',
    autocomplete: 'current-password',
  },
)

const model = defineModel<string>({ default: '' })
const visible = ref(false)
</script>

<template>
  <AppInput
    v-model="model"
    :id="id"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :hint="hint"
    :error="error"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :type="visible ? 'text' : 'password'"
  >
    <template #append-inner>
      <button
        class="password-toggle"
        type="button"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        :aria-pressed="visible"
        :disabled="disabled"
        @click="visible = !visible"
      >
        <AppIcon :name="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'" :size="18" />
      </button>
    </template>
  </AppInput>
</template>

<style scoped>
.password-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-inline-end: -0.45rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
}

.password-toggle:hover:not(:disabled) {
  color: var(--color-text);
}

.password-toggle:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}
</style>
