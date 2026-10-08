<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutPrinciples } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const featured = aboutPrinciples[0]
const rest = aboutPrinciples.slice(1)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="principles" :class="{ 'is-visible': visible }">
        <header class="principles__header">
          <p class="section-kicker">Principles</p>
          <h2 class="text-h1 text-balance">
            Principles we
            <span class="heading-accent">build around</span>
          </h2>
        </header>

        <ul class="principles__grid">
          <li
            v-if="featured"
            class="principles__featured"
            :style="{ '--delay': '0ms' }"
          >
            <div class="principles__top">
              <span class="principles__n">{{ featured.n }}</span>
              <span class="principles__icon" aria-hidden="true">
                <AppIcon :name="featured.icon" :size="24" />
              </span>
            </div>
            <h3 class="text-h2">{{ featured.title }}</h3>
            <p class="text-body">{{ featured.copy }}</p>
          </li>

          <li
            v-for="(item, index) in rest"
            :key="item.n"
            :style="{ '--delay': `${(index + 1) * 75}ms` }"
          >
            <div class="principles__top">
              <span class="principles__n">{{ item.n }}</span>
              <span class="principles__icon" aria-hidden="true">
                <AppIcon :name="item.icon" :size="20" />
              </span>
            </div>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
          </li>
        </ul>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.principles {
  display: grid;
  gap: var(--space-8);
}

.principles__header {
  display: grid;
  gap: var(--space-3);
}

.principles__header h2 {
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

.principles__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.principles__grid li {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  opacity: 0;
  transform: translateY(10px);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.principles.is-visible .principles__grid li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.principles__grid li:hover {
  border-color: #14b8a6;
  box-shadow:
    0 16px 36px -22px color-mix(in srgb, #0d9488 40%, transparent),
    var(--shadow-sm);
  transform: translateY(-3px);
}

.principles__featured {
  gap: var(--space-4);
  padding: clamp(1.5rem, 3vw, 2rem);
  background:
    radial-gradient(ellipse 80% 60% at 0% 0%, color-mix(in srgb, #14b8a6 12%, transparent), transparent 55%),
    var(--color-surface);
}

.principles__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.principles__n {
  color: var(--color-brand-primary);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.principles__icon {
  display: inline-flex;
  width: 2.65rem;
  height: 2.65rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: #0d9488;
  background: color-mix(in srgb, #14b8a6 12%, var(--color-surface));
  border: 1px solid color-mix(in srgb, #14b8a6 20%, transparent);
}

.principles__featured .principles__icon {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-lg);
}

.principles__grid h3 {
  margin: 0;
  max-width: 28ch;
}

.principles__featured h3 {
  max-width: 22ch;
}

.principles__grid p {
  margin: 0;
  color: var(--color-text-secondary);
}

.principles__featured p {
  max-width: 48ch;
  font-size: 1.0625rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .principles__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-5);
  }
}

@media (min-width: 1024px) {
  .principles__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .principles__featured {
    grid-column: span 2;
  }
}

[data-theme='dark'] .principles__grid li {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .principles__featured {
  background:
    radial-gradient(ellipse 75% 55% at 0% 0%, rgba(20, 184, 166, 0.14), transparent 55%),
    var(--color-surface-elevated);
}

[data-theme='dark'] .principles__icon {
  color: #5eead4;
  background: color-mix(in srgb, #0d9488 24%, #171f2f);
}

[data-theme='dark'] .principles__grid li:hover {
  border-color: #5eead4;
}

@media (prefers-reduced-motion: reduce) {
  .principles.is-visible .principles__grid li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .principles__grid li:hover {
    transform: none;
  }
}
</style>
