<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section class="statement">
    <div class="statement__glow" aria-hidden="true" />
    <AppContainer size="xl">
      <div ref="root" class="statement__inner" :class="{ 'is-visible': visible }">
        <p class="statement__mark" aria-hidden="true">“</p>
        <h2 class="statement__title text-balance">
          Better understanding leads to
          <span class="heading-accent">better decisions.</span>
        </h2>
        <p class="statement__copy">
          The platform is designed around a simple goal: make the financial story behind a business
          easier to understand — so the next move feels clearer.
        </p>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.statement {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background:
    radial-gradient(circle at 20% 0%, var(--color-glow), transparent 40%),
    linear-gradient(180deg, var(--color-surface-muted) 0%, var(--color-bg) 100%);
  border-block: 1px solid var(--color-border);
}

.statement__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  background-image:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: linear-gradient(180deg, #000 10%, transparent 85%);
}

.statement__inner {
  position: relative;
  display: grid;
  gap: var(--space-5);
  opacity: 0;
  transform: translateY(12px);
}

.statement__inner.is-visible {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.statement__mark {
  margin: 0;
  color: color-mix(in srgb, var(--color-brand-primary) 45%, transparent);
  font-family: var(--font-display);
  font-size: clamp(4rem, 3rem + 4vw, 7rem);
  font-weight: 700;
  line-height: 0.7;
  letter-spacing: -0.06em;
}

.statement__title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 1.4rem + 2vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.12;
}

.statement__copy {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.0625rem;
  line-height: 1.65;
}

[data-theme='dark'] .statement {
  background:
    radial-gradient(circle at 20% 0%, rgba(45, 212, 191, 0.1), transparent 40%),
    linear-gradient(180deg, #151d2c 0%, #121a28 100%);
  border-block-color: rgba(148, 163, 184, 0.1);
}

@media (min-width: 768px) {
  .statement {
    padding-block: var(--space-20);
  }
}

@media (prefers-reduced-motion: reduce) {
  .statement__inner.is-visible {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
