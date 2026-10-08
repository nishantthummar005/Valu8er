<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { connectedSystem } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="surface">
    <AppContainer size="xl">
      <div ref="root" class="connected" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">{{ connectedSystem.kicker }}</p>
          <h2 class="text-h1 text-balance">
            Your entire valuation workflow.
            <span class="heading-accent">One workspace.</span>
          </h2>
          <p class="text-body">{{ connectedSystem.lede }}</p>
        </header>

        <div class="connected__flow" aria-label="Connected valuation workflow">
          <section class="connected__rail connected__rail--in" aria-labelledby="connected-sources-label">
            <p id="connected-sources-label" class="connected__meta">{{ connectedSystem.sourcesLabel }}</p>
            <ul>
              <li
                v-for="(source, index) in connectedSystem.sources"
                :key="source"
                :style="{ '--delay': `${index * 60}ms` }"
              >
                {{ source }}
              </li>
            </ul>
          </section>

          <div class="connected__join" aria-hidden="true">
            <span />
          </div>

          <section class="connected__hub" aria-labelledby="connected-hub-label">
            <div class="connected__hub-head">
              <p id="connected-hub-label" class="connected__brand">{{ connectedSystem.hubLabel }}</p>
              <p class="connected__ready">{{ connectedSystem.readyLabel }}</p>
            </div>

            <ol>
              <li
                v-for="(stage, index) in connectedSystem.stages"
                :key="stage.label"
                :style="{ '--delay': `${280 + index * 90}ms` }"
              >
                <span class="connected__step-n">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="connected__step-body">
                  <strong>{{ stage.label }}</strong>
                  <em>{{ stage.state }}</em>
                </div>
                <span v-if="index < connectedSystem.stages.length - 1" class="connected__step-line" aria-hidden="true" />
              </li>
            </ol>
          </section>

          <div class="connected__join connected__join--out" aria-hidden="true">
            <span />
          </div>

          <section class="connected__rail connected__rail--out" aria-labelledby="connected-outcomes-label">
            <p id="connected-outcomes-label" class="connected__meta">{{ connectedSystem.outcomesLabel }}</p>
            <ul class="connected__outcomes">
              <li
                v-for="(item, index) in connectedSystem.callouts"
                :key="item.title"
                :style="{ '--delay': `${700 + index * 100}ms` }"
              >
                <h3>{{ item.title }}</h3>
                <p>{{ item.copy }}</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.connected {
  display: grid;
  gap: var(--space-8);
}

.connected header {
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

.connected__flow {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 2.5vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background:
    radial-gradient(ellipse 55% 45% at 50% 0%, color-mix(in srgb, var(--color-brand-primary) 12%, transparent), transparent 70%),
    var(--color-surface);
}

.connected__meta {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.connected__rail ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.connected__rail--in {
  display: grid;
  gap: var(--space-3);
}

.connected__rail--in li {
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-size: 0.8125rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(8px);
}

.connected.is-visible .connected__rail--in li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.connected__join {
  display: none;
}

.connected__hub {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 35%, var(--color-border));
  border-radius: var(--radius-xl);
  background:
    radial-gradient(ellipse 80% 60% at 20% 0%, color-mix(in srgb, var(--color-brand-primary) 28%, transparent), transparent 55%),
    #171f2f;
  color: #f8fafc;
  box-shadow: var(--shadow-md, 0 12px 40px rgba(11, 18, 32, 0.18));
}

.connected__hub-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2) var(--space-4);
}

