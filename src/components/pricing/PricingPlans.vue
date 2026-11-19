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
  getUsdExchangeRate,
} from '@/services/plans'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const country = ref<Country>('Canada')
const cycle = ref<BillingCycle>('quarterly')
const loading = ref(false)
const plans = ref<PricingPlan[]>(FALLBACK_PLANS)

const enterpriseCredits = ref<number>(501)
const enterpriseCreditsInput = ref<number | string>(501)

const currentCountryOption = computed(() => {
  return COUNTRIES.find((c) => c.code === country.value) || COUNTRIES[0]
})

function isEnterprisePlan(plan: PricingPlan): boolean {
  return plan.id === 5 || plan.name.toLowerCase().includes('enterprise')
}

// Compute/apply dynamic enterprise calculations instantly to prevent UI latency
function updateEnterprisePlanLocally() {
  const planIndex = plans.value.findIndex((p) => isEnterprisePlan(p))
  if (planIndex === -1) return
  const currentPlan = plans.value[planIndex]
  const rate = country.value === 'USA' ? getUsdExchangeRate() : 1.0
  const costPerCredit = +(15 * rate).toFixed(2)
  const baseMonthly = enterpriseCredits.value * costPerCredit
  const quarterlyMonthly = Math.round(baseMonthly)
  const quarterlyTotal = Math.round(baseMonthly * 3)
  const annualMonthly = Math.round(baseMonthly * 0.9)
  const annualTotal = Math.round(baseMonthly * 12 * 0.9)
  const costFormatted = formatCreditCost(costPerCredit)

  plans.value[planIndex] = {
    ...currentPlan,
    credits: enterpriseCredits.value,
    price: baseMonthly,
    monthly: quarterlyMonthly,
    quarterly: quarterlyMonthly,
    annual: annualMonthly,
    quarterlyBilledTotal: quarterlyTotal,
    annualBilledTotal: annualTotal,
    cost_per_credits: costPerCredit,
    highlights: [
      `**${enterpriseCredits.value.toLocaleString()} credits** + **1,000 bonus credits**`,
      `**$${costFormatted}** volume credit rate`,
      '**Role-based permissions** & audit-friendly logs',
      'SSO-ready enterprise security',
      'Dedicated success manager',
      '**4-hour support SLA**',
    ],
    ctaTo: `/contact?plan=enterprise&credits=${enterpriseCredits.value}`,
  }
}

let loadTimer: ReturnType<typeof setTimeout> | null = null

async function loadPlans(showLoader = true) {
  if (showLoader) loading.value = true
  try {
    const dynamicPlans = await getPlansPricing(cycle.value, country.value, enterpriseCredits.value)
    if (dynamicPlans && dynamicPlans.length > 0) {
      plans.value = dynamicPlans
    }
  } catch {
    // Keep fallback plans
  } finally {
    if (showLoader) loading.value = false
  }
}

function handleCountrySelect(code: Country) {
  if (country.value === code) return
  country.value = code
  updateEnterprisePlanLocally()
  void loadPlans(true)
}

function handleCycleChange(newCycle: BillingCycle) {
  if (cycle.value === newCycle) return
  cycle.value = newCycle
  void loadPlans(true)
}

function setEnterpriseCredits(val: number) {
  const cleanVal = Math.max(501, Math.round(val))
  enterpriseCredits.value = cleanVal
  enterpriseCreditsInput.value = cleanVal
  updateEnterprisePlanLocally()
  debounceRemoteUpdate()
}

function adjustEnterpriseCredits(delta: number) {
  setEnterpriseCredits(enterpriseCredits.value + delta)
}

function onEnterpriseInput() {
  const num = Number(enterpriseCreditsInput.value)
  if (!isNaN(num) && num >= 501) {
    enterpriseCredits.value = Math.round(num)
    updateEnterprisePlanLocally()
    debounceRemoteUpdate()
  }
}

