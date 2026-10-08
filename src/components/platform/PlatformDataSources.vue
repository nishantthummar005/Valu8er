<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { dataSources } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="sources" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Connected inputs</p>
          <h2 class="text-h1 text-balance">
            Bring the financial picture
            <span class="heading-accent">together.</span>
          </h2>
          <p class="text-body">
            Show how different business information contributes to a complete valuation view.
            These are conceptual inputs — not live integrations.
          </p>
        </header>

        <div class="sources__layout">
          <div class="sources__cards">
            <article v-for="source in dataSources" :key="source.title">
              <h3 class="text-h3">{{ source.title }}</h3>
              <ul>
                <li v-for="item in source.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>

          <div class="sources__flow" aria-hidden="true">
            <svg viewBox="0 0 24 80" preserveAspectRatio="none">
              <path d="M12 0v80" />
            </svg>
          </div>

          <p class="sources__hub">Valuation intelligence</p>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.sources {
  display: grid;
  gap: var(--space-8);
}

.sources header {
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

.sources__layout {
  display: grid;
  gap: var(--space-4);
}

.sources__cards {
  display: grid;
  gap: var(--space-4);
}

.sources__cards article {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
}

.sources ul {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sources li {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.sources__flow {
  display: flex;
  justify-content: center;
  height: 3rem;
}

.sources__flow svg {
  width: 1.5rem;
  height: 100%;
}

.sources__flow path {
  fill: none;
  stroke: var(--color-brand-primary);
  stroke-width: 1.6;
  stroke-dasharray: 5 6;
  animation: drip 8s linear infinite;
}

.sources__hub {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4.25rem;
  margin: 0;
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 34%, var(--color-border));
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface)), var(--color-surface));
  color: var(--color-text);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .sources__cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .sources__layout {
    grid-template-columns: minmax(0, 1fr) 3rem minmax(14rem, 18rem);
    align-items: center;
  }

  .sources__flow {
    height: 12rem;
  }

  .sources__flow svg {
    transform: rotate(-90deg);
    width: 12rem;
    height: 3rem;
  }

  .sources__hub {
    min-height: 12rem;
  }
}

@keyframes drip {
  to {
    stroke-dashoffset: -48;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sources__flow path {
    animation: none;
  }
}
</style>
