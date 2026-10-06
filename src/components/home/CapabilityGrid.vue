<script setup lang="ts">
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const items = [
  {
    key: 'valuation',
    icon: 'valuation',
    title: 'Valuation',
    copy: 'Bring methods, ranges, and a working conclusion into one view that can be explained.',
  },
  {
    key: 'analysis',
    icon: 'analysis',
    title: 'Financial analysis',
    copy: 'Read revenue, earnings, and quality of results without hopping between files.',
  },
  {
    key: 'benchmarking',
    icon: 'benchmarking',
    title: 'Benchmarking',
    copy: 'Place the company next to a relevant set instead of an isolated spreadsheet.',
  },
  {
    key: 'insights',
    icon: 'insights',
    title: 'Business insights',
    copy: 'Surface the few drivers that actually move the range.',
  },
  {
    key: 'reports',
    icon: 'reports',
    title: 'Reports',
    copy: 'Turn the workspace into a structured narrative ready for review.',
  },
  {
    key: 'decision',
    icon: 'workflow',
    title: 'Decision support',
    copy: 'Keep assumptions, notes, and next steps attached to the same file.',
  },
]
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="capabilities" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Capabilities</p>
          <h2 class="text-h1">The work of valuation, kept in one system.</h2>
        </header>
        <div class="capabilities__grid">
          <article v-for="item in items" :key="item.key" :class="['capability', `capability--${item.key}`]">
            <span class="capability__icon">
              <AppIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
          </article>
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
  max-width: 36rem;
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
  display: grid;
  align-content: start;
  gap: var(--space-3);
  min-height: 100%;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.capability:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-brand-primary) 30%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.capability__icon {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, var(--color-surface));
}

.capability--valuation {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface)), var(--color-surface));
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
    min-height: 20rem;
  }

  .capability--analysis,
  .capability--benchmarking {
    grid-column: span 3;
  }

  .capability--insights,
  .capability--reports,
  .capability--decision {
    grid-column: span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability:hover {
    transform: none;
  }
}
</style>