function validateEnterpriseCredits() {
  const num = Number(enterpriseCreditsInput.value)
  const valid = isNaN(num) || num < 501 ? 501 : Math.round(num)
  enterpriseCredits.value = valid
  enterpriseCreditsInput.value = valid
  updateEnterprisePlanLocally()
  debounceRemoteUpdate()
}

function debounceRemoteUpdate() {
  if (loadTimer) clearTimeout(loadTimer)
  loadTimer = setTimeout(() => {
    void loadPlans(false)
  }, 400)
}

onMounted(() => {
  void loadPlans()
})

onUnmounted(() => {
  if (loadTimer) clearTimeout(loadTimer)
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
            <!-- Country Toggle with Sliding Animation -->
            <div class="country-slider-wrap">
              <span class="country-slider-label">Country:</span>
              <div
                class="country-slider"
                role="radiogroup"
                aria-label="Country selection"
              >
                <!-- Animated background glider -->
                <div
                  class="country-slider__glider"
                  :class="{ 'is-usa': country === 'USA' }"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  role="radio"
                  :aria-checked="country === 'Canada'"
                  class="country-slider__btn"
                  :class="{ 'is-active': country === 'Canada' }"
                  aria-label="Canada (CAD)"
                  title="Canada (CAD)"
                  @click="handleCountrySelect('Canada')"
                >
                  <span class="country-slider__flag">🇨🇦</span>
                </button>

                <button
                  type="button"
                  role="radio"
                  :aria-checked="country === 'USA'"
                  class="country-slider__btn"
                  :class="{ 'is-active': country === 'USA' }"
                  aria-label="USA (USD)"
                  title="USA (USD)"
                  @click="handleCountrySelect('USA')"
                >
                  <span class="country-slider__flag">🇺🇸</span>
                </button>
              </div>
            </div>

            <!-- Billing Cycle Tabs (Quarterly & Annual only, monthly hidden) -->
            <div class="plans__toggle" role="group" aria-label="Billing cycle">
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
            :class="{
              'is-popular': plan.popular,
              'is-enterprise': isEnterprisePlan(plan),
            }"
          >
            <div class="plan__head">
              <div class="plan__title">
                <h3 class="text-h3">{{ plan.name }}</h3>
                <AppBadge v-if="plan.popular" tone="brand">Most popular</AppBadge>
                <AppBadge v-else-if="isEnterprisePlan(plan)" tone="neutral">Custom Volume</AppBadge>
              </div>
              <p class="text-body-sm">{{ plan.description }}</p>
            </div>

            <!-- Enterprise Credit Input / Calculator -->
            <div v-if="isEnterprisePlan(plan)" class="enterprise-calc">
              <div class="enterprise-calc__header">
                <span class="enterprise-calc__title">
                  <v-icon icon="mdi-database-edit-outline" size="15" />
                  <span>Number of Credits</span>
                </span>
                <span class="enterprise-calc__min-tag">Min. 501</span>
              </div>

              <div class="enterprise-calc__control">
                <button
                  type="button"
                  class="enterprise-calc__step"
                  :disabled="enterpriseCredits <= 501"
                  aria-label="Decrease credits"
                  @click="adjustEnterpriseCredits(-10)"
                >
                  <v-icon icon="mdi-minus" size="14" />
                </button>

                <div class="enterprise-calc__field">
                  <input
                    id="enterprise-credits-input"
                    v-model="enterpriseCreditsInput"
                    type="number"
                    min="501"
                    step="1"
                    class="enterprise-calc__input"
                    aria-label="Number of credits"
                    placeholder="501"
                    @input="onEnterpriseInput"
                    @blur="validateEnterpriseCredits"
                    @keydown.enter="validateEnterpriseCredits"
                  />
                  <span class="enterprise-calc__unit">credits</span>
                </div>

                <button
                  type="button"
                  class="enterprise-calc__step"
                  aria-label="Increase credits"
                  @click="adjustEnterpriseCredits(10)"
                >
                  <v-icon icon="mdi-plus" size="14" />
                </button>
              </div>

              <div class="enterprise-calc__presets">
                <button
                  v-for="amt in [501, 750, 1000, 2500]"
                  :key="amt"
                  type="button"
                  class="enterprise-calc__chip"
                  :class="{ 'is-active': enterpriseCredits === amt }"
                  @click="setEnterpriseCredits(amt)"
                >
                  {{ amt.toLocaleString() }}
                </button>
              </div>
            </div>

            <div class="plan__price">
              <div class="plan__price-wrap">
                <strong>{{ formatPrice(priceFor(plan, cycle)) }}</strong>
                <span v-if="plan.monthly > 0" class="plan__currency-tag">
                  {{ plan.currency || currentCountryOption.currency }}
                </span>
              </div>
              <span>{{ billingNote(cycle, plan) }}</span>
            </div>

            <div v-if="plan.credits !== undefined" class="plan__credits-tag">
              <v-icon icon="mdi-database-check-outline" size="14" />
              <span v-if="isEnterprisePlan(plan)">
                {{ enterpriseCredits.toLocaleString() }} credits + {{ plan.credits_bonus }} bonus (${{ formatCreditCost(plan.cost_per_credits || 0) }}/ea)
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

/* Country Slider with Animated Glider */
.country-slider-wrap {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.country-slider-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.country-slider {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 3px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  box-shadow: var(--shadow-xs);
  user-select: none;
}

.country-slider__glider {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--color-brand-primary) 16%, var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 45%, transparent);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2), inset 0 0 10px color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 1;
}

