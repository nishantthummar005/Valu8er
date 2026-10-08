<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const items = [
  { label: 'Workflow', icon: 'workflow' },
  { label: 'Analysis', icon: 'analysis' },
  { label: 'Multiples', icon: 'valuation' },
  { label: 'Documents', icon: 'documents' },
  { label: 'Reports', icon: 'reports' },
  { label: 'AWS security', icon: 'security' },
]
</script>

<template>
  <section ref="root" class="trust-strip" :class="{ 'is-visible': visible }">
    <AppContainer size="xl">
      <p class="text-h4">Built for clearer, faster, defensible valuations.</p>
      <ul>
        <li v-for="item in items" :key="item.label">
          <AppIcon :name="item.icon" :size="18" />
          <span class="text-label">{{ item.label }}</span>
        </li>
      </ul>
    </AppContainer>
  </section>
</template>

<style scoped>
.trust-strip {
  border-block: 1px solid var(--color-border);
  background: var(--color-surface);
  padding-block: var(--space-8);
}

.trust-strip :deep(.app-container) {
  display: grid;
  gap: var(--space-6);
  justify-items: center;
  text-align: center;
}

.trust-strip ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3) var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}

.trust-strip li {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-secondary);
}

.trust-strip :deep(.app-icon) {
  color: var(--color-brand-primary);
}
</style>
