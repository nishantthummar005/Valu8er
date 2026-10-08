<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { problemPlatform, problemTraditional } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="problem" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">The shift</p>
          <h2 class="text-h1 text-balance">
            The problem isn’t a lack of financial data. It’s
            <span class="heading-accent">making sense of it.</span>
          </h2>
          <p class="text-body">
            Businesses often have financial information spread across spreadsheets, accounting
            reports, documents and disconnected analysis.
          </p>
        </header>

        <div class="problem__grid">
          <article>
            <p class="section-kicker">Scattered workflow</p>
            <h3 class="text-h3">Traditional approach</h3>
            <ul>
              <li v-for="item in problemTraditional" :key="item.title">
                <strong>{{ item.title }}</strong>
                <span>{{ item.copy }}</span>
              </li>
            </ul>
          </article>
          <article class="is-platform">
            <p class="section-kicker">Valuation intelligence</p>
            <h3 class="text-h3">Our platform</h3>
            <ul>
              <li v-for="item in problemPlatform" :key="item.title">
                <strong>{{ item.title }}</strong>
                <span>{{ item.copy }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.problem {
  display: grid;
  gap: var(--space-8);
}

.problem header {
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

.problem__grid {
  display: grid;
  gap: var(--space-4);
}

.problem__grid article {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-muted);
}

.problem__grid article.is-platform {
  background: var(--color-surface);
  border-color: color-mix(in srgb, var(--color-brand-primary) 26%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.problem ul {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.problem li {
  display: grid;
  gap: 0.25rem;
  padding-left: var(--space-4);
  position: relative;
}

.problem li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-text-muted);
}

.problem article.is-platform li::before {
  background: var(--color-brand-primary);
}

.problem li span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (min-width: 1024px) {
  .problem__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
