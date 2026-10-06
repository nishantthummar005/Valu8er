<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue'
import { demoCompany, revenueTrend } from '@/data/homeDemo'
import RangeMeter from './RangeMeter.vue'
import SparkLine from './SparkLine.vue'
</script>

<template>
  <aside class="hero-preview" aria-label="Demo valuation workspace">
    <div class="hero-preview__chrome">
      <header class="hero-preview__top">
        <div>
          <p class="hero-preview__kicker">Workspace</p>
          <h3 class="hero-preview__company">{{ demoCompany.name }}</h3>
          <p class="hero-preview__meta">{{ demoCompany.industry }} · {{ demoCompany.updated }}</p>
        </div>
        <AppBadge tone="brand">Demo</AppBadge>
      </header>

      <div class="hero-preview__value">
        <span class="hero-preview__label">Estimated value</span>
        <strong>{{ demoCompany.value }}</strong>
        <AppBadge tone="success">{{ demoCompany.confidence }} confidence</AppBadge>
      </div>

      <RangeMeter
        :low="demoCompany.low"
        :mid="demoCompany.value"
        :high="demoCompany.high"
        :position="demoCompany.position"
        dark
      />

      <div class="hero-preview__metrics">
        <div>
          <span class="hero-preview__label">Revenue</span>
          <strong>{{ demoCompany.revenue }}</strong>
        </div>
        <div>
          <span class="hero-preview__label">EBITDA</span>
          <strong>{{ demoCompany.ebitda }}</strong>
        </div>
        <div>
          <span class="hero-preview__label">Growth</span>
          <strong class="is-up">{{ demoCompany.growth }}</strong>
        </div>
      </div>

      <div class="hero-preview__chart">
        <div class="hero-preview__chart-copy">
          <span class="hero-preview__label">Revenue trend</span>
          <p>Seven-period view</p>
        </div>
        <SparkLine :points="revenueTrend" :width="220" :height="58" label="Demo revenue trend" />
      </div>

      <p class="hero-preview__insight">
        <span>Insight</span>
        Margin remains above the selected peer set, with growth still carrying the range.
      </p>
    </div>
  </aside>
</template>

<style scoped>
.hero-preview {
  position: relative;
  isolation: isolate;
}

.hero-preview__chrome {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-6);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: var(--radius-xl);
  background:
    linear-gradient(180deg, rgba(26, 36, 56, 0.96), #121a2b 38%),
    #0b1220;
  color: #f1f5f9;
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}

.hero-preview:hover .hero-preview__chrome {
  transform: translateY(-4px);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.28);
}

.hero-preview__chart :deep(.spark-line) {
  transition: transform var(--duration-slow) var(--ease-out);
}

.hero-preview:hover .hero-preview__chart :deep(.spark-line) {
  transform: translateY(-2px);
}

.hero-preview__top,
.hero-preview__chart,
.hero-preview__metrics {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
}

.hero-preview__top {
  align-items: flex-start;
}

.hero-preview__kicker,
.hero-preview__label,
.hero-preview__meta,
.hero-preview__chart p,
.hero-preview__insight span {
  margin: 0;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 550;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-preview__company {
  margin: 0.2rem 0 0.15rem;
  font-size: 1.125rem;
  font-weight: 650;
}

.hero-preview__meta,
.hero-preview__chart p,
.hero-preview__insight {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  line-height: 1.5;
}

.hero-preview__value {
  display: grid;
  gap: var(--space-2);
}

.hero-preview__value strong {
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

.hero-preview__metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: var(--space-2);
  border-top: 1px solid rgba(148, 163, 184, 0.12);
}

.hero-preview__metrics strong,
.hero-preview__chart-copy {
  display: grid;
  gap: 0.2rem;
}

.hero-preview__metrics strong {
  font-size: 1rem;
}

.is-up {
  color: #5eead4;
}

.hero-preview__chart {
  align-items: end;
  padding: var(--space-4);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: rgba(11, 18, 32, 0.55);
}

.hero-preview__insight {
  margin: 0;
  padding: var(--space-4);
  border-left: 2px solid var(--color-brand-primary);
  color: #cbd5e1;
  font-size: 0.875rem;
}

.hero-preview__insight span {
  display: block;
  margin-bottom: 0.35rem;
}

@media (max-width: 429px) {
  .hero-preview__metrics,
  .hero-preview__chart {
    grid-template-columns: 1fr;
    display: grid;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-preview:hover .hero-preview__chrome,
  .hero-preview:hover .hero-preview__chart :deep(.spark-line) {
    transform: none;
  }
}
</style>
