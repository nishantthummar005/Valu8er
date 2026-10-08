<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutIdea } from '@/data/about'
import { demoCompany } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="idea" :class="{ 'is-visible': visible }">
        <div class="idea__editorial">
          <h2 class="text-h1 text-balance">
            A business is more than a
            <span class="heading-accent">number.</span>
          </h2>

          <figure class="idea__quote">
            <div class="idea__rail" aria-hidden="true">
              <span class="idea__mark">“</span>
              <span class="idea__rule" />
            </div>
            <blockquote>{{ aboutIdea.quote }}</blockquote>
          </figure>

          <p class="text-body idea__lede">{{ aboutIdea.lede }}</p>

          <ul class="idea__chips" aria-label="Dimensions of business value">
            <li v-for="item in aboutIdea.dimensions" :key="item">
              <span class="idea__chip-dot" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>

        <aside class="idea__panel" aria-label="Illustrative product view">
          <div class="idea__panel-glow" aria-hidden="true" />
          <p class="idea__label">Illustrative product view</p>

          <div class="idea__hero-metric">
            <strong class="idea__value">{{ demoCompany.value }}</strong>
            <p class="idea__meta">Estimated value · {{ demoCompany.name }}</p>
          </div>

          <div class="idea__drivers">
            <p class="idea__drivers-title">Value drivers</p>
            <ul>
              <li v-for="driver in aboutIdea.drivers" :key="driver.label">
                <span>{{ driver.label }}</span>
                <em>{{ driver.value }}</em>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.idea {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.idea__editorial {
  display: grid;
  gap: var(--space-5);
}

.idea__editorial h2 {
  margin: 0;
}

.idea__quote {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  column-gap: var(--space-4);
  align-items: stretch;
  margin: 0;
  padding: var(--space-2) 0;
}

.idea__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-height: 100%;
}

.idea__mark {
  display: block;
  margin: 0;
  padding: 0;
  font-family: var(--font-display);
  font-size: clamp(3.25rem, 2.6rem + 2.2vw, 4.5rem);
  font-weight: 700;
  line-height: 0.7;
  letter-spacing: 0;
  color: var(--color-brand-primary);
  text-align: center;
  user-select: none;
}

.idea__rule {
  display: block;
  width: 3px;
  flex: 1 1 auto;
  min-height: 2.75rem;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    var(--color-brand-bright) 0%,
    var(--color-brand-primary) 55%,
    color-mix(in srgb, var(--color-brand-primary) 20%, transparent) 100%
  );
}

.idea__quote blockquote {
  margin: 0;
  padding: 0.35rem 0 0;
  border: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.15rem + 0.9vw, 1.75rem);
  font-weight: 650;
  letter-spacing: -0.025em;
  line-height: 1.35;
}

[data-theme='dark'] .idea__mark {
  color: var(--color-brand-highlight);
}

.idea__lede {
  margin: 0;
  max-width: 52ch;
  color: var(--color-text-secondary);
}

.idea__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: var(--space-1) 0 0;
  padding: 0;
  list-style: none;
}

.idea__chips li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 22%, var(--color-border));
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface) 88%, var(--color-brand-primary));
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-weight: 600;
  box-shadow: 0 1px 0 color-mix(in srgb, #fff 40%, transparent);
}

.idea__chip-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488, #14b8a6);
  flex-shrink: 0;
}

.idea__panel {
  position: relative;
  display: grid;
  gap: var(--space-4);
  padding: clamp(1.35rem, 2.8vw, 2rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, #14b8a6 38%, transparent);
  background:
    radial-gradient(ellipse 90% 55% at 12% -5%, rgba(20, 184, 166, 0.28), transparent 58%),
    radial-gradient(ellipse 50% 40% at 100% 100%, rgba(13, 148, 136, 0.18), transparent 55%),
    linear-gradient(165deg, #1a2438 0%, #121a28 48%, #0f1624 100%);
  color: #f8fafc;
  box-shadow:
    0 0 0 1px rgba(94, 234, 212, 0.06) inset,
    0 24px 48px -20px rgba(15, 23, 42, 0.55);
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
}

.idea__panel-glow {
  position: absolute;
  inset: -40% -20% auto;
  height: 55%;
  background: radial-gradient(circle, rgba(94, 234, 212, 0.12), transparent 65%);
  pointer-events: none;
}

.idea__label {
  position: relative;
  margin: 0;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.idea__hero-metric {
  position: relative;
  display: grid;
  gap: var(--space-2);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.idea__value {
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 1.85rem + 2vw, 3.15rem);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  background: linear-gradient(180deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.idea__meta {
  margin: 0;
  color: #94a3b8;
  font-size: 0.875rem;
}

.idea__drivers {
  position: relative;
  display: grid;
  gap: var(--space-3);
}

.idea__drivers-title {
  margin: 0;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.idea__drivers ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.idea__drivers li {
  display: grid;
  gap: 0.25rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-lg);
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.idea__drivers span {
  color: #64748b;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.idea__drivers em {
  font-style: normal;
  font-size: 0.9375rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  color: #e2e8f0;
}

.idea.is-visible .idea__panel {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: 100ms;
}

@media (min-width: 960px) {
  .idea {
    grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
    gap: clamp(2rem, 4vw, 4rem);
  }
}

[data-theme='dark'] .idea__chips li {
  background: color-mix(in srgb, var(--color-surface-elevated) 92%, #0d9488);
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border-strong));
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .idea.is-visible .idea__panel {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
