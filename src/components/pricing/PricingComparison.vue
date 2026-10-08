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

const visibleGroups = computed(() => (expanded.value ? featureGroups : featureGroups.slice(0, 2)))

function display(value: FeatureCell) {
  if (typeof value === 'boolean') return value ? '✓' : '—'
  return value
}

function cellClass(value: FeatureCell) {
  if (value === true) return 'is-yes'
  if (value === false) return 'is-no'
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
            <span class="heading-accent">every plan</span>
          </h2>
          <p class="text-body">
            Compare workspace capabilities, collaboration, controls, and support — without add-on product tabs.
          </p>
        </header>

        <div class="compare__table-wrap">
          <table class="compare__table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Essentials</th>
                <th scope="col">Professional</th>
                <th scope="col">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="group in visibleGroups" :key="group.title">
                <tr class="compare__group">
                  <th scope="colgroup" colspan="4">{{ group.title }}</th>
                </tr>
                <tr v-for="row in group.rows" :key="`${group.title}-${row.label}`">
                  <th scope="row">{{ row.label }}</th>
                  <td :class="cellClass(row.essentials)">{{ display(row.essentials) }}</td>
                  <td :class="cellClass(row.professional)">{{ display(row.professional) }}</td>
                  <td :class="cellClass(row.enterprise)">{{ display(row.enterprise) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
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
  min-width: 40rem;
  border-collapse: collapse;
}

.compare__table th,
.compare__table td {
  padding: 0.9rem 1rem;
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

.compare__table tbody th[scope='row'] {
  color: var(--color-text);
  font-weight: 550;
  min-width: 12rem;
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

.compare__table td.is-yes {
  color: var(--color-brand-primary);
  font-weight: 700;
}

.compare__table td.is-no {
  color: var(--color-text-muted);
}

.compare__actions {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .compare__table th,
  .compare__table td {
    padding: 1rem 1.25rem;
  }
}
</style>
