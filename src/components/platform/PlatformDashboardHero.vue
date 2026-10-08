<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import MiniBars from '@/components/home/MiniBars.vue'
import RangeMeter from '@/components/home/RangeMeter.vue'
import SparkLine from '@/components/home/SparkLine.vue'
import { useReveal } from '@/composables/useReveal'
import {
  dashboardDrivers,
  dashboardMetrics,
  dashboardNav,
  ebitdaTrend,
  platformCompany,
  revenueTrend,
} from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section id="platform-dashboard" class="dashboard-hero">
    <AppContainer size="xl">
      <article
        ref="root"
        class="dashboard"
        :class="{ 'is-visible': visible }"
        aria-label="Illustrative valuation workspace"
      >
        <header class="dashboard__bar">
          <div>
            <p class="dashboard__company">{{ platformCompany.name }}</p>
            <p>{{ platformCompany.industry }} · {{ platformCompany.period }}</p>
          </div>
          <div class="dashboard__status">
            <AppBadge tone="success">{{ platformCompany.status }}</AppBadge>
            <AppBadge tone="brand">Illustrative demo</AppBadge>
          </div>
        </header>

        <div class="dashboard__shell">
          <nav class="dashboard__nav" aria-label="Workspace areas">
            <RouterLink
              v-for="item in dashboardNav"
              :key="item.label"
              :to="item.to"
              :aria-current="item.current ? 'page' : undefined"
              :class="{ 'is-current': item.current }"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <div class="dashboard__main">
            <section class="dashboard__value">
              <span class="dashboard__label">Estimated business value</span>
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

            <div class="dashboard__metrics">
              <article v-for="metric in dashboardMetrics" :key="metric.label">
                <span class="dashboard__label">{{ metric.label }}</span>
                <strong>{{ metric.value }}</strong>
              </article>
            </div>

            <section class="dashboard__chart dashboard__chart--revenue">
              <span class="dashboard__label">Revenue trend</span>
              <SparkLine :points="revenueTrend" :width="240" :height="52" label="Illustrative revenue trend" />
            </section>
            <section class="dashboard__chart dashboard__chart--ebitda">
              <span class="dashboard__label">EBITDA trend</span>
              <SparkLine :points="ebitdaTrend" :width="240" :height="52" label="Illustrative EBITDA trend" />
            </section>
            <section class="dashboard__chart dashboard__chart--bars">
              <span class="dashboard__label">Key value drivers</span>
              <MiniBars :values="[90, 78, 72, 64, 58]" label="Illustrative driver emphasis" />
            </section>
          </div>

          <aside class="dashboard__aside">
            <span class="dashboard__label">Value drivers</span>
            <ul>
              <li v-for="driver in dashboardDrivers" :key="driver.label">
                <span>{{ driver.label }}</span>
                <strong>{{ driver.value }}</strong>
              </li>
            </ul>
          </aside>
        </div>
      </article>
    </AppContainer>
  </section>
</template>

<style scoped>
.dashboard-hero {
  padding-block: var(--space-6) var(--space-12);
  scroll-margin-top: 5.75rem;
}

.dashboard {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
  padding: var(--space-5);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-2xl);
  background: #121a2b;
  color: #f1f5f9;
  box-shadow: var(--shadow-lg);
}

.dashboard__bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-3);
  align-items: flex-start;
}

.dashboard__bar p,
.dashboard__value p,
.dashboard__aside li {
  margin: 0;
}

.dashboard__bar p:not(.dashboard__company),
.dashboard__label,
.dashboard__value p {
  color: #94a3b8;
  font-size: 0.75rem;
}

.dashboard__company {
  color: #f8fafc;
  font-size: 1.125rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.dashboard :deep(.app-badge--brand) {
  color: #5eead4;
  background: rgba(20, 184, 166, 0.16);
}

.dashboard__label {
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 550;
}

.dashboard__status {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.dashboard__shell {
  display: grid;
  gap: var(--space-4);
  min-width: 0;
}

.dashboard__main,
.dashboard__aside,
.dashboard__metrics,
.dashboard__value,
.dashboard__chart {
  min-width: 0;
}

.dashboard__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.dashboard__nav a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0 var(--space-3);
  border-radius: var(--radius-full);
  color: #cbd5e1;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
}

.dashboard__nav a.is-current,
.dashboard__nav a:hover {
  background: rgba(20, 184, 166, 0.14);
  color: #5eead4;
}

.dashboard__nav a:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.dashboard__main {
  display: grid;
  gap: var(--space-3);
}

.dashboard__value,
.dashboard__chart,
.dashboard__metrics article,
.dashboard__aside {
  padding: var(--space-4);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: var(--radius-lg);
  background: #0e1624;
}

.dashboard__value {
  display: grid;
  gap: var(--space-3);
}

.dashboard__value strong {
  font-size: clamp(2rem, 4vw, 2.85rem);
  letter-spacing: -0.04em;
  line-height: 1;
}

.dashboard__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.dashboard__metrics article {
  display: grid;
  gap: 0.3rem;
}

.dashboard__metrics strong {
  font-size: 1.05rem;
}

.dashboard__chart {
  display: grid;
  gap: var(--space-3);
}

.dashboard__aside ul {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-3) 0 0;
  padding: 0;
  list-style: none;
}

.dashboard__aside li {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: 0.875rem;
  color: #cbd5e1;
}

@media (min-width: 768px) {
  .dashboard {
    padding: var(--space-6);
  }

  .dashboard__main {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      'value metrics metrics'
      'value revenue ebitda'
      'bars bars bars';
  }

  .dashboard__value {
    grid-area: value;
  }

  .dashboard__metrics {
    grid-area: metrics;
  }

  .dashboard__chart--revenue {
    grid-area: revenue;
  }

  .dashboard__chart--ebitda {
    grid-area: ebitda;
  }

  .dashboard__chart--bars {
    grid-area: bars;
  }
}

@media (min-width: 1024px) {
  .dashboard__shell {
    grid-template-columns: minmax(0, 1fr) 15.5rem;
    grid-template-areas:
      'nav nav'
      'main aside';
    align-items: start;
  }

  .dashboard__nav {
    grid-area: nav;
  }

  .dashboard__main {
    grid-area: main;
  }

  .dashboard__aside {
    grid-area: aside;
  }
}

@media (min-width: 1440px) {
  .dashboard-hero {
    padding-block: var(--space-6) var(--space-16);
  }

  .dashboard__shell {
    grid-template-columns: 10rem minmax(0, 1fr) 15.5rem;
    grid-template-areas: 'nav main aside';
  }

  .dashboard__nav {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard__nav a {
    justify-content: flex-start;
    border-radius: var(--radius-md);
  }
}
</style>
