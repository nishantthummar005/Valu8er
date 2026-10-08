<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { workflowSteps } from '@/data/platformDemo'
import PlatformWorkflowStep from './PlatformWorkflowStep.vue'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const activeId = ref<(typeof workflowSteps)[number]['id']>(workflowSteps[0].id)
const tabRefs = ref<HTMLButtonElement[]>([])

const activeStep = computed(() => workflowSteps.find((step) => step.id === activeId.value) ?? workflowSteps[0])

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

function selectStep(id: (typeof workflowSteps)[number]['id']) {
  activeId.value = id
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % workflowSteps.length
  if (event.key === 'ArrowLeft') next = (index - 1 + workflowSteps.length) % workflowSteps.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = workflowSteps.length - 1

  const step = workflowSteps[next]
  if (!step) return
  activeId.value = step.id
  await nextTick()
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="workflow" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">End-to-end workflow</p>
          <h2 class="text-h1 text-balance">
            From financial information to a
            <span class="heading-accent">clearer valuation.</span>
          </h2>
          <p class="text-body">
            Follow the business through the complete valuation intelligence workflow.
          </p>
        </header>

        <div
          class="workflow__tabs"
          role="tablist"
          aria-label="Platform workflow steps"
        >
          <button
            v-for="(step, index) in workflowSteps"
            :key="step.id"
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :id="`workflow-tab-${step.id}`"
            :aria-controls="`workflow-panel-${step.id}`"
            :aria-selected="activeId === step.id"
            :tabindex="activeId === step.id ? 0 : -1"
            :class="{ 'is-active': activeId === step.id }"
            @click="selectStep(step.id)"
            @keydown="onTabKeydown($event, index)"
          >
            <span>{{ step.n }}</span>
            {{ step.title }}
          </button>
        </div>

        <PlatformWorkflowStep :key="activeStep.id" :step="activeStep" />
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.workflow {
  display: grid;
  gap: var(--space-7);
  scroll-margin-top: 5.75rem;
}

.workflow header {
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

.workflow__tabs {
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
}

.workflow__tabs button {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  flex: 0 0 auto;
  min-height: 2.75rem;
  padding: 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  scroll-snap-align: start;
  cursor: pointer;
  transition:
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.workflow__tabs button:hover:not(.is-active) {
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.workflow__tabs button span {
  color: var(--color-brand-primary);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
}

.workflow__tabs button.is-active {
  background: var(--color-text);
  border-color: transparent;
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.workflow__tabs button.is-active span {
  color: var(--color-brand-highlight);
}

.workflow__tabs button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

@media (min-width: 1024px) {
  .workflow__tabs {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    overflow: visible;
  }

  .workflow__tabs button {
    justify-content: center;
    width: 100%;
  }
}

[data-theme='dark'] .workflow__tabs button {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .workflow__tabs button.is-active {
  background: var(--color-text);
  border-color: transparent;
  color: var(--color-text-inverse);
  box-shadow: none;
}

[data-theme='dark'] .workflow__tabs button.is-active span {
  color: var(--color-brand-deep);
}
</style>
