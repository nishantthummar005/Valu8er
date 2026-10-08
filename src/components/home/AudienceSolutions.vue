<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { homeAudiences } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const activeId = ref<(typeof homeAudiences)[number]['id']>(homeAudiences[0].id)
const tabRefs = ref<HTMLButtonElement[]>([])

const active = computed(() => homeAudiences.find((a) => a.id === activeId.value) ?? homeAudiences[0])

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % homeAudiences.length
  if (event.key === 'ArrowLeft') next = (index - 1 + homeAudiences.length) % homeAudiences.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = homeAudiences.length - 1

  const audience = homeAudiences[next]
  if (!audience) return
  activeId.value = audience.id
  await nextTick()
  tabRefs.value[next]?.focus()
}
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="audience" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Built for every practice shape</p>
          <h2 class="text-h1 text-balance">
            The same platform underneath —
            <span class="heading-accent">tuned to how you decide.</span>
          </h2>
          <p class="text-body">
            Owners, advisors, and finance teams share one valuation system. What changes is the
            decision each audience needs to make next.
          </p>
        </header>

        <div class="audience__tabs" role="tablist" aria-label="Audience solutions">
          <button
            v-for="(item, index) in homeAudiences"
            :key="item.id"
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :id="`audience-tab-${item.id}`"
            :aria-controls="`audience-panel-${item.id}`"
            :aria-selected="activeId === item.id"
            :tabindex="activeId === item.id ? 0 : -1"
            :class="{ 'is-active': activeId === item.id }"
            @click="activeId = item.id"
            @keydown="onTabKeydown($event, index)"
          >
            {{ item.label }}
          </button>
        </div>

        <div
          :id="`audience-panel-${active.id}`"
          :key="active.id"
          class="audience__panel"
          role="tabpanel"
          :aria-labelledby="`audience-tab-${active.id}`"
        >
          <div class="audience__main">
            <h3 class="text-h2">{{ active.title }}</h3>
            <p class="text-body">{{ active.copy }}</p>
            <ul>
              <li v-for="point in active.points" :key="point">{{ point }}</li>
            </ul>
            <RouterLink :to="active.to" class="audience__link">{{ active.cta }} →</RouterLink>
          </div>

          <aside class="audience__focus">
            <p class="section-kicker">What matters most</p>
            <ul>
              <li v-for="item in active.focus" :key="item.label">
                <span>{{ item.label }}</span>
                <strong>{{ item.level }}</strong>
              </li>
            </ul>
            <p class="audience__help">
              Not sure which plan fits? Most teams find their footing in a short walkthrough of
              engagement mix, report level, and seats.
            </p>
            <RouterLink to="/pricing" class="audience__link">Compare pricing →</RouterLink>
          </aside>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.audience {
  display: grid;
  gap: var(--space-7);
}

.audience header {
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

.audience__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.audience__tabs button {
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

.audience__tabs button:hover:not(.is-active) {
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.audience__tabs button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.audience__tabs button.is-active {
  border-color: transparent;
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

[data-theme='dark'] .audience__tabs button {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .audience__tabs button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  border-color: transparent;
  box-shadow: none;
}

.audience__panel {
  display: grid;
  gap: var(--space-5);
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.audience__main,
.audience__focus {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
}

.audience__main {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 7%, var(--color-surface)), var(--color-surface));
}

.audience__main ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.audience__main li {
  position: relative;
  padding-left: 1.1rem;
}

.audience__main li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.audience__focus ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.audience__focus li {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9375rem;
}

.audience__focus strong {
  color: var(--color-brand-primary);
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.audience__help {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.audience__link {
  color: var(--color-brand-primary);
  font-size: 0.9375rem;
  font-weight: 650;
  text-decoration: none;
}

.audience__link:hover {
  text-decoration: underline;
}

@media (min-width: 960px) {
  .audience__panel {
    grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.85fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .audience__panel {
    animation: none;
  }
}
</style>
