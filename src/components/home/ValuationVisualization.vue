<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { demoCompany, valuationFactors } from '@/data/homeDemo'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'
import RangeMeter from './RangeMeter.vue'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section class="valuation-band">
    <AppSection>
      <AppContainer>
        <div ref="root" class="valuation" :class="{ 'is-visible': visible }">
          <header>
            <p class="section-kicker">Valuation intelligence</p>
            <h2 class="text-h1">See the value. Understand the story behind it.</h2>
            <p class="text-body">
              A range is only useful when the drivers sit beside it. The panel below is a static
              demonstration of that relationship.
            </p>
          </header>

          <div class="valuation__layout">
            <article class="valuation__range">
              <span class="text-caption">Illustrative range</span>
              <strong>{{ demoCompany.value }}</strong>
              <RangeMeter
                :low="demoCompany.low"
                :mid="demoCompany.value"
                :high="demoCompany.high"
                :position="demoCompany.position"
              />
              <dl>
                <div>
                  <dt>Low</dt>
                  <dd>{{ demoCompany.low }}</dd>
                </div>
                <div>
                  <dt>Estimate</dt>
                  <dd>{{ demoCompany.value }}</dd>
                </div>
                <div>
                  <dt>High</dt>
                  <dd>{{ demoCompany.high }}</dd>
                </div>
                <div>
                  <dt>Confidence</dt>
                  <dd>{{ demoCompany.confidence }}</dd>
                </div>
              </dl>
            </article>

            <aside class="valuation__factors">
              <p class="text-caption">What sits behind the midpoint</p>
              <ul>
                <li v-for="factor in valuationFactors" :key="factor.label">
                  <div>
                    <span class="text-label">{{ factor.label }}</span>
                    <span class="text-caption">{{ factor.note }}</span>
                  </div>
                  <strong>{{ factor.value }}</strong>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  </section>
</template>

<style scoped>
.valuation-band {
  background: var(--color-surface-muted);
}

.valuation {
  display: grid;
  gap: var(--space-8);
}

.valuation header {
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

.valuation__layout {
  display: grid;
  gap: var(--space-6);
}

.valuation__range,
.valuation__factors {
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
}

.valuation__range {
  display: grid;
  gap: var(--space-5);
}

.valuation__range strong {
  font-size: clamp(2.25rem, 5vw, 3.25rem);
  letter-spacing: -0.04em;
  line-height: 1;
}

.valuation__range dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0;
}

.valuation__range dt {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.valuation__range dd {
  margin: 0.2rem 0 0;
  font-weight: 650;
}

.valuation__factors ul {
  display: grid;
  gap: var(--space-4);
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
}

.valuation__factors li {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.valuation__factors li:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.valuation__factors li div {
  display: grid;
  gap: 0.2rem;
}

@media (min-width: 1024px) {
  .valuation__layout {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: stretch;
  }
}
</style>
