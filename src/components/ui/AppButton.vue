<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'success' | 'danger' | 'icon'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    block?: boolean
    icon?: string
    label?: string
    to?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
)

const classes = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  props.block && 'app-button--block',
  props.loading && 'app-button--loading',
])

const tag = computed(() => (props.to ? RouterLink : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="to ? undefined : type"
    :class="classes"
    :disabled="to ? undefined : disabled || loading"
    :aria-disabled="to && (disabled || loading) ? true : undefined"
    :aria-busy="loading || undefined"
    :aria-label="variant === 'icon' ? label : undefined"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true" />
    <AppIcon v-else-if="icon" :name="icon" :size="size === 'sm' ? 16 : 18" />
    <span v-if="variant !== 'icon'" class="app-button__label">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0 var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.app-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.app-button:active:not(:disabled) {
  transform: translateY(0);
}

.app-button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
  transform: none;
}

.app-button--block {
  width: 100%;
}

.app-button--sm {
  min-height: 2.25rem;
  padding-inline: var(--space-3);
  font-size: 0.8125rem;
}

.app-button--lg {
  min-height: 2.75rem;
  padding-inline: var(--space-5);
}

.app-button--primary {
  background: linear-gradient(180deg, var(--color-brand-bright), var(--color-brand-primary));
  color: #062321;
  box-shadow: var(--shadow-xs);
}

.app-button--primary:hover:not(:disabled) {
  box-shadow: var(--shadow-sm);
}

.app-button--secondary {
  background: var(--color-surface-inverse);
  color: var(--color-text-inverse);
}

.app-button--outline {
  border-color: var(--color-border-strong);
  background: var(--color-surface);
}

.app-button--outline:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--color-brand-primary) 45%, var(--color-border-strong));
}

.app-button--ghost,
.app-button--icon {
  background: transparent;
  border-color: transparent;
}

.app-button--ghost:hover:not(:disabled),
.app-button--icon:hover:not(:disabled) {
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
}

.app-button--text {
  padding-inline: var(--space-2);
  color: var(--color-brand-primary);
}

.app-button--success {
  background: var(--color-success);
  color: #fff;
}

.app-button--danger {
  background: var(--color-error);
  color: #fff;
}

.app-button--icon {
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
}

.app-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-button,
  .app-button:hover:not(:disabled) {
    transform: none;
  }

  .app-button__spinner {
    animation: none;
    border-right-color: currentColor;
  }
}
</style>
