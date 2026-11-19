<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { featureGroups, type FeatureCell } from '@/data/pricingDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
const expanded = ref(false)

const visibleGroups = computed(() => (expanded.value ? featureGroups : featureGroups.slice(0, 3)))

function cellClass(value: FeatureCell) {
  if (value === true) return 'is-yes'
  if (value === false) return 'is-empty'
  if (value === '—') return 'is-dash'
  return 'is-text'
}
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="compare" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            What’s included across
            <span class="heading-accent">every report</span>
          </h2>
          <p class="text-body">
            Compare report outputs, methodology coverage, calculations, and visual analytics across tiers.
          </p>
        </header>

        <div class="compare__table-wrap">
          <table class="compare__table">
            <thead>
              <tr>
                <th scope="col" class="compare__col-feature">Product</th>
                <th scope="col" class="compare__col-tier">Tables Only</th>
                <th scope="col" class="compare__col-tier">Brief Report</th>
                <th scope="col" class="compare__col-tier">Intermediate</th>
                <th scope="col" class="compare__col-tier">Advanced</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="group in visibleGroups" :key="group.title">
                <tr class="compare__group">
                  <th scope="colgroup" colspan="5">{{ group.title }}</th>
                </tr>
                <tr v-for="row in group.rows" :key="`${group.title}-${row.label}`">
                  <th scope="row">
                    <span v-if="row.labelHtml" v-html="row.labelHtml" />
                    <span v-else>{{ row.label }}</span>
                  </th>
                  <td :class="cellClass(row.tablesOnly)">
                    <span v-if="row.tablesOnly === true" class="compare__check">✓</span>
                    <span v-else-if="row.tablesOnly === '—'" class="compare__dash" title="Chart / Graph indicator">—</span>
                    <span v-else-if="row.tablesOnly === false" class="compare__empty"></span>
                    <span v-else class="compare__text">{{ row.tablesOnly }}</span>
                  </td>
                  <td :class="cellClass(row.briefReport)">
                    <span v-if="row.briefReport === true" class="compare__check">✓</span>
                    <span v-else-if="row.briefReport === '—'" class="compare__dash" title="Chart / Graph indicator">—</span>
                    <span v-else-if="row.briefReport === false" class="compare__empty"></span>
                    <span v-else class="compare__text">{{ row.briefReport }}</span>
                  </td>
                  <td :class="cellClass(row.intermediate)">
                    <span v-if="row.intermediate === true" class="compare__check">✓</span>
                    <span v-else-if="row.intermediate === '—'" class="compare__dash" title="Chart / Graph indicator">—</span>
                    <span v-else-if="row.intermediate === false" class="compare__empty"></span>
                    <span v-else class="compare__text">{{ row.intermediate }}</span>
                  </td>
                  <td :class="cellClass(row.advanced)">
                    <span v-if="row.advanced === true" class="compare__check">✓</span>
                    <span v-else-if="row.advanced === '—'" class="compare__dash" title="Chart / Graph indicator">—</span>
                    <span v-else-if="row.advanced === false" class="compare__empty"></span>
                    <span v-else class="compare__text">{{ row.advanced }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="compare__footnotes">
          <p class="compare__footnote">
            * Methodologies include Asset-Based, Capitalized Cash Flow (CCF), Discounted Cash Flow (DCF), Guideline Public Companies, Precedent Transactions, Rules of Thumb, and Custom Multiples.
          </p>
          <p class="compare__footnote">
            ** En Bloc and individual minority/controlling interest conclusions include lack of marketability &amp; minority discount modeling.
          </p>
        </div>

        <div class="compare__actions">
          <AppButton variant="outline" @click="expanded = !expanded">
            {{ expanded ? 'Show fewer features' : 'Show all features' }}
          </AppButton>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.compare {
  display: grid;
  gap: var(--space-7);
}

.compare header {
  display: grid;
  gap: var(--space-3);
}

.compare__table-wrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  -webkit-overflow-scrolling: touch;
}

.compare__table {
  width: 100%;
  min-width: 44rem;
  border-collapse: collapse;
}

.compare__table th,
.compare__table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: middle;
  font-size: 0.875rem;
}

.compare__table thead th {
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-weight: 650;
  white-space: nowrap;
}

.compare__col-tier {
  text-align: center !important;
  color: var(--color-brand-primary) !important;
  font-size: 0.92rem;
  font-weight: 700 !important;
  min-width: 7.5rem;
}

.compare__col-feature {
  min-width: 15rem;
}

.compare__table tbody th[scope='row'] {
  color: var(--color-text);
  font-weight: 550;
  min-width: 15rem;
}

.compare__group th {
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface-muted));
  color: var(--color-brand-deep);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

[data-theme='dark'] .compare__group th {
  color: var(--color-brand-highlight);
}

.compare__table td {
  color: var(--color-text-secondary);
  text-align: center;
}

.compare__check {
  color: var(--color-brand-primary);
  font-size: 1.15rem;
  font-weight: 750;
  line-height: 1;
}

.compare__dash {
  color: var(--color-text-muted);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1;
}

.compare__text {
  font-weight: 650;
  color: var(--color-text);
}

.compare__table td.is-yes {
  color: var(--color-brand-primary);
}

.compare__table td.is-dash {
  color: var(--color-text-muted);
}

.compare__table td.is-text {
  font-weight: 650;
  color: var(--color-text);
}

.compare__table td.is-empty {
  color: transparent;
}

.compare__footnotes {
  display: grid;
  gap: 0.35rem;
  padding: 0 0.5rem;
}

.compare__footnote {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.compare__actions {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .compare__table th,
  .compare__table td {
    padding: 0.95rem 1.25rem;
  }
}
</style>
