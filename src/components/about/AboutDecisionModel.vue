<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutDecisionSteps } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section class="decision">
    <div class="decision__glow" aria-hidden="true" />
    <AppContainer size="xl">
      <div ref="root" class="decision__inner" :class="{ 'is-visible': visible }">
        <header>
          <p class="decision__kicker">Decision model</p>
          <h2 class="text-h1 text-balance">
            Build the product around the decision, not
            <span class="heading-accent">the data.</span>
          </h2>
          <p class="decision__lede">
            Every screen should move someone closer to a clearer conclusion — not just a denser
            spreadsheet.
          </p>
        </header>

        <ol>
          <li
            v-for="(step, index) in aboutDecisionSteps"
            :key="step.label"
            :style="{ '--delay': `${index * 100}ms` }"
          >
            <span class="decision__n">0{{ index + 1 }}</span>
            <span class="decision__label">{{ step.label }}</span>
            <p>{{ step.copy }}</p>
            <span
              v-if="index < aboutDecisionSteps.length - 1"
              class="decision__connector"
              aria-hidden="true"
            />
          </li>
        </ol>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.decision {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  background:
    radial-gradient(circle at 50% -10%, rgba(45, 212, 191, 0.14), transparent 42%),
    linear-gradient(180deg, #151d2c 0%, #101826 100%);
  color: #f8fafc;
}

.decision__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, #000 15%, transparent 88%);
}

.decision__inner {
  position: relative;
  display: grid;
  gap: var(--space-10);
}

.decision header {
  display: grid;
  gap: var(--space-4);
}

.decision__kicker {
  margin: 0;
  color: #5eead4;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

#app .decision .text-h1 {
  color: #f8fafc;
}

.decision__lede {
  margin: 0;
  color: #94a3b8;
  font-size: 1.0625rem;
  line-height: 1.6;
}

.decision ol {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.decision li {
  position: relative;
  display: grid;
  gap: var(--space-2);
  padding: var(--space-5);
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-xl);
  background: rgba(23, 31, 47, 0.65);
  opacity: 0;
  transform: translateY(12px);
}

.decision__inner.is-visible li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.decision__n {
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  margin-bottom: 0.35rem;
  border-radius: 50%;
  border: 1px solid rgba(94, 234, 212, 0.35);
  color: #5eead4;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  background: rgba(20, 184, 166, 0.1);
}

.decision__label {
  color: #f8fafc;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.decision p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.decision__connector {
  display: none;
}

@media (min-width: 960px) {
  .decision {
    padding-block: var(--space-20);
  }

  .decision ol {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--space-4);
  }

  .decision__connector {
    display: block;
    position: absolute;
    top: 50%;
    left: calc(100% - 0.15rem);
    width: calc(100% - 2rem);
    height: 1px;
    transform: translateY(-50%);
    background: linear-gradient(
      90deg,
      color-mix(in srgb, #5eead4 50%, transparent),
      color-mix(in srgb, #5eead4 8%, transparent)
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .decision__inner.is-visible li {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
