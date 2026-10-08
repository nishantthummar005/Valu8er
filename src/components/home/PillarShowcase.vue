<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { homePillars } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const activeId = ref<(typeof homePillars)[number]['id']>(homePillars[0].id)
const tabRefs = ref<HTMLButtonElement[]>([])

const active = computed(() => homePillars.find((p) => p.id === activeId.value) ?? homePillars[0])

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % homePillars.length
  if (event.key === 'ArrowLeft') next = (index - 1 + homePillars.length) % homePillars.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = homePillars.length - 1

  const pillar = homePillars[next]
  if (!pillar) return
  activeId.value = pillar.id
  await nextTick()
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="pillars" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">What modern valuation teams need</p>
          <h2 class="text-h1 text-balance">
            Workspace, intelligence, and delivery —
            <span class="heading-accent">in one product.</span>
          </h2>
          <p class="text-body">
            Valu8er combines team workflow, guided analysis, and report generation so engagements
            move from inputs to a defensible package without tool-hopping.
          </p>
        </header>

        <div class="pillars__tabs" role="tablist" aria-label="Valu8er product pillars">
          <button
            v-for="(pillar, index) in homePillars"
            :key="pillar.id"
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :id="`pillar-tab-${pillar.id}`"
            :aria-controls="`pillar-panel-${pillar.id}`"
            :aria-selected="activeId === pillar.id"
            :tabindex="activeId === pillar.id ? 0 : -1"
            :class="{ 'is-active': activeId === pillar.id }"
            @click="activeId = pillar.id"
            @keydown="onTabKeydown($event, index)"
          >
            {{ pillar.label }}
          </button>
        </div>

        <div
          :id="`pillar-panel-${active.id}`"
          :key="active.id"
          class="pillars__panel"
          role="tabpanel"
          :aria-labelledby="`pillar-tab-${active.id}`"
        >
          <div class="pillars__copy">
            <h3 class="text-h2">{{ active.title }}</h3>
            <p class="text-body">{{ active.copy }}</p>
            <ul>
              <li v-for="point in active.points" :key="point">{{ point }}</li>
            </ul>
          </div>

          <aside class="pillars__preview" aria-label="Illustrative product panel">
            <p class="pillars__eyebrow">{{ active.panel.eyebrow }}</p>
            <h4>{{ active.panel.heading }}</h4>
            <dl>
              <div v-for="metric in active.panel.metrics" :key="metric.label">
                <dt>{{ metric.label }}</dt>
                <dd>{{ metric.value }}</dd>
              </div>
            </dl>
            <p class="pillars__status">{{ active.panel.status }}</p>
          </aside>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.pillars {
  display: grid;
  gap: var(--space-7);
}

.pillars header {
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

.pillars__tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  padding: var(--space-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full, 999px);
  background: color-mix(in srgb, var(--color-surface-muted) 70%, var(--color-surface));
  width: fit-content;
  max-width: 100%;
}

.pillars__tabs button {
  padding: 0.65rem 1.1rem;
  border: 0;
  border-radius: var(--radius-full, 999px);
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 650;
  cursor: pointer;
  transition:
    color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.pillars__tabs button:hover:not(.is-active) {
  color: var(--color-text);
}

.pillars__tabs button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.pillars__tabs button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

[data-theme='dark'] .pillars__tabs {
  border-color: var(--color-border-strong);
  background: color-mix(in srgb, var(--color-surface-elevated) 80%, black);
}

[data-theme='dark'] .pillars__tabs button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: none;
}

.pillars__panel {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: color-mix(in srgb, var(--color-surface-muted) 35%, var(--color-surface));
  box-shadow: var(--shadow-xs);
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.pillars__copy {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.pillars__copy ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.pillars__copy li {
  position: relative;
  padding-left: 1.1rem;
}

.pillars__copy li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.pillars__preview {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  background: #171f2f;
  color: #f8fafc;
}

.pillars__eyebrow {
  margin: 0;
  color: #5eead4;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pillars__preview h4 {
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
}

.pillars__preview dl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin: 0;
}

.pillars__preview dl div {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: rgba(148, 163, 184, 0.1);
}

.pillars__preview dt {
  color: #94a3b8;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.pillars__preview dd {
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
  font-weight: 650;
}

.pillars__status {
  margin: 0;
  color: #5eead4;
  font-size: 0.8125rem;
  font-weight: 650;
}

@media (min-width: 960px) {
  .pillars__panel {
    grid-template-columns: minmax(0, 1.1fr) minmax(16rem, 0.9fr);
    align-items: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pillars__panel {
    animation: none;
  }
}
</style>
