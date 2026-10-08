<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'

function explorePlatform() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById('platform-dashboard')?.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <section class="platform-hero">
    <div class="platform-hero__backdrop" aria-hidden="true" />
    <AppContainer size="xl">
      <div class="platform-hero__inner">
        <p class="platform-hero__eyebrow">The valuation intelligence platform</p>
        <h1 class="text-display text-balance">
          Know what a business is worth.
          <span class="heading-accent">Understand why.</span>
        </h1>
        <p class="text-body-lg">
          Financial analysis, valuation, benchmarking, and reporting live in one structured workspace
          — so the number and the reasoning stay together.
        </p>
        <div class="platform-hero__actions">
          <AppButton size="lg" @click="explorePlatform">Explore the Platform</AppButton>
          <AppButton size="lg" variant="outline" to="/get-started">Get Started</AppButton>
        </div>
        <p class="platform-hero__meta">Valuation · Financial Analysis · Benchmarking · Reporting</p>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.platform-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-12) var(--space-10);
}

.platform-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 32%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, 56px 56px, 56px 56px;
  mask-image: linear-gradient(180deg, #000 42%, transparent);
  opacity: 0.48;
  pointer-events: none;
}

.platform-hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-5);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.platform-hero__eyebrow,
.platform-hero__meta {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.platform-hero__eyebrow {
  color: var(--color-brand-primary);
}

.platform-hero__meta {
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
}

.platform-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

@media (max-width: 429px) {
  .platform-hero__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .platform-hero {
    padding-block: var(--space-16) var(--space-12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .platform-hero__inner {
    animation: none;
  }
}
</style>
