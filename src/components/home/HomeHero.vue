<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { heroProof, heroStats } from '@/data/homeDemo'
import HeroProductPreview from './HeroProductPreview.vue'
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__backdrop" aria-hidden="true" />
    <AppContainer size="xl" class="home-hero__inner">
      <div class="home-hero__copy">
        <p class="home-hero__eyebrow">Valuation intelligence platform</p>
        <h1 class="text-display text-balance">
          Valuation reports,
          <span class="heading-accent">finished faster.</span>
          Reasoning still
          <span class="heading-accent">attached.</span>
        </h1>
        <p class="text-body-lg">
          Replace Excel, Word, and folder chaos with a team workspace built for M&amp;A, tax, due
          diligence, and expert valuation reports — guided analysis, structured conclusions, and
          delivery-ready outputs.
        </p>
        <ul class="home-hero__proof">
          <li v-for="item in heroProof" :key="item">{{ item }}</li>
        </ul>
        <div class="home-hero__actions">
          <AppButton size="lg" to="/get-started">Start free trial</AppButton>
          <AppButton size="lg" variant="outline" to="/platform">Watch product tour</AppButton>
        </div>
        <dl class="home-hero__stats">
          <div v-for="stat in heroStats" :key="stat.label">
            <dt>{{ stat.value }}</dt>
            <dd>{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
      <HeroProductPreview class="home-hero__visual" />
    </AppContainer>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-12) var(--space-16);
  background:
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 55%, var(--color-surface-muted) 100%);
}

.home-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 40%),
    radial-gradient(circle at 85% 30%, color-mix(in srgb, var(--color-brand-primary) 14%, transparent), transparent 32%),
    radial-gradient(circle at 10% 70%, color-mix(in srgb, var(--color-brand-bright) 10%, transparent), transparent 30%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, auto, auto, 48px 48px, 48px 48px;
  mask-image: linear-gradient(180deg, #000 35%, transparent 92%);
  opacity: 0.7;
  pointer-events: none;
}

[data-theme='dark'] .home-hero {
  background:
    linear-gradient(180deg, #151d2c 0%, #101826 55%, #0f1624 100%);
}

.home-hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-10);
  align-items: center;
}

.home-hero__copy {
  display: grid;
  gap: var(--space-5);
}

.home-hero__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.home-hero__proof {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.home-hero__proof li {
  position: relative;
  padding-left: 1.15rem;
}

.home-hero__proof li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.home-hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  margin: var(--space-2) 0 0;
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}

.home-hero__stats dt {
  color: var(--color-text);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-hero__stats dd {
  margin: 0.15rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  line-height: 1.35;
}

.home-hero__copy,
.home-hero__visual {
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.home-hero__visual {
  animation-delay: 120ms;
}

@media (min-width: 1024px) {
  .home-hero {
    padding-block: var(--space-16) var(--space-20);
  }

  .home-hero__inner {
    grid-template-columns: minmax(0, 0.95fr) minmax(20rem, 1.05fr);
    gap: var(--space-12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__copy,
  .home-hero__visual {
    animation: none;
  }
}
</style>
