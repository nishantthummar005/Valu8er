<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { ref } from 'vue'
import { useReveal } from '@/composables/useReveal'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const audiences = [
  {
    to: '/solutions/business-owners',
    icon: 'company',
    title: 'Business owners',
    copy: 'Understand what the company is worth before a recapitalization, sale, or planning conversation.',
    points: ['A readable range', 'The drivers behind it', 'A file you can revisit'],
  },
  {
    to: '/solutions/advisors',
    icon: 'users',
    title: 'Advisors',
    copy: 'Keep client context, working notes, and the conclusion in one place instead of a trail of versions.',
    points: ['Shared workspace', 'Structured narrative', 'Faster review cycles'],
  },
  {
    to: '/solutions/finance-teams',
    icon: 'workflow',
    title: 'Finance teams',
    copy: 'Run internal valuations with a consistent method and a record of how the view was formed.',
    points: ['Repeatable process', 'Team allocation', 'Clear handoff'],
  },
]
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="audience" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Who it’s for</p>
          <h2 class="text-h1">The same system, different decisions.</h2>
        </header>
        <div class="audience__grid">
          <article v-for="item in audiences" :key="item.to">
            <span class="audience__icon">
              <AppIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="text-h3">{{ item.title }}</h3>
            <p class="text-body-sm">{{ item.copy }}</p>
            <ul>
              <li v-for="point in item.points" :key="point">{{ point }}</li>
            </ul>
            <RouterLink :to="item.to" class="audience__link">View solution</RouterLink>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.audience {
  display: grid;
  gap: var(--space-8);
}

.audience header {
  display: grid;
  gap: var(--space-3);
  max-width: 34rem;
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.audience__grid {
  display: grid;
  gap: var(--space-6);
}

.audience__grid article {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  transition:
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.audience__grid article:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--color-brand-primary) 30%, var(--color-border));
  box-shadow: var(--shadow-sm);
}

.audience__grid article:first-child {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface)), var(--color-surface));
}

.audience__icon {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
}

.audience__grid ul {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.audience__link {
  color: var(--color-brand-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.audience__link:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .audience__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .audience__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .audience__grid article:hover {
    transform: none;
  }
}
</style>
