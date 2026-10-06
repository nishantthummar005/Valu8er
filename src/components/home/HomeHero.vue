<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import HeroProductPreview from './HeroProductPreview.vue'
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__backdrop" aria-hidden="true" />
    <AppContainer size="xl" class="home-hero__inner">
      <div class="home-hero__copy">
        <p class="home-hero__eyebrow">Valuation intelligence</p>
        <h1 class="text-display">See the value. Understand what drives it.</h1>
        <p class="text-body-lg">
          A structured workspace for owners, advisors, and finance teams to assess worth, place it
          in context, and move from scattered files to a clear conclusion.
        </p>
        <div class="home-hero__actions">
          <AppButton size="lg" to="/get-started">Get Started</AppButton>
          <AppButton size="lg" variant="outline" to="/platform">Explore Platform</AppButton>
        </div>
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
}

.home-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 78% 18%, var(--color-glow), transparent 28%),
    radial-gradient(circle at 8% 88%, color-mix(in srgb, var(--color-brand-primary) 12%, transparent), transparent 32%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, auto, 56px 56px, 56px 56px;
  mask-image: linear-gradient(180deg, #000 40%, transparent);
  opacity: 0.55;
  pointer-events: none;
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
  max-width: 36rem;
}

.home-hero__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.8125rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
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
    grid-template-columns: minmax(0, 0.92fr) minmax(20rem, 1.08fr);
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
