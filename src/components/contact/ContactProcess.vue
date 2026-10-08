<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { contactProcess } from '@/data/contact'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection>
    <AppContainer size="xl">
      <div ref="root" class="process" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            A simple
            <span class="heading-accent">next step.</span>
          </h2>
        </header>

        <ol class="process__steps">
          <li
            v-for="(step, index) in contactProcess"
            :key="step.n"
            :style="{ '--delay': `${index * 100}ms` }"
          >
            <span class="process__n">{{ step.n }}</span>
            <div>
              <h3 class="text-h3">{{ step.title }}</h3>
              <p class="text-body-sm">{{ step.copy }}</p>
            </div>
          </li>
        </ol>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.process {
  display: grid;
  gap: var(--space-8);
}

.process header {
}

.process__steps {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;
}

.process__steps li {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
  opacity: 0;
  transform: translateY(10px);
}

.process.is-visible .process__steps li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.process__n {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-full);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 40%, var(--color-border));
  background: color-mix(in srgb, var(--color-brand-primary) 10%, var(--color-surface));
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.process__steps h3 {
  margin: 0 0 var(--space-2);
}

.process__steps p {
  margin: 0;
  color: var(--color-text-secondary);
  max-width: 28rem;
}

@media (min-width: 900px) {
  .process__steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-6);
  }

  .process__steps li {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-right: var(--space-4);
  }

  .process__steps li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 1.35rem;
    left: calc(2.75rem + 0.75rem);
    right: 0.5rem;
    height: 1px;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--color-brand-primary) 45%, transparent),
      color-mix(in srgb, var(--color-brand-primary) 10%, transparent)
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .process.is-visible .process__steps li {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
