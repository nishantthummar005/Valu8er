<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { ecosystemNodes } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="ecosystem" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Product ecosystem</p>
          <h2 class="text-h1 text-balance">
            One financial intelligence
            <span class="heading-accent">workspace.</span>
          </h2>
        </header>

        <div class="ecosystem__map" aria-label="Valuation intelligence connected to financials, valuation, drivers, benchmarking, reports, and insights">
          <svg class="ecosystem__lines" viewBox="0 0 720 420" aria-hidden="true" preserveAspectRatio="none">
            <path d="M180 70 L360 210" />
            <path d="M540 70 L360 210" />
            <path d="M120 210 L360 210" />
            <path d="M600 210 L360 210" />
            <path d="M180 350 L360 210" />
            <path d="M540 350 L360 210" />
          </svg>

          <p class="node node--hub">Valuation intelligence</p>
          <p v-for="node in ecosystemNodes" :key="node.label" class="node" :class="`node--${node.position}`">
            {{ node.label }}
          </p>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.ecosystem {
  display: grid;
  gap: var(--space-8);
}

.ecosystem header {
  display: grid;
  gap: var(--space-3);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ecosystem__map {
  position: relative;
  display: grid;
  gap: var(--space-3);
}

.ecosystem__lines {
  display: none;
}

.node {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.7rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  text-align: center;
}

.node--hub {
  order: -1;
  min-height: 4.5rem;
  border-color: color-mix(in srgb, var(--color-brand-primary) 34%, var(--color-border));
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface)), var(--color-surface));
  color: var(--color-text);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

@media (min-width: 768px) {
  .ecosystem__map {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .node--hub {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .ecosystem__map {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, 7.5rem);
    min-height: 26rem;
    padding: var(--space-6);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    background:
      radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-brand-primary) 9%, transparent), transparent 46%),
      var(--color-surface-muted);
  }

  .ecosystem__lines {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .ecosystem__lines path {
    fill: none;
    stroke: color-mix(in srgb, var(--color-brand-primary) 42%, var(--color-border));
    stroke-width: 1.4;
    stroke-dasharray: 8 8;
    animation: flow 12s linear infinite;
  }

  .node {
    position: relative;
    z-index: 1;
    width: min(100%, 11.5rem);
    justify-self: center;
    align-self: center;
    box-shadow: var(--shadow-xs);
  }

  .node--hub {
    grid-column: 2;
    grid-row: 2;
    width: min(100%, 15rem);
    min-height: 5.25rem;
  }

  .node--tl { grid-column: 1; grid-row: 1; }
  .node--tr { grid-column: 3; grid-row: 1; }
  .node--ml { grid-column: 1; grid-row: 2; }
  .node--mr { grid-column: 3; grid-row: 2; }
  .node--bl { grid-column: 1; grid-row: 3; }
  .node--br { grid-column: 3; grid-row: 3; }
}

@keyframes flow {
  to {
    stroke-dashoffset: -80;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem__lines path {
    animation: none;
  }
}
</style>
