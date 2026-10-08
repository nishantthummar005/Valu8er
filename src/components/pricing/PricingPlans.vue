<script setup lang="ts">
import { computed, ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import {
  billingNote,
  formatPrice,
  priceFor,
  pricingPlans,
  type BillingCycle,
} from '@/data/pricingDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)
const cycle = ref<BillingCycle>('annual')

const note = computed(() => billingNote(cycle.value))

function renderHighlight(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<template>
  <AppSection tight tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="plans" :class="{ 'is-visible': visible }">
        <header>
          <h2 class="text-h1 text-balance">
            Simple, transparent
            <span class="heading-accent">pricing</span>
          </h2>
          <div class="plans__toggle" role="group" aria-label="Billing cycle">
            <button
              type="button"
              :aria-pressed="cycle === 'monthly'"
              :class="{ 'is-active': cycle === 'monthly' }"
              @click="cycle = 'monthly'"
            >
              Monthly
            </button>
            <button
              type="button"
              :aria-pressed="cycle === 'annual'"
              :class="{ 'is-active': cycle === 'annual' }"
              @click="cycle = 'annual'"
            >
              Annual
              <span>Save 15%</span>
            </button>
          </div>
        </header>

        <div class="plans__grid">
          <article
            v-for="plan in pricingPlans"
            :key="plan.id"
            class="plan"
            :class="{ 'is-popular': plan.popular }"
          >
            <div class="plan__head">
              <div class="plan__title">
                <h3 class="text-h3">{{ plan.name }}</h3>
                <AppBadge v-if="plan.popular" tone="brand">Most popular</AppBadge>
              </div>
              <p class="text-body-sm">{{ plan.description }}</p>
            </div>

            <div class="plan__price">
              <strong>{{ formatPrice(priceFor(plan, cycle)) }}</strong>
              <span>{{ note }}</span>
            </div>

            <p class="plan__includes">{{ plan.includesLabel }}</p>
            <ul>
              <li
                v-for="item in plan.highlights"
                :key="item"
                v-html="renderHighlight(item)"
              />
            </ul>

            <AppButton
              :variant="plan.popular ? 'primary' : 'outline'"
              block
              size="lg"
              :to="plan.ctaTo"
            >
              {{ plan.cta }}
            </AppButton>
          </article>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.plans {
  display: grid;
  gap: var(--space-8);
}

.plans header {
  display: grid;
  gap: var(--space-5);
  justify-items: center;
  text-align: center;
}

.plans__toggle {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface-muted);
}

.plans__toggle button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.75rem;
  padding: 0 var(--space-4);
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.plans__toggle button span {
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 14%, transparent);
  color: var(--color-brand-deep);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

[data-theme='dark'] .plans__toggle button span {
  color: var(--color-brand-highlight);
}

.plans__toggle button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.plans__toggle button.is-active span {
  background: color-mix(in srgb, var(--color-brand-highlight) 22%, transparent);
  color: var(--color-brand-highlight);
}

[data-theme='dark'] .plans__toggle button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
}

[data-theme='dark'] .plans__toggle button.is-active span {
  background: color-mix(in srgb, var(--color-brand-deep) 16%, transparent);
  color: var(--color-brand-deep);
}

.plans__toggle button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.plans__grid {
  display: grid;
  gap: var(--space-4);
}

.plan {
  display: grid;
  gap: var(--space-5);
  align-content: start;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
}

.plan.is-popular {
  border-color: color-mix(in srgb, var(--color-brand-primary) 42%, var(--color-border));
  box-shadow: var(--shadow-md);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface)), var(--color-surface));
}

.plan__head,
.plan__price {
  display: grid;
  gap: var(--space-2);
}

.plan__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.plan__price strong {
  font-size: clamp(2.25rem, 1.8rem + 1.4vw, 3rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-text);
}

.plan__price span,
.plan__includes {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
}

.plan__includes {
  font-weight: 650;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.plan ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.plan li {
  position: relative;
  padding-left: 1.2rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.plan li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.plan li :deep(strong) {
  color: var(--color-text);
  font-weight: 650;
}

@media (min-width: 900px) {
  .plans__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
  }

  .plan.is-popular {
    transform: translateY(-0.35rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .plan.is-popular {
    transform: none;
  }
}
</style>
