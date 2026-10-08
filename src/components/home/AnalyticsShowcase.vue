<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { demoCompany, revenueTrend, valuationTrend } from '@/data/homeDemo'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import MiniBars from './MiniBars.vue'
import SparkLine from './SparkLine.vue'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="analytics" :class="{ 'is-visible': visible }">
        <div class="analytics__copy">
          <p class="section-kicker">Analytics</p>
          <h2 class="text-h1">See movement, not just a single print.</h2>
          <p class="text-body">
            Trends, profitability, and relative position stay attached to the valuation—so a change
            in the story is visible before the report is written.
          </p>
          <AppButton to="/platform/analysis">Open analysis</AppButton>
        </div>

        <aside class="analytics__panel" aria-label="Demo analytics interface">
          <div class="analytics__metrics">
            <article>
              <span>Revenue growth</span>
              <strong>{{ demoCompany.growth }}</strong>
            </article>
            <article>
              <span>Profitability</span>
              <strong>22.9%</strong>
            </article>
            <article>
              <span>Benchmark</span>
              <strong>Upper quartile</strong>
            </article>
          </div>
          <div class="analytics__charts">
            <section>
              <p>Valuation trend</p>
              <SparkLine :points="valuationTrend" :width="280" :height="78" label="Demo valuation trend" />
            </section>
            <section>
              <p>Revenue shape</p>
              <SparkLine :points="revenueTrend" :width="280" :height="78" label="Demo revenue shape" />
            </section>
            <section>
              <p>Relative measures</p>
              <MiniBars :values="[64, 78, 70, 82, 75]" label="Demo relative measures" />
            </section>
          </div>
          <p class="analytics__note">Illustrative workspace · demo figures</p>
        </aside>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.analytics {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.analytics__copy {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.analytics__panel {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-6);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-xl);
  background: #121a2b;
  color: #f8fafc;
}

.analytics__metrics,
.analytics__charts {
  display: grid;
  gap: var(--space-4);
}

.analytics__metrics article,
.analytics__charts section {
  padding: var(--space-4);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.analytics__metrics span,
.analytics__charts p,
.analytics__note {
  margin: 0;
  color: #94a3b8;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.analytics__metrics strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 1.25rem;
}

.analytics__note {
  text-transform: none;
  letter-spacing: 0;
}

@media (min-width: 768px) {
  .analytics__metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .analytics {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: var(--space-12);
  }
}
</style>
