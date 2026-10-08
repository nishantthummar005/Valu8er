<script setup lang="ts">
import { computed } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import RangeMeter from '@/components/home/RangeMeter.vue'
import YearTrendChart from '@/components/platform/YearTrendChart.vue'
import {
  analysisInsights,
  benchmarkRows,
  ebitdaHistory,
  platformCompany,
  reportOutline,
  revenueHistory,
  valuationDrivers,
  workflowSteps,
} from '@/data/platformDemo'

const props = defineProps<{
  step: (typeof workflowSteps)[number]
}>()

const bars = computed(() =>
  benchmarkRows.map((row) => {
    const max = Math.max(row.companyValue, row.referenceValue)
    return {
      ...row,
      companyWidth: `${(row.companyValue / max) * 100}%`,
      referenceWidth: `${(row.referenceValue / max) * 100}%`,
    }
  }),
)
</script>

<template>
  <div
    class="step"
    role="tabpanel"
    :id="`workflow-panel-${step.id}`"
    :aria-labelledby="`workflow-tab-${step.id}`"
  >
    <div class="step__copy">
      <h3 class="text-h2">{{ step.heading }}</h3>
      <p class="text-body">{{ step.copy }}</p>
    </div>

    <article class="panel" :aria-label="`${step.title} product demonstration`">
      <p class="panel__note">Illustrative demo</p>

      <div v-if="step.id === 'understand'" class="overview">
        <div class="overview__head">
          <div>
            <p class="panel__kicker">Business overview</p>
            <p class="overview__name">{{ platformCompany.name }}</p>
            <p>{{ platformCompany.industry }}</p>
          </div>
          <div class="overview__health">
            <span>Financial health</span>
            <strong>{{ platformCompany.health }}</strong>
            <span class="overview__meter" aria-hidden="true"><span /></span>
          </div>
        </div>
        <dl>
          <div>
            <dt>Revenue</dt>
            <dd>{{ platformCompany.revenue }}</dd>
          </div>
          <div>
            <dt>EBITDA</dt>
            <dd>{{ platformCompany.ebitda }}</dd>
          </div>
          <div>
            <dt>Growth</dt>
            <dd>{{ platformCompany.growthPlain }}</dd>
          </div>
          <div>
            <dt>Employees</dt>
            <dd>{{ platformCompany.employees }}</dd>
          </div>
          <div>
            <dt>Financial period</dt>
            <dd>{{ platformCompany.period }}</dd>
          </div>
        </dl>
      </div>

      <div v-else-if="step.id === 'analyze'" class="analyze">
        <section>
          <p class="panel__kicker">Revenue trend</p>
          <YearTrendChart :points="revenueHistory" label="Illustrative revenue trend from 2022 to 2025" />
          <ul>
            <li v-for="point in revenueHistory" :key="point.year">
              <span>{{ point.year }}</span>
              <strong>{{ point.display }}</strong>
            </li>
          </ul>
        </section>
        <section>
          <p class="panel__kicker">EBITDA trend</p>
          <YearTrendChart :points="ebitdaHistory" label="Illustrative EBITDA trend from 2022 to 2025" />
          <ul>
            <li v-for="point in ebitdaHistory" :key="point.year">
              <span>{{ point.year }}</span>
              <strong>{{ point.display }}</strong>
            </li>
          </ul>
        </section>
        <div class="analyze__insights">
          <article v-for="insight in analysisInsights" :key="insight.title">
            <strong>{{ insight.title }}</strong>
            <p>{{ insight.copy }}</p>
          </article>
        </div>
      </div>

      <div v-else-if="step.id === 'value'" class="value">
        <section class="value__hero">
          <p class="panel__kicker">Estimated value</p>
          <strong>{{ platformCompany.value }}</strong>
          <p>Range {{ platformCompany.range }}</p>
          <RangeMeter
            :low="platformCompany.low"
            :mid="platformCompany.value"
            :high="platformCompany.high"
            :position="platformCompany.position"
            dark
          />
          <AppBadge tone="success">{{ platformCompany.confidence }} confidence</AppBadge>
        </section>
        <ul>
          <li v-for="driver in valuationDrivers" :key="driver.label">
            <span>{{ driver.label }}</span>
            <strong>{{ driver.value }}</strong>
          </li>
        </ul>
      </div>

      <div v-else-if="step.id === 'benchmark'" class="benchmark">
        <p class="panel__kicker">Illustrative benchmark view</p>
        <ul>
          <li v-for="row in bars" :key="row.label">
            <div class="benchmark__copy">
              <strong>{{ row.label }}</strong>
              <p>
                <span>Company {{ row.company }}</span>
                <span>Reference {{ row.reference }}</span>
              </p>
            </div>
            <div class="benchmark__bars" role="img" :aria-label="`${row.label}: company ${row.company}, reference ${row.reference}`">
              <span><i :style="{ width: row.companyWidth }" /></span>
              <span class="is-ref"><i :style="{ width: row.referenceWidth }" /></span>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="report">
        <header>
          <div>
            <p class="panel__kicker">Business valuation summary</p>
            <p class="overview__name">{{ platformCompany.name }}</p>
          </div>
          <div class="report__meta">
            <span>Preview</span>
            <span>1 / 8</span>
          </div>
        </header>
        <dl>
          <div>
            <dt>Estimated value</dt>
            <dd>{{ platformCompany.value }}</dd>
          </div>
          <div>
            <dt>Valuation range</dt>
            <dd>{{ platformCompany.range }}</dd>
          </div>
        </dl>
        <ol>
          <li v-for="section in reportOutline" :key="section">{{ section }}</li>
        </ol>
      </div>
    </article>
  </div>
