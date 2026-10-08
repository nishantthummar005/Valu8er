<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { capabilityGrid, insightStatements } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="insights" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">What the platform helps you see</p>
          <h2 class="text-h1 text-balance">
            The number is only
            <span class="heading-accent">the beginning.</span>
          </h2>
        </header>

        <div class="insights__statements">
          <article v-for="item in insightStatements" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
            <span>{{ item.value }}</span>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>

  <AppSection tight tone="surface">
    <AppContainer size="xl">
      <div class="grid-wrap">
        <header>
          <p class="section-kicker">Platform capabilities</p>
          <h2 class="text-h2">A workspace built around the valuation file.</h2>
        </header>
        <div class="grid">
          <RouterLink v-for="item in capabilityGrid" :key="item.title" :to="item.to">
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </RouterLink>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.insights,
.grid-wrap {
  display: grid;
  gap: var(--space-8);
}

.insights header,
.grid-wrap header {
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

.insights__statements {
  display: grid;
  gap: var(--space-4);
}

.insights__statements article {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.insights__statements h3 {
  margin: 0;
  font-size: clamp(1.5rem, 1.1rem + 1.4vw, 2.4rem);
  letter-spacing: -0.035em;
  line-height: 1.15;
  font-weight: 700;
}

.insights__statements p {
  margin: 0;
  color: var(--color-text-secondary);
  max-width: 28rem;
}

.insights__statements span {
  width: max-content;
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  color: var(--color-brand-primary);
  font-size: 0.8125rem;
  font-weight: 650;
}

.grid {
  display: grid;
  gap: var(--space-3);
}

.grid a {
  display: grid;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.grid a:hover,
.grid a:focus-visible {
  border-color: color-mix(in srgb, var(--color-brand-primary) 32%, var(--color-border));
  transform: translateY(-2px);
}

.grid a:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.grid h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 650;
}

.grid p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
}

@media (min-width: 768px) {
  .insights__statements {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
  }

  .insights__statements article {
    border-top: 0;
    border-left: 1px solid var(--color-border);
    padding-block: 0;
  }

  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .grid a:hover,
  .grid a:focus-visible {
    transform: none;
  }
}
</style>
