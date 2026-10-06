<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    wide?: boolean
  }>(),
  {
    wide: false,
  },
)
</script>

<template>
  <section class="auth-form-card" :class="{ 'is-wide': wide }">
    <header>
      <p v-if="eyebrow" class="auth-form-card__eyebrow">{{ eyebrow }}</p>
      <h1 class="text-h1">{{ title }}</h1>
      <p v-if="description" class="text-body">{{ description }}</p>
    </header>
    <div class="auth-form-card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="auth-form-card__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.auth-form-card {
  width: min(100%, 26.5rem);
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.auth-form-card.is-wide {
  width: min(100%, 32rem);
}

.auth-form-card header {
  display: grid;
  gap: var(--space-3);
}

.auth-form-card__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.auth-form-card__body,
.auth-form-card__footer {
  display: grid;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .auth-form-card {
    padding: var(--space-8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .auth-form-card {
    animation: none;
  }
}
</style>
