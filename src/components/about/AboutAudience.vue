<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { aboutAudience } from '@/data/about'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="soft">
    <AppContainer size="xl">
      <div ref="root" class="audience" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Who it’s for</p>
          <h2 class="text-h1 text-balance">
            Built around the people making
            <span class="heading-accent">financial decisions.</span>
          </h2>
          <p class="text-body">
            One platform underneath — tuned to the decision each audience needs to make next.
          </p>
        </header>

        <ul>
          <li
            v-for="(item, index) in aboutAudience"
            :key="item.title"
            :style="{ '--delay': `${index * 90}ms` }"
          >
            <div class="audience__top">
              <span class="audience__icon" aria-hidden="true">
                <AppIcon :name="item.icon" :size="22" />
              </span>
              <span class="audience__index">0{{ index + 1 }}</span>
            </div>
            <h3 class="text-h2">{{ item.title }}</h3>
            <p class="text-body">{{ item.copy }}</p>
            <RouterLink :to="item.to" class="audience__link">
              <span>{{ item.cta }}</span>
              <AppIcon name="mdi-arrow-right" :size="18" />
            </RouterLink>
          </li>
        </ul>
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
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.audience ul {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.audience li {
  position: relative;
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 92%, var(--color-brand-primary)), var(--color-surface));
  box-shadow: var(--shadow-xs);
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.audience li::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--color-brand-bright), var(--color-brand-primary));
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.audience.is-visible li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.audience li:hover {
  border-color: color-mix(in srgb, var(--color-brand-primary) 35%, var(--color-border));
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.audience li:hover::before {
  opacity: 1;
}

.audience__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.audience__icon {
  display: inline-flex;
  width: 2.85rem;
  height: 2.85rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
}

.audience__index {
  color: color-mix(in srgb, var(--color-brand-primary) 45%, transparent);
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.audience h3,
.audience p {
  margin: 0;
}

.audience p {
  color: var(--color-text-secondary);
}

.audience__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  width: max-content;
  margin-top: 0.25rem;
  color: var(--color-brand-primary);
  font-size: 0.875rem;
  font-weight: 650;
  text-decoration: none;
  transition: gap var(--duration-fast) var(--ease-out);
}

.audience__link:hover {
  gap: 0.65rem;
}

.audience__link:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

@media (min-width: 900px) {
  .audience ul {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

[data-theme='dark'] .audience li {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-surface-elevated) 90%, var(--color-brand-primary)), var(--color-surface-elevated));
  border-color: var(--color-border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .audience.is-visible li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .audience li:hover {
    transform: none;
  }

  .audience__link {
    transition: none;
  }
}
</style>
