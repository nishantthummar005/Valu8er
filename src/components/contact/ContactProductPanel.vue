<script setup lang="ts">
import { ref } from 'vue'
import RangeMeter from '@/components/home/RangeMeter.vue'
import SparkLine from '@/components/home/SparkLine.vue'
import { useReveal } from '@/composables/useReveal'
import { demoCompany, valuationTrend } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <aside
    ref="root"
    class="product-panel"
    :class="{ 'is-visible': visible }"
    aria-label="Illustrative product view"
  >
    <p class="product-panel__eyebrow">Illustrative product view</p>
    <h2 class="text-h2">Tell us what you're working on.</h2>
    <p class="product-panel__lede">
      A little context helps the team understand your needs — whether you’re exploring valuation,
      analysis, or how the workspace could fit your workflow.
    </p>

    <div class="product-panel__card">
      <div class="product-panel__head">
        <div>
          <p class="product-panel__company">{{ demoCompany.name }}</p>
          <p class="product-panel__meta">{{ demoCompany.industry }}</p>
        </div>
        <span>{{ demoCompany.updated }}</span>
      </div>

      <div class="product-panel__value">
        <span>Estimated value</span>
        <strong>{{ demoCompany.value }}</strong>
      </div>

      <RangeMeter
        dark
        :low="demoCompany.low"
        :mid="demoCompany.value"
        :high="demoCompany.high"
        :position="demoCompany.position"
      />

      <div class="product-panel__spark">
        <SparkLine :points="valuationTrend" :width="220" :height="48" label="Illustrative valuation trend" />
      </div>

      <dl>
        <div>
          <dt>Revenue</dt>
          <dd>{{ demoCompany.revenue }}</dd>
        </div>
        <div>
          <dt>EBITDA</dt>
          <dd>{{ demoCompany.ebitda }}</dd>
        </div>
        <div>
          <dt>Growth</dt>
          <dd>{{ demoCompany.growth }}</dd>
        </div>
      </dl>
    </div>
  </aside>
</template>

<style scoped>
.product-panel {
  display: grid;
  gap: var(--space-4);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 35%, transparent);
  background:
    radial-gradient(ellipse 80% 55% at 15% 0%, color-mix(in srgb, var(--color-brand-primary) 28%, transparent), transparent 60%),
    #171f2f;
  color: #f8fafc;
  opacity: 0;
  transform: translateY(12px);
}

.product-panel.is-visible {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.product-panel__eyebrow {
  margin: 0;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

#app .product-panel .text-h2 {
  margin: 0;
  color: #f8fafc;
  font-size: clamp(1.35rem, 1.15rem + 0.8vw, 1.75rem);
}

.product-panel__lede {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9375rem;
  line-height: 1.55;
}

.product-panel__card {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(18, 26, 43, 0.72);
}

.product-panel__head {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  align-items: start;
  color: #94a3b8;
  font-size: 0.75rem;
}

.product-panel__company {
  margin: 0;
  color: #f8fafc;
  font-size: 0.9375rem;
  font-weight: 650;
}

.product-panel__meta {
  margin: 0.15rem 0 0;
}

.product-panel__value {
  display: grid;
  gap: 0.2rem;
}

.product-panel__value span {
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.product-panel__value strong {
  font-size: 1.75rem;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.product-panel__spark {
  color: #5eead4;
}

.product-panel dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding-top: var(--space-2);
  border-top: 1px solid rgba(148, 163, 184, 0.14);
}

.product-panel dt {
  color: #94a3b8;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.product-panel dd {
  margin: 0.2rem 0 0;
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

@media (prefers-reduced-motion: reduce) {
  .product-panel.is-visible {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