.connected__brand {
  margin: 0;
  color: #5eead4;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.connected__ready {
  margin: 0;
  color: color-mix(in srgb, #5eead4 80%, #f8fafc);
  font-size: 0.8125rem;
  font-weight: 600;
}

.connected__hub ol {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;
}

.connected__hub li {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem 1rem;
  align-items: start;
  opacity: 0;
  transform: translateY(10px);
}

.connected.is-visible .connected__hub li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.connected__step-n {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  border: 1px solid color-mix(in srgb, #5eead4 45%, transparent);
  background: color-mix(in srgb, #0d9488 28%, transparent);
  color: #5eead4;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.connected__step-body strong {
  display: block;
  font-size: 0.9375rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #f8fafc;
}

.connected__step-body em {
  display: block;
  margin-top: 0.2rem;
  color: #94a3b8;
  font-size: 0.8125rem;
  font-style: normal;
}

.connected__step-line {
  display: none;
}

.connected__rail--out {
  display: grid;
  gap: var(--space-3);
}

.connected__outcomes {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.connected__outcomes li {
  display: grid;
  gap: 0.4rem;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
  opacity: 0;
  transform: translateY(10px);
}

.connected__outcomes li:last-child {
  padding-bottom: 0;
}

.connected.is-visible .connected__outcomes li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.connected__outcomes h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.connected__outcomes p {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (min-width: 900px) {
  .connected__flow {
    grid-template-columns: minmax(9.5rem, 0.85fr) auto minmax(0, 1.55fr) auto minmax(12rem, 1fr);
    align-items: stretch;
    column-gap: var(--space-4);
    row-gap: 0;
    padding: clamp(1.5rem, 2.5vw, 2.25rem);
  }

  .connected__rail--in,
  .connected__rail--out {
    align-content: start;
    padding-block: 0.25rem;
  }

  .connected__rail--in ul {
    flex-direction: column;
    align-items: stretch;
  }

  .connected__rail--in li {
    text-align: left;
  }

  .connected__join {
    display: grid;
    place-items: center;
    width: 1.5rem;
  }

  .connected__join span {
    position: relative;
    display: block;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-brand-primary) 35%, transparent),
      var(--color-brand-primary)
    );
  }

  .connected__join span::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1px;
    width: 6px;
    height: 6px;
    border-right: 1.5px solid var(--color-brand-primary);
    border-top: 1.5px solid var(--color-brand-primary);
    transform: translateY(-50%) rotate(45deg);
  }

  .connected__hub {
    min-height: 100%;
  }

  .connected__hub ol {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4) var(--space-5);
  }

  .connected__outcomes li {
    padding-block: var(--space-4);
  }

  .connected__outcomes li:first-child {
    border-top: none;
    padding-top: 0;
  }
}

@media (min-width: 1200px) {
  .connected__hub ol {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-3);
  }

  .connected__hub li {
    grid-template-columns: 1fr;
    gap: var(--space-3);
    padding-right: var(--space-2);
  }

  .connected__step-line {
    display: block;
    position: absolute;
    top: 1rem;
    left: calc(2rem + 0.35rem);
    right: -0.35rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #5eead4 55%, transparent),
      color-mix(in srgb, #5eead4 15%, transparent)
    );
  }

  .connected__hub li:last-child .connected__step-line {
    display: none;
  }
}

[data-theme='dark'] .connected__flow {
  border-color: var(--color-border-strong);
  background:
    radial-gradient(ellipse 55% 45% at 50% 0%, color-mix(in srgb, var(--color-brand-primary) 18%, transparent), transparent 70%),
    var(--color-surface-elevated);
}

[data-theme='dark'] .connected__rail--in li {
  border-color: var(--color-border-strong);
  background: color-mix(in srgb, var(--color-surface) 55%, #1a2438);
  color: var(--color-text);
}

[data-theme='dark'] .connected__hub {
  border-color: color-mix(in srgb, var(--color-brand-primary) 45%, var(--color-border-strong));
  background:
    radial-gradient(ellipse 80% 60% at 20% 0%, color-mix(in srgb, var(--color-brand-primary) 32%, transparent), transparent 55%),
    color-mix(in srgb, var(--color-surface) 70%, #020617);
  box-shadow: none;
}

[data-theme='dark'] .connected__outcomes li {
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .connected__outcomes h3 {
  color: var(--color-text);
}

@media (prefers-reduced-motion: reduce) {
  .connected.is-visible .connected__rail--in li,
  .connected.is-visible .connected__hub li,
  .connected.is-visible .connected__outcomes li {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
