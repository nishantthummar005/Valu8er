<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { contactFaqs } from '@/data/contact'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
const openId = ref<number | null>(0)

function toggle(index: number) {
  openId.value = openId.value === index ? null : index
}
</script>

<template>
  <AppSection>
    <AppContainer>
      <div ref="root" class="faq" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            Common
            <span class="heading-accent">questions</span>
          </h2>
        </header>

        <div class="faq__list">
          <div v-for="(item, index) in contactFaqs" :key="item.question" class="faq__item">
            <h3>
              <button
                type="button"
                :id="`contact-faq-button-${index}`"
                :aria-expanded="openId === index"
                :aria-controls="`contact-faq-panel-${index}`"
                @click="toggle(index)"
              >
                <span>{{ item.question }}</span>
                <span class="faq__icon" aria-hidden="true">{{ openId === index ? '−' : '+' }}</span>
              </button>
            </h3>
            <div
              :id="`contact-faq-panel-${index}`"
              role="region"
              :aria-labelledby="`contact-faq-button-${index}`"
              :hidden="openId !== index"
            >
              <p class="text-body">{{ item.answer }}</p>
              <p v-if="item.link" class="faq__link">
                <RouterLink :to="item.link.to">{{ item.link.label }}</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.faq {
  display: grid;
  gap: var(--space-8);
}

.faq header {
  display: grid;
  gap: var(--space-3);
}

.faq__list {
  display: grid;
  border-top: 1px solid var(--color-border);
}

.faq__item {
  border-bottom: 1px solid var(--color-border);
}

.faq__item h3 {
  margin: 0;
}

.faq__item button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 3.5rem;
  padding: var(--space-4) 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 1rem;
  font-weight: 650;
  text-align: left;
  cursor: pointer;
}

.faq__item button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.faq__icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  color: var(--color-brand-primary);
  font-size: 1.1rem;
  line-height: 1;
}

.faq__item [role='region'] {
  padding-bottom: var(--space-4);
}

.faq__item p {
  max-width: 42rem;
  margin: 0;
}

.faq__link {
  margin-top: var(--space-3) !important;
}

.faq__link a {
  color: var(--color-brand-primary);
  font-weight: 650;
  text-decoration: none;
}

.faq__link a:hover {
  text-decoration: underline;
}

.faq__link a:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
</style>
