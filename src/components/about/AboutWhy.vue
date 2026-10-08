<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutWhy } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="why" :class="{ 'is-visible': visible }">
        <header class="why__header">
          <p class="section-kicker">The problem</p>
          <h2 class="text-h1 text-balance">
            Why we're
            <span class="heading-accent">building it</span>
          </h2>
        </header>

        <ol class="why__grid">
          <li
            v-for="(item, index) in aboutWhy"
            :key="item.n"
            :style="{ '--delay': `${index * 100}ms` }"
          >
            <span class="why__watermark" aria-hidden="true">{{ item.n }}</span>
            <div class="why__icon" aria-hidden="true">
              <AppIcon :name="item.icon" :size="22" />
            </div>
            <span class="why__n">{{ item.n }}</span>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
          </li>
        </ol>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.why {
  display: grid;
  gap: var(--space-8);
}

.why__header {
  display: grid;
  gap: var(--space-3);
}

.why__header h2 {
  margin: 0;
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

.why__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.why__grid li {
  position: relative;
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.why.is-visible .why__grid li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.why__grid li:hover {
  border-color: color-mix(in srgb, #14b8a6 35%, var(--color-border));
  box-shadow:
    0 18px 40px -24px color-mix(in srgb, #0d9488 35%, transparent),
    var(--shadow-sm);
  transform: translateY(-4px);
}

.why__watermark {
  position: absolute;
  top: -0.12em;
  right: 0.08em;
  font-family: var(--font-display);
  font-size: clamp(4.5rem, 3rem + 6vw, 6.75rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  pointer-events: none;
  user-select: none;
}

.why__icon {
  display: inline-flex;
  width: 2.85rem;
  height: 2.85rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  color: #0d9488;
  background: color-mix(in srgb, #14b8a6 14%, var(--color-surface));
  border: 1px solid color-mix(in srgb, #14b8a6 22%, transparent);
}

.why__n {
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.why__grid h3 {
  position: relative;
  margin: 0;
  max-width: 22ch;
}

.why__grid p {
  position: relative;
  margin: 0;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .why__header {
    max-width: none;
  }

  .why__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-5);
    align-items: stretch;
  }
}

[data-theme='dark'] .why__grid li {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .why__watermark {
  color: color-mix(in srgb, #5eead4 8%, transparent);
}

[data-theme='dark'] .why__icon {
  color: #5eead4;
  background: color-mix(in srgb, #0d9488 22%, #171f2f);
}

@media (prefers-reduced-motion: reduce) {
  .why.is-visible .why__grid li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .why__grid li:hover {
    transform: none;
  }
}
</style>
