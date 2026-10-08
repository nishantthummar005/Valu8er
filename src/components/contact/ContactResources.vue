<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { contactResources } from '@/data/contact'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tight>
    <AppContainer size="xl">
      <div ref="root" class="resources" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            Looking for something
            <span class="heading-accent">specific?</span>
          </h2>
        </header>

        <ul>
          <li
            v-for="(item, index) in contactResources"
            :key="item.title"
            :style="{ '--delay': `${index * 80}ms` }"
          >
            <RouterLink :to="item.to">
              <span class="resources__icon" aria-hidden="true">
                <AppIcon :name="item.icon" :size="20" />
              </span>
              <span>
                <strong>{{ item.title }}</strong>
                <em>{{ item.copy }}</em>
              </span>
              <AppIcon name="mdi-arrow-right" :size="18" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.resources {
  display: grid;
  gap: var(--space-6);
}

.resources header {
}

.resources ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.resources li {
  opacity: 0;
  transform: translateY(10px);
}

.resources.is-visible li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.resources a {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-3);
  align-items: center;
  min-height: 4.5rem;
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  color: var(--color-text);
  text-decoration: none;
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.resources a:hover {
  border-color: color-mix(in srgb, var(--color-brand-primary) 35%, var(--color-border));
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.resources a:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.resources__icon {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
}

.resources strong {
  display: block;
  font-size: 0.9375rem;
  font-weight: 650;
}

.resources em {
  display: block;
  margin-top: 0.2rem;
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
  font-style: normal;
  line-height: 1.45;
}

.resources a > :deep(.app-icon:last-child) {
  color: var(--color-brand-primary);
}

@media (min-width: 900px) {
  .resources ul {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

[data-theme='dark'] .resources a {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .resources.is-visible li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .resources a:hover {
    transform: none;
  }
}
</style>
