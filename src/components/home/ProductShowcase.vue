<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { demoCompany, ebitdaTrend, revenueTrend } from '@/data/homeDemo'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import MiniBars from './MiniBars.vue'
import RangeMeter from './RangeMeter.vue'
import SparkLine from './SparkLine.vue'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section ref="root" class="showcase" :class="{ 'is-visible': visible }">
    <AppContainer size="xl">
      <div class="showcase__intro">
        <p class="section-kicker">The workspace</p>
        <h2 class="text-h1">A valuation file that stays readable end to end.</h2>
        <p class="text-body">
          Company context, range, trends, and next actions — kept together so the conclusion is easier
          to explain, review, and reuse. Figures below are illustrative demo data.
        </p>
      </div>
    </AppContainer>

    <AppContainer size="xl">
      <article class="workspace" aria-label="Demo valuation workspace">
        <header class="workspace__bar">
          <div>
            <h3>{{ demoCompany.name }}</h3>
            <p>{{ demoCompany.industry }} · {{ demoCompany.updated }}</p>
          </div>
          <AppBadge tone="brand">Demo workspace</AppBadge>
        </header>

        <div class="workspace__grid">
          <section class="workspace__panel workspace__panel--value">
            <span class="workspace__label">Estimated value</span>
            <strong>{{ demoCompany.value }}</strong>
            <RangeMeter
              :low="demoCompany.low"
              :mid="demoCompany.value"
              :high="demoCompany.high"
              :position="demoCompany.position"
              dark
            />
            <div class="workspace__chips">
              <AppBadge tone="success">{{ demoCompany.confidence }} confidence</AppBadge>
              <AppBadge tone="neutral">Range {{ demoCompany.low }}–{{ demoCompany.high }}</AppBadge>
            </div>
          </section>

          <section class="workspace__panel">
            <span class="workspace__label">Revenue trend</span>
            <SparkLine :points="revenueTrend" :width="260" :height="72" label="Demo revenue chart" />
            <p>{{ demoCompany.revenue }} trailing</p>
          </section>

          <section class="workspace__panel">
            <span class="workspace__label">EBITDA trend</span>
            <SparkLine :points="ebitdaTrend" :width="260" :height="72" label="Demo EBITDA chart" />
            <p>{{ demoCompany.ebitda }} trailing</p>
          </section>

          <section class="workspace__panel">
            <span class="workspace__label">Company vs industry</span>
            <MiniBars :values="[68, 74, 61, 80, 77]" label="Demo benchmark comparison" />
            <p>Relative position across five selected measures</p>
          </section>

          <section class="workspace__insights">
            <article>
              <AppIcon name="insights" :size="18" />
              <div>
                <h4>Growth opportunity</h4>
                <p>Top-line momentum still supports the upper half of the range.</p>
              </div>
            </article>
            <article>
              <AppIcon name="analysis" :size="18" />
              <div>
                <h4>Margin strength</h4>
                <p>Earnings quality remains the primary support for the midpoint.</p>
              </div>
            </article>
            <article>
              <AppIcon name="security" :size="18" />
              <div>
                <h4>Watch item</h4>
                <p>Customer concentration should stay visible in the narrative.</p>
              </div>
            </article>
          </section>
        </div>

        <footer class="workspace__actions">
          <AppButton to="/platform/analysis" variant="outline">View analysis</AppButton>
          <AppButton to="/platform/reports">Generate report</AppButton>
        </footer>
      </article>
    </AppContainer>
  </section>
</template>

<style scoped>
.showcase {
  padding-block: var(--space-16);
  background: #171f2f;
  color: #f1f5f9;
}

.showcase__intro {
  display: grid;
  gap: var(--space-4);
  width: 100%;
  margin-bottom: var(--space-8);
}

.section-kicker {
  margin: 0;
  color: #5eead4;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#app .showcase .text-h1 {
  color: #f8fafc;
}

#app .showcase .text-body {
  color: #94a3b8;
}

.workspace {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-2xl);
  background: #121a2b;
}

.workspace__bar,
.workspace__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-4);
  align-items: center;
}

.workspace__bar h3,
.workspace__bar p,
.workspace__panel p,
.workspace__insights p,
.workspace__insights h4 {
  margin: 0;
}

.workspace__bar p,
.workspace__panel p,
.workspace__insights p,
.workspace__label {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.workspace__label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 550;
  font-size: 0.7rem;
}

.workspace__grid {
  display: grid;
  gap: var(--space-4);
}

.workspace__panel {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-5);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.workspace__panel--value strong {
  font-size: clamp(2rem, 4vw, 2.75rem);
  letter-spacing: -0.04em;
}

.workspace__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.workspace__insights {
  display: grid;
  gap: var(--space-3);
}

.workspace__insights article {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.workspace__insights :deep(.app-icon) {
  color: #2dd4bf;
}

.workspace__insights h4 {
  font-size: 0.9375rem;
}

.workspace__actions :deep(.app-button--outline) {
  background: transparent;
  color: #f8fafc;
  border-color: rgba(148, 163, 184, 0.28);
}

@media (min-width: 1024px) {
  .showcase {
    padding-block: var(--space-20);
  }

  .workspace__grid {
    grid-template-columns: 1.3fr 1fr 1fr;
  }

  .workspace__panel--value {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  .workspace__insights {
    grid-column: 1 / -1;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
