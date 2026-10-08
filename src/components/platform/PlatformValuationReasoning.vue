<script setup lang="ts">
import { ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { reasoningChain } from '@/data/platformDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="reasoning" :class="{ 'is-visible': visible }">
        <div class="reasoning__copy">
          <p class="section-kicker">Product depth</p>
          <h2 class="text-h1 text-balance">
            Go from a number to the
            <span class="heading-accent">story behind it.</span>
          </h2>
          <p class="text-body">
            A business valuation becomes more useful when the financial performance, valuation
            assumptions and key drivers are visible together.
          </p>
        </div>

        <ol class="chain" aria-label="Illustrative valuation reasoning panel">
          <li v-for="(item, index) in reasoningChain" :key="item.label">
            <div>
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
            <span v-if="index < reasoningChain.length - 1" class="chain__arrow" aria-hidden="true">↓</span>
          </li>
        </ol>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.reasoning {
  display: grid;
  gap: var(--space-8);
}

.reasoning__copy {
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

.chain {
  display: grid;
  gap: 0;
  margin: 0;
  padding: var(--space-5);
  list-style: none;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: var(--radius-2xl);
  background: #121a2b;
  color: #e2e8f0;
}

.chain li {
  display: grid;
  justify-items: stretch;
}

.chain li div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 0.9rem 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.chain li:last-child div {
  border-bottom: 0;
}

.chain span {
  color: #94a3b8;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chain strong {
  color: #f8fafc;
  font-size: 1.05rem;
  font-weight: 650;
}

.chain__arrow {
  display: none;
}

@media (min-width: 1024px) {
  .reasoning {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
    align-items: center;
    gap: var(--space-12);
  }
}

@media (min-width: 768px) {
  .chain li {
    justify-items: center;
  }

  .chain li div {
    width: 100%;
  }

  .chain__arrow {
    display: block;
    color: #5eead4;
    font-size: 0.9rem;
    letter-spacing: 0;
    text-transform: none;
  }

  .chain li:last-child .chain__arrow {
    display: none;
  }
}
</style>
