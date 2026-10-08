<script setup lang="ts">
import AboutHeroVisual from '@/components/about/AboutHeroVisual.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { aboutHero } from '@/data/about'
</script>

<template>
  <section class="about-hero">
    <div class="about-hero__backdrop" aria-hidden="true" />
    <div class="about-hero__orb about-hero__orb--a" aria-hidden="true" />
    <div class="about-hero__orb about-hero__orb--b" aria-hidden="true" />
    <AppContainer size="xl">
      <div class="about-hero__grid">
        <div class="about-hero__copy">
          <p class="about-hero__eyebrow">{{ aboutHero.eyebrow }}</p>
          <h1 class="text-display text-balance">
            Making business value
            <span class="heading-accent">easier to understand.</span>
          </h1>
          <p class="text-body-lg">{{ aboutHero.lede }}</p>
          <div class="about-hero__actions">
            <AppButton size="lg" to="/platform">Explore the Platform</AppButton>
            <AppButton size="lg" variant="outline" to="/get-started">Get Started</AppButton>
          </div>
          <ul class="about-hero__trust" aria-label="What this page covers">
            <li>Why we exist</li>
            <li>How we think</li>
            <li>Who it’s for</li>
          </ul>
        </div>
        <AboutHeroVisual />
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.about-hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-12) var(--space-12);
  background:
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 52%, var(--color-surface-muted) 100%);
}

.about-hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% -5%, var(--color-glow), transparent 42%),
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: auto, 48px 48px, 48px 48px;
  mask-image: linear-gradient(180deg, #000 40%, transparent 92%);
  opacity: 0.65;
  pointer-events: none;
}

.about-hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(4px);
  opacity: 0.55;
}

.about-hero__orb--a {
  width: 18rem;
  height: 18rem;
  top: -4rem;
  right: 8%;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-brand-bright) 35%, transparent), transparent 70%);
  animation: float-orb 9s var(--ease-in-out) infinite;
}

.about-hero__orb--b {
  width: 12rem;
  height: 12rem;
  bottom: 10%;
  left: 4%;
  background: radial-gradient(circle, color-mix(in srgb, var(--color-brand-primary) 28%, transparent), transparent 70%);
  animation: float-orb 11s var(--ease-in-out) infinite reverse;
}

.about-hero__grid {
  position: relative;
  display: grid;
  gap: var(--space-10);
  align-items: center;
}

.about-hero__copy {
  display: grid;
  gap: var(--space-5);
  animation: reveal-up var(--duration-slow) var(--ease-out) both;
}

.about-hero__eyebrow {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.about-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.about-hero__trust {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin: var(--space-2) 0 0;
  padding: var(--space-4) 0 0;
  border-top: 1px solid var(--color-border);
  list-style: none;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
}

.about-hero__trust li {
  position: relative;
  padding-left: 1rem;
}

.about-hero__trust li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

[data-theme='dark'] .about-hero {
  background:
    linear-gradient(180deg, #151d2c 0%, #101826 55%, #0f1624 100%);
}

@keyframes float-orb {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(12px);
  }
}

@media (max-width: 429px) {
  .about-hero__actions :deep(.app-button) {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .about-hero {
    padding-block: var(--space-16) var(--space-16);
  }

  .about-hero__grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: var(--space-12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-hero__copy,
  .about-hero__orb {
    animation: none;
  }
}
</style>