</template>

<style scoped>
.step {
  display: grid;
  gap: var(--space-5);
}

.step__copy {
  display: grid;
  gap: var(--space-2);
}

.panel {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
  padding: var(--space-5);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-2xl);
  background: #121a2b;
  color: #e2e8f0;
}

.panel__note,
.panel__kicker,
.overview__head p,
.overview__health span,
.value__hero p,
.benchmark__copy p,
.report__meta {
  margin: 0;
  color: #94a3b8;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.overview__name {
  margin: 0.2rem 0 0;
  color: #f8fafc;
  font-size: 1.25rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  text-transform: none;
}

.overview__head,
.report header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-4);
}

.overview__health {
  display: grid;
  gap: 0.35rem;
  min-width: 9rem;
}

.overview__health strong {
  color: #5eead4;
}

.overview__meter {
  display: block;
  height: 0.35rem;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: rgba(148, 163, 184, 0.18);
}

.overview__meter span {
  display: block;
  width: 78%;
  height: 100%;
  background: linear-gradient(90deg, #14b8a6, #5eead4);
}

.overview dl,
.value ul,
.report dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
}

.overview dt,
.report dt,
.value li span,
.analyze li span,
.benchmark__copy p span {
  display: block;
  color: #94a3b8;
  font-size: 0.75rem;
}

.overview dd,
.report dd,
.value li strong,
.analyze li strong {
  margin: 0;
  color: #f8fafc;
  font-size: 1.05rem;
  font-weight: 650;
}

.analyze,
.analyze section,
.analyze__insights,
.value,
.benchmark ul,
.report ol {
  display: grid;
  gap: var(--space-4);
}

.analyze ul,
.value ul,
.benchmark ul,
.report ol,
.overview dl {
  padding: 0;
  list-style: none;
}

.analyze ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2) var(--space-3);
  margin: 0;
}

.analyze__insights {
  grid-template-columns: 1fr;
}

.analyze__insights article,
.value li,
.overview dl > div,
.report dl > div {
  padding: var(--space-3);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.analyze__insights p {
  margin: 0.35rem 0 0;
  color: #94a3b8;
  font-size: 0.8125rem;
}

.value__hero {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.value__hero strong {
  font-size: clamp(2rem, 4vw, 2.75rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: #f8fafc;
}

.value ul {
  margin: 0;
}

.value li {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
}

.benchmark li {
  display: grid;
  gap: var(--space-2);
}

.benchmark__copy {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
}

.benchmark__copy p {
  display: flex;
  gap: var(--space-3);
  text-transform: none;
  letter-spacing: 0;
}

.benchmark__bars {
  display: grid;
  gap: 0.35rem;
}

.benchmark__bars span {
  display: block;
  height: 0.45rem;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: rgba(148, 163, 184, 0.16);
}

.benchmark__bars i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #14b8a6, #5eead4);
  font-style: normal;
}

.benchmark__bars .is-ref i {
  background: rgba(148, 163, 184, 0.55);
}

.report__meta {
  display: flex;
  gap: var(--space-3);
  text-transform: none;
}

.report ol {
  grid-template-columns: 1fr;
  margin: 0;
}

.report li {
  padding: 0.7rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
  color: #cbd5e1;
  font-size: 0.9rem;
}

@media (min-width: 768px) {
  .analyze {
    grid-template-columns: 1fr 1fr;
  }

  .analyze__insights {
    grid-column: 1 / -1;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .value {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }

  .overview dl,
  .report dl {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .report ol {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 429px) {
  .analyze ul,
  .overview dl,
  .report dl {
    grid-template-columns: 1fr;
  }
}
</style>
