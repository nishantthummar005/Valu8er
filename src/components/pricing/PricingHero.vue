<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import { pricingHero } from '@/data/pricingDemo'
</script>

<template>
  <section class="pricing-hero">
    <div class="pricing-hero__backdrop" aria-hidden="true" />
    <AppContainer>
      <div class="pricing-hero__inner">
        <p class="pricing-hero__eyebrow">{{ pricingHero.eyebrow }}</p>
        <h1 class="text-display text-balance">
          One price.
          <span class="heading-accent">The whole platform.</span>
        </h1>
        <p class="text-body-lg">{{ pricingHero.copy }}</p>
        <ul class="pricing-hero__caps" aria-label="Platform capabilities">
          <li v-for="item in pricingHero.capabilities" :key="item">{{ item }}</li>
        </ul>
        <ul class="pricing-hero__trust">
          <li v-for="item in pricingHero.trust" :key="item">{{ item }}</li>
        </ul>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.pricing-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-12) var(--space-8);
}

.pricing-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 34%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, 56px 56px, 56px 56px;
  mask-image: linear-gradient(180deg, #000 40%, transparent);
  opacity: 0.48;
  pointer-events: none;
}

.pricing-hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-5);
  margin-inline: auto;
  text-align: center;
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.pricing-hero__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pricing-hero__caps,
.pricing-hero__trust {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.pricing-hero__caps li {
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
}

.pricing-hero__trust li {
  color: var(--color-text-muted);
  font-size: 0.8125rem;
}

.pricing-hero__trust li::before {
  content: '·';
  margin-right: var(--space-2);
  color: var(--color-brand-primary);
}

.pricing-hero__trust li:first-child::before {
  content: none;
  margin: 0;
}

@media (min-width: 768px) {
  .pricing-hero {
    padding-block: var(--space-16) var(--space-10);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pricing-hero__inner {
    animation: none;
  }
}
</style>
