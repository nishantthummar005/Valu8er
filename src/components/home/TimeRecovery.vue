<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { recoveryStages } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const activeId = ref<(typeof recoveryStages)[number]['id']>(recoveryStages[0].id)
const tabRefs = ref<HTMLButtonElement[]>([])

const active = computed(() => recoveryStages.find((s) => s.id === activeId.value) ?? recoveryStages[0])

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % recoveryStages.length
  if (event.key === 'ArrowLeft') next = (index - 1 + recoveryStages.length) % recoveryStages.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = recoveryStages.length - 1

  const stage = recoveryStages[next]
  if (!stage) return
  activeId.value = stage.id
  await nextTick()
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="recovery" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Where the hours go</p>
          <h2 class="text-h1 text-balance">
            See the leak — then take the
            <span class="heading-accent">hours back.</span>
          </h2>
          <p class="text-body">
            Across organize, model, and deliver, Valu8er collapses the busywork so professionals
            spend time on judgment, not file archaeology.
          </p>
        </header>

        <div class="recovery__tabs" role="tablist" aria-label="Valuation time recovery stages">
          <button
            v-for="(stage, index) in recoveryStages"
            :key="stage.id"
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :id="`recovery-tab-${stage.id}`"
            :aria-controls="`recovery-panel-${stage.id}`"
            :aria-selected="activeId === stage.id"
            :tabindex="activeId === stage.id ? 0 : -1"
            :class="{ 'is-active': activeId === stage.id }"
            @click="activeId = stage.id"
            @keydown="onTabKeydown($event, index)"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ stage.label }}
          </button>
        </div>

        <div
          :id="`recovery-panel-${active.id}`"
          :key="active.id"
          class="recovery__panel"
          role="tabpanel"
          :aria-labelledby="`recovery-tab-${active.id}`"
        >
          <article class="recovery__card">
            <p class="section-kicker">Today</p>
            <h3 class="text-h3">{{ active.todayTitle }}</h3>
            <p class="text-body-sm">{{ active.todayCopy }}</p>
            <p class="recovery__delta is-loss">{{ active.todayLoss }}</p>
          </article>
          <article class="recovery__card is-next">
            <p class="section-kicker">With Valu8er</p>
            <h3 class="text-h3">{{ active.nextTitle }}</h3>
            <p class="text-body-sm">{{ active.nextCopy }}</p>
            <p class="recovery__delta is-gain">{{ active.nextGain }}</p>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.recovery {
  display: grid;
  gap: var(--space-7);
}

.recovery header {
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

.recovery__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.recovery__tabs button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.7rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full, 999px);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.recovery__tabs button:hover:not(.is-active) {
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.recovery__tabs button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.recovery__tabs button span {
  color: var(--color-brand-primary);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
}

.recovery__tabs button.is-active {
  border-color: transparent;
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.recovery__tabs button.is-active span {
  color: var(--color-brand-highlight);
}

[data-theme='dark'] .recovery__tabs button {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .recovery__tabs button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  border-color: transparent;
  box-shadow: none;
}

[data-theme='dark'] .recovery__tabs button.is-active span {
  color: var(--color-brand-deep);
}

.recovery__panel {
  display: grid;
  gap: var(--space-4);
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.recovery__card {
  display: grid;
  gap: var(--space-3);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: color-mix(in srgb, var(--color-surface-muted) 40%, var(--color-surface));
  box-shadow: var(--shadow-xs);
}

.recovery__card.is-next {
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface)), var(--color-surface));
  box-shadow: var(--shadow-sm);
}

.recovery__delta {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 700;
}

.recovery__delta.is-loss {
  color: color-mix(in srgb, #ef4444 80%, var(--color-text));
}

.recovery__delta.is-gain {
  color: var(--color-brand-primary);
}

@media (min-width: 900px) {
  .recovery__panel {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .recovery__panel {
    animation: none;
  }
}
</style>
