<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import { useReveal } from '@/composables/useReveal'
import { impactStats } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <section ref="root" class="impact" :class="{ 'is-visible': visible }">
    <div class="impact__glow" aria-hidden="true" />
    <AppContainer size="xl">
      <header class="impact__header">
        <p class="section-kicker">By the numbers</p>
        <h2 class="text-h2 text-balance">
          Built for throughput —
          <span class="heading-accent">not more headcount.</span>
        </h2>
      </header>
      <ul>
        <li v-for="stat in impactStats" :key="stat.label">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </li>
      </ul>
      <div class="impact__cta">
        <AppButton size="lg" to="/get-started">Start your free trial</AppButton>
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.impact {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-16);
  border-block: 1px solid var(--color-border);
  background:
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg) 100%);
}

[data-theme='dark'] .impact {
  background:
    linear-gradient(180deg, #171f2f 0%, #121a28 100%);
}

.impact__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 0%, var(--color-glow), transparent 40%);
  opacity: 0.7;
}

.impact :deep(.app-container) {
  position: relative;
  display: grid;
  gap: var(--space-8);
  justify-items: center;
  text-align: center;
}

.impact__header {
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

.impact__header h2 {
  margin: 0;
}

.impact ul {
  display: grid;
  gap: var(--space-6);
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.impact li {
  display: grid;
  gap: 0.4rem;
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xs);
}

[data-theme='dark'] .impact li {
  background: var(--color-surface-elevated);
}

.impact strong {
  font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem);
  letter-spacing: -0.03em;
  color: var(--color-text);
}

.impact span {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.4;
}

.impact__cta {
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .impact {
    padding-block: var(--space-20);
  }

  .impact ul {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-4);
  }
}
</style>
