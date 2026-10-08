<script setup lang="ts">
import { computed, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { costLeak } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const maxHours = computed(() => Math.max(...costLeak.perFile.map((row) => row.value)))

function barWidth(value: number) {
  return `${Math.round((value / maxHours.value) * 100)}%`
}
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="cost" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">{{ costLeak.kicker }}</p>
          <h2 class="text-h1 text-balance">
            Every engagement still leaks hours to
            <span class="heading-accent">folders, rework,</span>
            and version chase.
          </h2>
          <p class="text-body">{{ costLeak.lede }}</p>
        </header>

        <div class="cost__board" aria-label="Hours lost per engagement">
          <div class="cost__breakdown">
            <div class="cost__breakdown-head">
              <p class="cost__meta">{{ costLeak.perFileLabel }}</p>
              <p class="cost__total-chip">
                <strong>{{ costLeak.totalHours }} hrs</strong>
                <span>absorbed before judgment</span>
              </p>
            </div>

            <ul>
              <li
                v-for="(row, index) in costLeak.perFile"
                :key="row.label"
                :style="{ '--delay': `${index * 80}ms`, '--bar': barWidth(row.value) }"
              >
                <div class="cost__row-meta">
                  <span>{{ row.label }}</span>
                  <strong>{{ row.hours }}</strong>
                </div>
                <div class="cost__track" aria-hidden="true">
                  <span class="cost__fill" />
                </div>
              </li>
            </ul>
          </div>

          <div class="cost__impact" aria-label="Engagement impact">
            <article v-for="(item, index) in costLeak.totals" :key="item.label" :style="{ '--delay': `${320 + index * 90}ms` }">
              <strong>{{ item.value }}</strong>
              <h3>{{ item.label }}</h3>
              <p>{{ item.note }}</p>
            </article>
          </div>

          <div class="cost__annual" :style="{ '--delay': '620ms' }">
            <div class="cost__annual-head">
              <p class="cost__annual-kicker">{{ costLeak.annualLabel }}</p>
              <p class="cost__annual-note">{{ costLeak.annualNote }}</p>
            </div>
            <ul class="cost__annual-grid">
              <li v-for="item in costLeak.annual" :key="item.label">
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.cost {
  display: grid;
  gap: var(--space-8);
}

.cost header {
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

.cost__board {
  display: grid;
  gap: var(--space-8);
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background:
    radial-gradient(ellipse 70% 55% at 0% 0%, color-mix(in srgb, var(--color-brand-primary) 10%, transparent), transparent 70%),
    radial-gradient(ellipse 50% 40% at 100% 100%, color-mix(in srgb, var(--color-error) 6%, transparent), transparent 65%),
    var(--color-surface);
  overflow: clip;
}

.cost__breakdown {
  display: grid;
  gap: var(--space-5);
  min-width: 0;
}

.cost__breakdown-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3) var(--space-5);
}

.cost__meta {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.cost__total-chip {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.75rem;
  margin: 0;
}

.cost__total-chip strong {
  font-size: clamp(1.5rem, 1.25rem + 1vw, 2rem);
  letter-spacing: -0.03em;
  color: color-mix(in srgb, var(--color-error) 85%, var(--color-text));
  font-variant-numeric: tabular-nums;
}

.cost__total-chip span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.cost__breakdown ul {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.cost__breakdown li {
  display: grid;
  gap: 0.45rem;
  opacity: 0;
  transform: translateY(10px);
}

.cost.is-visible .cost__breakdown li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.cost__row-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
}

.cost__row-meta strong {
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
  font-weight: 650;
  white-space: nowrap;
}

.cost__track {
  height: 0.45rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-text) 6%, var(--color-surface-muted));
  overflow: hidden;
}

.cost__fill {
  display: block;
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--color-error) 55%, var(--color-brand-primary)),
    color-mix(in srgb, var(--color-error) 75%, #f97316)
  );
}

.cost.is-visible .cost__fill {
  width: var(--bar);
  transition: width calc(var(--duration-slow, 500ms) + 200ms) var(--ease-out);
  transition-delay: var(--delay);
}

.cost__impact {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.cost__impact article {
  display: grid;
  gap: 0.3rem;
  padding: var(--space-5) 0;
  opacity: 0;
  transform: translateY(10px);
}

.cost.is-visible .cost__impact article {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.cost__impact article + article {
  border-top: 1px solid var(--color-border);
}

.cost__impact strong {
  font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.35rem);
  letter-spacing: -0.035em;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
  line-height: 1.1;
}

.cost__impact h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 650;
}

.cost__impact p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
}

.cost__annual {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 2.5vw, 1.65rem) clamp(1.25rem, 2.5vw, 1.85rem);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(94, 234, 212, 0.2);
  background:
    radial-gradient(ellipse 55% 120% at 0% 50%, rgba(13, 148, 136, 0.18), transparent 58%),
    #171f2f;
  color: #f8fafc;
  opacity: 0;
  transform: translateY(12px);
}

.cost.is-visible .cost__annual {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.cost__annual-head {
  display: grid;
  gap: 0.45rem;
  width: 100%;
}

.cost__annual-kicker {
  margin: 0;
  color: #5eead4;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.cost__annual-note {
  margin: 0;
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

.cost__annual-grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: var(--space-4) 0 0;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  list-style: none;
}

.cost__annual-grid li {
  display: grid;
  gap: 0.3rem;
}

.cost__annual-grid strong {
  font-size: clamp(1.65rem, 1.35rem + 1.1vw, 2.15rem);
  letter-spacing: -0.035em;
  font-variant-numeric: tabular-nums;
  line-height: 1.05;
  color: #f8fafc;
}

.cost__annual-grid span {
  color: #94a3b8;
  font-size: 0.8125rem;
  line-height: 1.35;
}

@media (min-width: 768px) {
  .cost__impact {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .cost__impact article {
    padding: var(--space-5) var(--space-5) var(--space-5) 0;
  }

  .cost__impact article + article {
    border-top: none;
    border-left: 1px solid var(--color-border);
    padding-left: var(--space-5);
  }

  .cost__annual {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.55fr);
    align-items: center;
    column-gap: var(--space-6);
  }

  .cost__annual-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    padding: 0;
    border-top: none;
    border-left: 1px solid rgba(148, 163, 184, 0.16);
  }

  .cost__annual-grid li {
    padding: 0 clamp(0.75rem, 1.5vw, 1.25rem);
    min-width: 0;
  }

  .cost__annual-grid li + li {
    border-left: 1px solid rgba(148, 163, 184, 0.14);
  }

  .cost__annual-grid li:first-child {
    padding-left: clamp(1rem, 2vw, 1.5rem);
  }

  .cost__annual-grid strong {
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  }
}

@media (min-width: 1024px) {
  .cost__board {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.9fr);
    grid-template-areas:
      'breakdown impact'
      'annual annual';
    column-gap: var(--space-10);
    row-gap: var(--space-8);
    align-items: start;
  }

  .cost__breakdown {
    grid-area: breakdown;
  }

  .cost__impact {
    grid-area: impact;
    border: none;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
    padding-left: var(--space-8);
    border-left: 1px solid var(--color-border);
  }

  .cost__impact article {
    padding: var(--space-4) 0;
  }

  .cost__impact article + article {
    border-left: none;
    border-top: 1px solid var(--color-border);
    padding-left: 0;
  }

  .cost__annual {
    grid-area: annual;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cost.is-visible .cost__breakdown li,
  .cost.is-visible .cost__impact article,
  .cost.is-visible .cost__annual {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .cost.is-visible .cost__fill {
    transition: none;
    width: var(--bar);
  }
}
</style>
