<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import {
  billingNote,
  formatPrice,
  priceFor,
  type BillingCycle,
  type Country,
  type PricingPlan,
} from '@/data/pricingDemo'
import {
  COUNTRIES,
  FALLBACK_PLANS,
  formatCreditCost,
  getPlansPricing,
} from '@/services/plans'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const country = ref<Country>('Canada')
const cycle = ref<BillingCycle>('annual')
const loading = ref(false)
const plans = ref<PricingPlan[]>(FALLBACK_PLANS)

const isCountryOpen = ref(false)
const countryDropdownRef = ref<HTMLElement | null>(null)

const currentCountryOption = computed(() => {
  return COUNTRIES.find((c) => c.code === country.value) || COUNTRIES[0]
})

async function loadPlans() {
  loading.value = true
  try {
    const dynamicPlans = await getPlansPricing(cycle.value, country.value)
    if (dynamicPlans && dynamicPlans.length > 0) {
      plans.value = dynamicPlans
    }
  } catch {
    // Keep fallback plans
  } finally {
    loading.value = false
  }
}

function handleCountrySelect(code: Country) {
  if (country.value === code) {
    isCountryOpen.value = false
    return
  }
  country.value = code
  isCountryOpen.value = false
  void loadPlans()
}

function handleCycleChange(newCycle: BillingCycle) {
  if (cycle.value === newCycle) return
  cycle.value = newCycle
  void loadPlans()
}

function handlePointerOutside(event: MouseEvent) {
  if (countryDropdownRef.value && !countryDropdownRef.value.contains(event.target as Node)) {
    isCountryOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isCountryOpen.value) {
    isCountryOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handlePointerOutside)
  document.addEventListener('keydown', handleKeydown)
  void loadPlans()
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handlePointerOutside)
  document.removeEventListener('keydown', handleKeydown)
})

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

          <div class="plans__toolbar">
            <!-- Country Dropdown -->
            <div ref="countryDropdownRef" class="country-select">
              <span class="country-select__label">Country:</span>
              <div class="country-dropdown">
                <button
                  type="button"
                  class="country-dropdown__trigger"
                  :class="{ 'is-open': isCountryOpen }"
                  :aria-expanded="isCountryOpen"
                  aria-label="Select Country"
                  @click="isCountryOpen = !isCountryOpen"
                >
                  <span class="country-dropdown__flag">{{ currentCountryOption.flag }}</span>
                  <span class="country-dropdown__name">{{ currentCountryOption.name }}</span>
                  <span class="country-dropdown__badge">{{ currentCountryOption.currency }}</span>
                  <v-icon
                    icon="mdi-chevron-down"
                    size="16"
                    class="country-dropdown__chevron"
                    :class="{ 'is-rotated': isCountryOpen }"
                  />
                </button>

                <transition name="dropdown-pop">
                  <div v-if="isCountryOpen" class="country-dropdown__menu" role="listbox">
                    <button
                      v-for="opt in COUNTRIES"
                      :key="opt.code"
                      type="button"
                      class="country-dropdown__item"
                      :class="{ 'is-active': country === opt.code }"
                      @click="handleCountrySelect(opt.code)"
                    >
                      <span class="country-dropdown__flag">{{ opt.flag }}</span>
                      <span class="country-dropdown__name">{{ opt.name }}</span>
                      <span class="country-dropdown__badge">{{ opt.currency }}</span>
                      <v-icon
                        v-if="country === opt.code"
                        icon="mdi-check"
                        size="15"
                        class="country-dropdown__check"
                      />
                    </button>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Billing Cycle Tabs -->
            <div class="plans__toggle" role="group" aria-label="Billing cycle">
              <button
                type="button"
                :aria-pressed="cycle === 'monthly'"
                :class="{ 'is-active': cycle === 'monthly' }"
                @click="handleCycleChange('monthly')"
              >
                Monthly
              </button>
              <button
                type="button"
                :aria-pressed="cycle === 'quarterly'"
                :class="{ 'is-active': cycle === 'quarterly' }"
                @click="handleCycleChange('quarterly')"
              >
                Quarterly
              </button>
              <button
                type="button"
                :aria-pressed="cycle === 'annual'"
                :class="{ 'is-active': cycle === 'annual' }"
                @click="handleCycleChange('annual')"
              >
                Annual
                <span>Save 10%</span>
              </button>
            </div>
          </div>
        </header>

        <div v-if="loading" class="plans__loading">
          <AppLoader text="Updating pricing plans..." />
        </div>

        <div v-else class="plans__grid">
          <article
            v-for="plan in plans"
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
              <div class="plan__price-wrap">
                <strong>{{ formatPrice(priceFor(plan, cycle)) }}</strong>
                <span v-if="!plan.isCustom && plan.monthly > 0" class="plan__currency-tag">
                  {{ plan.currency || currentCountryOption.currency }}
                </span>
              </div>
              <span>{{ billingNote(cycle, plan) }}</span>
            </div>

            <div v-if="plan.credits !== undefined" class="plan__credits-tag">
              <v-icon icon="mdi-database-check-outline" size="14" />
              <span v-if="plan.isCustom || plan.name.toLowerCase().includes('enterprise')">
                {{ plan.credits }}+ credits & volume rates
              </span>
              <span v-else-if="plan.credits === 0">
                {{ plan.credits_bonus }} bonus credits included
              </span>
              <span v-else>
                {{ plan.credits }} credits + {{ plan.credits_bonus }} bonus (${{ formatCreditCost(plan.cost_per_credits || 0) }}/ea)
              </span>
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

