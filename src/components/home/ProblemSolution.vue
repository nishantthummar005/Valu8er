<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const before = [
  'Scattered financial information',
  'Manual analysis across files',
  'Unclear peer context',
  'Slow, hard-to-defend decisions',
]

const after = [
  'A single valuation view',
  'Structured financial analysis',
  'Relevant benchmarks',
  'Insights you can act on',
]
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="problem" :class="{ 'is-visible': visible }">
      <header class="problem__intro">
        <p class="section-kicker">The shift</p>
        <h2 class="text-h1">Business value shouldn’t feel like a black box.</h2>
        <p class="text-body">
          Most teams already have the numbers. What they lack is a calm place to interpret them,
          compare them, and leave a record of how a conclusion was reached.
        </p>
      </header>
      <div class="problem__grid">
        <article class="problem__card">
          <p class="text-caption">Before</p>
          <h3 class="text-h3">Fragmented</h3>
          <ul>
            <li v-for="item in before" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="problem__card is-after">
          <p class="text-caption">With Valu8er</p>
          <h3 class="text-h3">Structured</h3>
          <ul>
            <li v-for="item in after" :key="item">{{ item }}</li>
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
  gap: var(--space-10);
}

.problem__intro {
  display: grid;
  gap: var(--space-4);
  max-width: 40rem;
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
  gap: var(--space-6);
}

.problem__card {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface-muted);
}

.problem__card.is-after {
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
}

.problem__card ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.problem__card li {
  padding-left: var(--space-4);
  position: relative;
}

.problem__card li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-text-muted);
}

.problem__card.is-after li::before {
  background: var(--color-brand-primary);
}

@media (min-width: 768px) {
  .problem__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