.country-slider__glider.is-usa {
  transform: translateX(100%);
}

.country-slider__btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.25rem;
  min-width: 2.6rem;
  padding: 0 0.75rem;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.country-slider__flag {
  font-size: 1.35rem;
  line-height: 1;
  display: inline-block;
  opacity: 0.5;
  filter: grayscale(25%);
  transition: transform 0.22s ease, opacity 0.22s ease, filter 0.22s ease;
}

.country-slider__btn:hover .country-slider__flag {
  opacity: 0.85;
  filter: grayscale(0%);
  transform: scale(1.1);
}

.country-slider__btn.is-active .country-slider__flag {
  opacity: 1;
  filter: grayscale(0%);
  transform: scale(1.18);
}

/* Billing Cycle Toggle */
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

.plan.is-enterprise {
  border-color: color-mix(in srgb, var(--color-brand-primary) 28%, var(--color-border));
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

/* Enterprise Custom Credits Calculator */
.enterprise-calc {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.75rem;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-brand-primary) 6%, var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 22%, var(--color-border));
}

.enterprise-calc__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.enterprise-calc__title {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.775rem;
  font-weight: 650;
  color: var(--color-text);
  letter-spacing: 0.01em;
}

.enterprise-calc__min-tag {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full);
}

.enterprise-calc__control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.enterprise-calc__step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.15s ease;
}

.enterprise-calc__step:hover:not(:disabled) {
  border-color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, var(--color-surface));
  color: var(--color-brand-primary);
}

.enterprise-calc__step:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.enterprise-calc__field {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
}

.enterprise-calc__input {
  width: 100%;
  height: 2rem;
  padding: 0 3.2rem 0 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  -moz-appearance: textfield;
}

.enterprise-calc__input::-webkit-outer-spin-button,
.enterprise-calc__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.enterprise-calc__input:focus {
  outline: none;
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-brand-primary) 25%, transparent);
}

.enterprise-calc__unit {
  position: absolute;
  right: 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  pointer-events: none;
}

.enterprise-calc__presets {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.enterprise-calc__chip {
  padding: 0.18rem 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.enterprise-calc__chip:hover {
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-brand-primary) 40%, var(--color-border));
}

.enterprise-calc__chip.is-active {
  border-color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 16%, transparent);
  color: var(--color-brand-primary);
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

  .country-slider__glider {
    transition: none;
  }
}
</style>
