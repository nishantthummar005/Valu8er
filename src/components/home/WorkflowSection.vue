<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const steps = [
  { n: '01', title: 'Discover', icon: 'company', copy: 'Gather the company, period, and the question the file needs to answer.' },
  { n: '02', title: 'Analyze', icon: 'analysis', copy: 'Read the financials and isolate the few measures that matter.' },
  { n: '03', title: 'Value', icon: 'valuation', copy: 'Form a range, test it against context, and record the midpoint view.' },
  { n: '04', title: 'Decide', icon: 'workflow', copy: 'Share the conclusion, the caveats, and the next action from the same place.' },
]
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="workflow" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Workflow</p>
          <h2 class="text-h1">From first file to a defensible view.</h2>
        </header>
        <ol>
          <li v-for="step in steps" :key="step.n">
            <span class="workflow__num">{{ step.n }}</span>
            <span class="workflow__icon">
              <AppIcon :name="step.icon" :size="20" />
            </span>
            <h3 class="text-h4">{{ step.title }}</h3>
            <p class="text-body-sm">{{ step.copy }}</p>
          </li>
        </ol>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.workflow {
  display: grid;
  gap: var(--space-8);
}

.workflow header {
  display: grid;
  gap: var(--space-3);
  max-width: 34rem;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.workflow ol {
  display: grid;
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}

.workflow li {
  position: relative;
  display: grid;
  gap: var(--space-3);
  padding-left: var(--space-2);
}

.workflow li:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 1.35rem;
  top: 4.65rem;
  bottom: -1.35rem;
  width: 1px;
  background: linear-gradient(180deg, var(--color-border-strong), transparent);
}

.workflow__num {
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.workflow__icon {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background: var(--color-surface);
}

@media (min-width: 1024px) {
  .workflow ol {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-6);
  }

  .workflow li:not(:last-child)::before {
    display: none;
  }

  .workflow li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 2.9rem;
    left: 3.4rem;
    right: -1.2rem;
    height: 1px;
    background: linear-gradient(90deg, var(--color-border-strong), transparent);
  }
}
</style>
