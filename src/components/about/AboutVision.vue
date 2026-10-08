<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutVision } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="vision" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Product direction</p>
          <h2 class="text-h1 text-balance">
            Where we're
            <span class="heading-accent">going</span>
          </h2>
          <p class="text-body">
            The long-term direction is to make business valuation and financial intelligence more
            accessible, understandable, and useful — without promising unreleased capabilities as if
            they already exist.
          </p>
        </header>

        <ul>
          <li
            v-for="(item, index) in aboutVision"
            :key="item.title"
            :style="{ '--delay': `${index * 90}ms` }"
          >
            <span class="vision__n" aria-hidden="true">0{{ index + 1 }}</span>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
          </li>
        </ul>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.vision {
  display: grid;
  gap: var(--space-8);
}

.vision header {
  display: grid;
  gap: var(--space-3);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.vision ul {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.vision li {
  position: relative;
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background:
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-brand-primary) 8%, transparent), transparent 45%),
    var(--color-surface);
  overflow: hidden;
  opacity: 0;
  transform: translateY(10px);
}

.vision.is-visible li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.vision__n {
  color: color-mix(in srgb, var(--color-brand-primary) 35%, transparent);
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 2rem + 2vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.9;
}

.vision h3,
.vision p {
  margin: 0;
}

.vision p {
  color: var(--color-text-secondary);
}

@media (min-width: 900px) {
  .vision ul {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

[data-theme='dark'] .vision li {
  background:
    radial-gradient(circle at 100% 0%, rgba(45, 212, 191, 0.08), transparent 45%),
    var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .vision.is-visible li {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
