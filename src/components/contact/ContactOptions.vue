<script setup lang="ts">
import { ref } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { contactOptions } from '@/data/contact'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection>
    <AppContainer size="xl">
      <div ref="root" class="options" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            How can we
            <span class="heading-accent">help?</span>
          </h2>
        </header>

        <ul class="options__grid">
          <li
            v-for="(item, index) in contactOptions"
            :key="item.id"
            :style="{ '--delay': `${index * 90}ms` }"
          >
            <article>
              <span class="options__icon" aria-hidden="true">
                <AppIcon :name="item.icon" :size="22" />
              </span>
              <h3 class="text-h3">{{ item.title }}</h3>
              <p class="text-body-sm">{{ item.copy }}</p>
              <a
                v-if="item.external"
                class="options__mail"
                :href="item.to"
              >
                <AppIcon name="mdi-email-outline" :size="16" />
                <span>{{ item.cta }}</span>
              </a>
              <AppButton v-else variant="outline" :to="item.to">{{ item.cta }}</AppButton>
            </article>
          </li>
        </ul>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.options {
  display: grid;
  gap: var(--space-8);
}

.options header {
}

.options__grid {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.options__grid li {
  opacity: 0;
  transform: translateY(12px);
}

.options.is-visible .options__grid li {
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: var(--delay);
}

.options__grid article {
  display: grid;
  gap: var(--space-3);
  align-content: start;
  min-height: 100%;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.options__grid article:hover {
  border-color: color-mix(in srgb, var(--color-brand-primary) 35%, var(--color-border));
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.options__icon {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
}

.options__grid h3 {
  margin: 0;
}

.options__grid p {
  margin: 0;
  color: var(--color-text-secondary);
}

.options__mail {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.75rem;
  margin-top: 0.25rem;
  color: var(--color-brand-primary);
  font-size: 0.875rem;
  font-weight: 650;
  text-decoration: none;
}

.options__mail:hover {
  text-decoration: underline;
}

.options__mail:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

@media (min-width: 768px) {
  .options__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

[data-theme='dark'] .options__grid article {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

@media (prefers-reduced-motion: reduce) {
  .options.is-visible .options__grid li {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .options__grid article:hover {
    transform: none;
  }
}
</style>
