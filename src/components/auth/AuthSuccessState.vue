<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="auth-success" role="status" aria-live="polite">
    <span class="auth-success__icon" aria-hidden="true">
      <AppIcon name="mdi-check-circle-outline" :size="28" />
    </span>
    <h1 class="text-h1">{{ title }}</h1>
    <p class="text-body">{{ description }}</p>
    <div class="auth-success__actions">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.auth-success {
  width: min(100%, 26.5rem);
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.auth-success__icon {
  display: inline-flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 12%, var(--color-surface));
}

.auth-success__actions {
  display: grid;
  gap: var(--space-3);
  width: 100%;
  margin-top: var(--space-2);
}

@media (prefers-reduced-motion: reduce) {
  .auth-success {
    animation: none;
  }
}
</style>