.plans__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
}

.country-select {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.country-select__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.country-dropdown {
  position: relative;
}

.country-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.country-dropdown__trigger:hover,
.country-dropdown__trigger.is-open {
  border-color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 6%, var(--color-surface));
}

.country-dropdown__flag {
  font-size: 1.15rem;
  line-height: 1;
}

.country-dropdown__name {
  font-size: 0.875rem;
  font-weight: 600;
}

.country-dropdown__badge {
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-brand-primary) 14%, transparent);
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.country-dropdown__chevron {
  color: var(--color-text-muted);
  transition: transform 0.2s ease;
}

.country-dropdown__chevron.is-rotated {
  transform: rotate(180deg);
}

.country-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 40;
  min-width: 175px;
  padding: 0.35rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  backdrop-filter: blur(16px);
}

.country-dropdown__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 550;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}

.country-dropdown__item:hover {
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  color: var(--color-brand-primary);
}

.country-dropdown__item.is-active {
  background: color-mix(in srgb, var(--color-brand-primary) 16%, transparent);
  color: var(--color-brand-primary);
  font-weight: 700;
}

.country-dropdown__check {
  margin-left: auto;
  color: var(--color-brand-primary);
}

.plans__toggle {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  box-shadow: var(--shadow-xs);
}

.plans__toggle button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.25rem;
  padding: 0 var(--space-4);
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.plans__toggle button span {
  display: inline-block;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 16%, transparent);
  color: var(--color-brand-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.plans__toggle button:hover {
  color: var(--color-text);
}

.plans__toggle button.is-active {
  background: var(--color-brand-primary);
  color: #0b1517;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.plans__toggle button.is-active span {
  background: rgba(11, 21, 23, 0.18);
  color: #0b1517;
}

[data-theme='dark'] .plans__toggle button.is-active {
  background: var(--color-brand-primary);
  color: #051315;
}

[data-theme='dark'] .plans__toggle button.is-active span {
  background: rgba(5, 19, 21, 0.2);
  color: #051315;
}

.plans__toggle button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.plans__loading {
  padding: var(--space-12) 0;
  text-align: center;
}

.plans__grid {
  display: grid;
  gap: var(--space-6);
}

.plan {
  display: grid;
  gap: var(--space-5);
  align-content: start;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: var(--color-surface);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
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

.plan__title h3 {
  font-size: 1.3rem;
  font-weight: 700;
}

.plan__price-wrap {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}

.plan__price strong {
  font-size: clamp(2.25rem, 1.8rem + 1.4vw, 3rem);
  letter-spacing: -0.04em;
  line-height: 1;
  color: var(--color-text);
}

.plan__currency-tag {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

.plan__price span,
.plan__includes {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  line-height: 1.4;
}

.plan__credits-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 24%, transparent);
  color: var(--color-brand-primary);
  font-size: 0.775rem;
  font-weight: 650;
  letter-spacing: -0.01em;
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

/* Tablet (2 columns) */
@media (min-width: 640px) and (max-width: 959px) {
  .plans__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .plans__grid > .plan:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    max-width: 480px;
    width: 100%;
    margin-inline: auto;
  }
}

/* Desktop: 3 Column Layout */
@media (min-width: 960px) {
  .plans__grid {
    grid-template-columns: repeat(6, 1fr);
    align-items: stretch;
  }

  .plans__grid > .plan {
    grid-column: span 2;
  }

  /* When there are 5 plans, center the last two plans on row 2 */
  .plans__grid > .plan:nth-child(4):nth-last-child(2) {
    grid-column: 2 / span 2;
  }

  .plans__grid > .plan:nth-child(5):last-child {
    grid-column: 4 / span 2;
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
