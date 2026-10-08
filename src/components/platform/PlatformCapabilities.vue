<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { platformCapabilities } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="capabilities" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Why this platform</p>
          <h2 class="text-h1 text-balance">
            Everything you need to understand
            <span class="heading-accent">business value.</span>
          </h2>
        </header>

        <div class="capabilities__grid">
          <RouterLink
            v-for="item in platformCapabilities"
            :key="item.title"
            :to="item.to"
            class="capability"
            :class="`capability--${item.icon}`"
          >
            <span class="capability__icon">
              <AppIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
            <svg class="capability__arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </RouterLink>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.capabilities {
  display: grid;
  gap: var(--space-8);
}

.capabilities header {
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

.capabilities__grid {
  display: grid;
  gap: var(--space-4);
}

.capability {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-3);
  min-height: 100%;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  color: inherit;
  text-decoration: none;
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.capability:hover,
.capability:focus-visible {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-brand-primary) 32%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.capability:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.capability__icon {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, var(--color-surface));
}

.capability__arrow {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: var(--space-2);
  color: var(--color-brand-primary);
  opacity: 0.7;
}

.capability--valuation {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 9%, var(--color-surface)), var(--color-surface));
}

@media (min-width: 768px) {
  .capabilities__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .capabilities__grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .capability--valuation {
    grid-column: span 3;
    grid-row: span 2;
  }

  .capability--analysis,
  .capability--insights {
    grid-column: span 3;
  }

  .capability--benchmarking,
  .capability--analytics,
  .capability--reports {
    grid-column: span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability:hover,
  .capability:focus-visible {
    transform: none;
  }
}
</style>
