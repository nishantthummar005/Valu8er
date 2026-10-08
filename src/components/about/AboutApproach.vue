<script setup lang="ts">
import { ref } from 'vue'
import RangeMeter from '@/components/home/RangeMeter.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutApproachDrivers } from '@/data/about'
import { demoCompany } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="approach" :class="{ 'is-visible': visible }">
        <div class="approach__copy">
          <p class="section-kicker">Our approach</p>
          <h2 class="text-h1 text-balance">
            We believe clarity comes from
            <span class="heading-accent">context.</span>
          </h2>
          <p class="approach__statement">
            Don't just show the value.
            <span>Show what shapes it.</span>
          </p>
          <p class="text-body">
            A valuation is useful when the range, drivers, and confidence sit beside the number —
            so reviewers can see why the conclusion holds.
          </p>
          <ul class="approach__points" aria-label="What context includes">
            <li>Drivers beside the estimate</li>
            <li>Range, not a single print</li>
            <li>Reasoning that travels with the file</li>
          </ul>
        </div>

        <aside class="approach__panel" aria-label="Illustrative demo valuation panel">
          <div class="approach__panel-shine" aria-hidden="true" />
          <p class="approach__label">Illustrative demo</p>

          <div class="approach__metrics">
            <div class="approach__value">
              <span>Estimated value</span>
              <strong>{{ demoCompany.value }}</strong>
            </div>
            <div class="approach__range">
              <span>Range</span>
              <p>{{ demoCompany.low }} — {{ demoCompany.high }}</p>
            </div>
          </div>

          <RangeMeter
            dark
            :low="demoCompany.low"
            :mid="demoCompany.value"
            :high="demoCompany.high"
            :position="demoCompany.position"
          />

          <div class="approach__drivers">
            <p>Key drivers</p>
            <dl>
              <div v-for="item in aboutApproachDrivers" :key="item.label">
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.approach {
  display: grid;
  gap: var(--space-8);
  align-items: start;
}

.approach__copy {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.approach__copy h2 {
  margin: 0;
}

.approach__statement {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.15rem + 0.9vw, 1.75rem);
  font-weight: 650;
  letter-spacing: -0.03em;
  line-height: 1.25;
}

.approach__statement span {
  display: inline;
  color: var(--color-brand-primary);
}

.approach__points {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-1) 0 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 550;
}

.approach__points li {
  position: relative;
  padding-left: 1.1rem;
}

.approach__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.approach__panel {
  position: relative;
  display: grid;
  gap: var(--space-4);
  padding: clamp(1.35rem, 2.8vw, 2rem);
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, #14b8a6 34%, transparent);
  background:
    radial-gradient(ellipse 75% 50% at 10% 0%, rgba(20, 184, 166, 0.26), transparent 58%),
    linear-gradient(160deg, #1c263c 0%, #141c2c 55%, #101828 100%);
  color: #f8fafc;
  box-shadow:
    0 0 0 1px rgba(94, 234, 212, 0.05) inset,
    0 28px 56px -32px rgba(15, 23, 42, 0.65);
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
}

.approach__panel-shine {
  position: absolute;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background: linear-gradient(105deg, transparent 40%, rgba(94, 234, 212, 0.06) 100%);
  pointer-events: none;
}

.approach.is-visible .approach__panel {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: 80ms;
}

.approach__label {
  position: relative;
  margin: 0;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.approach__metrics {
  position: relative;
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr 1fr;
  padding-bottom: var(--space-1);
}

.approach__value,
.approach__range {
  display: grid;
  gap: 0.3rem;
}

.approach__value span,
.approach__range span,
.approach__drivers > p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.approach__value strong {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 1.5rem + 1.2vw, 2.5rem);
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.approach__range p {
  margin: 0;
  font-size: 1rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.approach__drivers {
  position: relative;
  display: grid;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(148, 163, 184, 0.16);
}

.approach__drivers dl {
  display: grid;
  gap: 0.45rem;
  margin: 0;
}

.approach__drivers dl > div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  align-items: baseline;
  padding: 0.4rem 0.65rem;
  border-radius: var(--radius-md);
  background: rgba(15, 23, 42, 0.35);
}

.approach__drivers dt {
  color: #94a3b8;
  font-size: 0.8125rem;
}

.approach__drivers dd {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  color: #e2e8f0;
}

@media (max-width: 520px) {
  .approach__metrics {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 960px) {
  .approach {
    grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
    gap: var(--space-10);
    align-items: center;
  }
}

[data-theme='dark'] .approach__statement {
  color: #f1f5f9;
}

@media (prefers-reduced-motion: reduce) {
  .approach.is-visible .approach__panel {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
