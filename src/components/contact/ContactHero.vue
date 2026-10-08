<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { contactHero } from '@/data/contact'
</script>

<template>
  <section class="contact-hero">
    <div class="contact-hero__backdrop" aria-hidden="true">
      <svg class="contact-hero__chart" viewBox="0 0 320 120" fill="none">
        <path
          d="M8 88 C48 80 72 40 112 52 C152 64 176 28 216 36 C256 44 280 18 312 24"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M8 96 C52 90 80 70 120 76 C160 82 188 58 228 64 C268 70 292 48 312 52"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          opacity="0.45"
        />
        <circle cx="216" cy="36" r="3" fill="currentColor" />
      </svg>
    </div>

    <AppContainer size="xl">
      <div class="contact-hero__inner">
        <p class="contact-hero__eyebrow">{{ contactHero.eyebrow }}</p>
        <h1 class="text-display text-balance">
          Let's make financial clarity
          <span class="heading-accent">easier.</span>
        </h1>
        <p class="text-body-lg">{{ contactHero.lede }}</p>
        <div class="contact-hero__actions">
          <AppButton size="lg" to="/get-started">Get Started</AppButton>
          <AppButton size="lg" variant="outline" to="/platform">Explore Platform</AppButton>
        </div>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.contact-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-12) var(--space-8);
}

.contact-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 42% 0%, var(--color-glow), transparent 38%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, 56px 56px, 56px 56px;
  mask-image: linear-gradient(180deg, #000 42%, transparent);
  opacity: 0.55;
  pointer-events: none;
}

.contact-hero__chart {
  position: absolute;
  right: 6%;
  bottom: 12%;
  width: min(280px, 36vw);
  color: var(--color-brand-primary);
  opacity: 0.35;
}

.contact-hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-5);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.contact-hero__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

@media (max-width: 429px) {
  .contact-hero__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .contact-hero {
    padding-block: var(--space-16) var(--space-10);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero__inner {
    animation: none;
  }
}
</style>
