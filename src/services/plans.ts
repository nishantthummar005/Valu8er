import axios from 'axios'
import type { BillingCycle, Country, CurrencyCode, PricingPlan } from '@/data/pricingDemo'

/**
 * Global USD Exchange Rate
 * In https://valu8er.instaging.net/api/v1/plans API response, by default price is in CAD and monthly base.
 * Global variable for USD exchange rate - default set 0.70 (1 CAD = 0.70 USD)
 */
export const DEFAULT_USD_EXCHANGE_RATE = 0.70

if (typeof window !== 'undefined') {
  if (window.VALU8ER_USD_EXCHANGE_RATE === undefined) {
    window.VALU8ER_USD_EXCHANGE_RATE = DEFAULT_USD_EXCHANGE_RATE
  }
}

export function getUsdExchangeRate(): number {
  if (typeof window !== 'undefined' && typeof window.VALU8ER_USD_EXCHANGE_RATE === 'number') {
    return window.VALU8ER_USD_EXCHANGE_RATE
  }
  return DEFAULT_USD_EXCHANGE_RATE
}

export function setUsdExchangeRate(rate: number): void {
  if (typeof window !== 'undefined') {
    window.VALU8ER_USD_EXCHANGE_RATE = rate
  }
}

export interface CountryOption {
  code: Country
  name: string
  currency: CurrencyCode
  flag: string
  symbol: string
}

export const COUNTRIES: CountryOption[] = [
  { code: 'Canada', name: 'Canada', currency: 'CAD', flag: '🇨🇦', symbol: '$' },
  { code: 'USA', name: 'USA', currency: 'USD', flag: '🇺🇸', symbol: '$' },
]

export interface ApiPlan {
  id: number
  name: string
  description: string | null
  price: string
  active: number
  created_at?: string
  updated_at?: string
  stripe_product_id?: string
  monthly_price_id?: string
  quarterly_price_id?: string
  annually_price_id?: string
  credits: number
  credits_bonus: number
  cost_per_credits: number
  free_calls_limit: number
}

export interface ApiPlansResponse {
  status: string
  data: ApiPlan[]
}

export interface ApiPlansPricingTooltipTiers {
  monthly: string
  quarterly: string
  anually_credits: number
  credits_bonus: number
  cost_per_credits: string
}

export interface ApiPlansPricingItem {
  plan_id: number
  plan_name: string
  billing_cycle: string
  currency: CurrencyCode
  base_monthly_price: string
  total_billed_amount: string
  tooltip_tiers: ApiPlansPricingTooltipTiers
}

export interface ApiPlansPricingResponse {
  success: boolean
  data: ApiPlansPricingItem[]
}

/**
 * Static fallback descriptions used when the API description is null, empty, or undefined.
 */
export const STATIC_DESCRIPTIONS: Record<string, string> = {
  'beginner(free)': 'For owners and small teams starting with a clear valuation workspace.',
  beginner: 'For owners and small teams starting with a clear valuation workspace.',
  essentials: 'For owners and small teams starting with a clear valuation workspace.',
  small: 'For advisors and small practices running valuation work regularly.',
  medium: 'For valuation practices and corporate teams requiring advanced modeling capacity.',
  professional: 'For advisors and growing teams running valuation work regularly.',
  large: 'For advisory firms and enterprises with high-volume valuation requirements.',
  enterprise: 'For finance teams that need controls, deeper support, and firm-wide rollout.',
}

export function getPlanDescription(
  name: string,
  apiDescription: string | null | undefined,
): string {
  if (apiDescription && apiDescription.trim()) {
    return apiDescription.trim()
  }

  const normalized = name.toLowerCase().replace(/\s+/g, '')

  for (const [key, desc] of Object.entries(STATIC_DESCRIPTIONS)) {
    if (normalized.includes(key)) {
      return desc
    }
  }

  if (normalized.includes('free') || normalized.includes('begin')) {
    return STATIC_DESCRIPTIONS.beginner
  }
  if (normalized.includes('enterp')) {
    return STATIC_DESCRIPTIONS.enterprise
  }

  return 'For advisors and growing teams running valuation work regularly.'
}

export function formatCreditCost(val: number): string {
  return Number.isInteger(val) ? val.toString() : val.toFixed(2)
}

/**
 * Default fallback plans based on verified API numbers (CAD base rates)
 */
export const FALLBACK_PLANS: PricingPlan[] = [
  {
    id: 1,
    name: 'Beginner (Free)',
    description: STATIC_DESCRIPTIONS.beginner,
    monthly: 0,
    quarterly: 0,
    annual: 0,
    price: 0,
    currency: 'CAD',
    credits: 0,
    credits_bonus: 20,
    cost_per_credits: 30,
    cta: 'Start Free Trial',
    ctaTo: '/get-started',
    includesLabel: 'Included with free plan',
    highlights: [
      '**20 bonus credits** included',
      'Up to **3 active valuation files**',
      '**Estimated value, range & confidence**',
      'Financial trends and margin views',
      'Structured report summary preview',
      'Email support',
    ],
  },
  {
    id: 2,
    name: 'Small',
    description: STATIC_DESCRIPTIONS.small,
    monthly: 720,
    quarterly: 720,
    annual: 648,
    price: 720,
    currency: 'CAD',
    quarterlyBilledTotal: 2160,
    annualBilledTotal: 7776,
    credits: 30,
    credits_bonus: 100,
    cost_per_credits: 24,
    cta: 'Get Started',
    ctaTo: '/get-started',
    includesLabel: 'Everything in Beginner, plus',
    highlights: [
      '**30 credits** + **100 bonus credits**',
      '**$24** per additional credit',
      'Up to **10 active valuation files**',
      'Multi-user collaboration',
      'Value driver panels & historical trends',
      'Standard support',
    ],
  },
  {
    id: 3,
    name: 'Medium',
    description: STATIC_DESCRIPTIONS.medium,
    popular: true,
    monthly: 1890,
    quarterly: 1890,
    annual: 1701,
    price: 1890,
    currency: 'CAD',
    quarterlyBilledTotal: 5670,
    annualBilledTotal: 20412,
    credits: 90,
    credits_bonus: 200,
    cost_per_credits: 21,
    cta: 'Start Free Trial',
    ctaTo: '/get-started',
    includesLabel: 'Everything in Small, plus',
    highlights: [
      '**90 credits** + **200 bonus credits**',
      '**$21** per additional credit',
      '**Unlimited** valuation files',
      'Multi-user collaboration & shared notes',
      '**Priority support**',
      'Personalized onboarding walkthrough',
    ],
  },
  {
    id: 4,
    name: 'Large',
    description: STATIC_DESCRIPTIONS.large,
    monthly: 3600,
    quarterly: 3600,
    annual: 3240,
    price: 3600,
    currency: 'CAD',
    quarterlyBilledTotal: 10800,
    annualBilledTotal: 38880,
    credits: 200,
    credits_bonus: 300,
    cost_per_credits: 18,
    cta: 'Get Started',
    ctaTo: '/get-started',
    includesLabel: 'Everything in Medium, plus',
    highlights: [
      '**200 credits** + **300 bonus credits**',
      '**$18** per additional credit',
      'Advanced valuation modeling',
      'Value drivers & benchmark comparisons',
      '**Priority support SLA**',
      'Custom onboarding & review session',
    ],
  },
  {
    id: 5,
    name: 'Enterprise',
    description: STATIC_DESCRIPTIONS.enterprise,
    monthly: 0,
    quarterly: 0,
    annual: 0,
    price: 0,
    currency: 'CAD',
    isCustom: true,
    credits: 500,
    credits_bonus: 1000,
    cost_per_credits: 15,
    cta: 'Talk to Us',
    ctaTo: '/contact',
    includesLabel: 'Everything in Large, plus',
    highlights: [
      '**500+ credits** + **1,000 bonus credits**',
      '**$15** volume credit rate',
      '**Role-based permissions** & audit-friendly logs',
      'SSO-ready enterprise security',
      'Dedicated success manager',
      '**4-hour support SLA**',
    ],
  },
]

/**
 * Transforms an item from POST /api/v1/plans-pricing into our UI PricingPlan structure
 */
export function transformPlansPricingItem(
  item: ApiPlansPricingItem,
  country: Country = 'Canada',
): PricingPlan {
  const normalizedName = item.plan_name.toLowerCase()
  const isEnterprise = normalizedName.includes('enterprise')
  const isFree = normalizedName.includes('free') || normalizedName.includes('beginner')

  const baseMonthly = parseFloat(item.base_monthly_price) || 0
  const totalBilled = parseFloat(item.total_billed_amount) || 0
  const costPerCredit = parseFloat(item.tooltip_tiers?.cost_per_credits) || 0
  const bonusCredits = item.tooltip_tiers?.credits_bonus || 0

  let monthlyCredits = 0
  if (normalizedName.includes('small')) monthlyCredits = 30
  else if (normalizedName.includes('medium')) monthlyCredits = 90
  else if (normalizedName.includes('large')) monthlyCredits = 200
  else if (isEnterprise) monthlyCredits = 500

  // Monthly rate
  const monthlyRate = isFree || isEnterprise ? 0 : Math.round(baseMonthly)

  // Quarterly rate: same base monthly price, billed quarterly
  const quarterlyMonthlyRate = isFree || isEnterprise ? 0 : Math.round(baseMonthly)
  const quarterlyBilledTotal = isFree || isEnterprise ? 0 : baseMonthly * 3

  // Annual rate: total_billed_amount divided by 12 (with 10% annual savings)
  const annualMonthlyRate = isFree || isEnterprise ? 0 : Math.round(totalBilled / 12)
  const annualBilledTotal = isFree || isEnterprise ? 0 : totalBilled

  let highlights: string[] = []
  let includesLabel = 'Included with your plan'
  const costFormatted = formatCreditCost(costPerCredit)

  if (isFree) {
    includesLabel = 'Included with free plan'
    highlights = [
      `**${bonusCredits || 20} bonus credits** included`,
      'Up to **3 active valuation files**',
      '**Estimated value, range & confidence**',
      'Financial trends and margin views',
      'Structured report summary preview',
      'Email support',
    ]
  } else if (normalizedName.includes('small')) {
    includesLabel = 'Everything in Beginner, plus'
    highlights = [
      `**30 credits** + **${bonusCredits} bonus credits**`,
      `**$${costFormatted}** per additional credit`,
      'Up to **10 active valuation files**',
      'Multi-user collaboration',
      'Value driver panels & historical trends',
      'Standard support',
    ]
  } else if (normalizedName.includes('medium')) {
    includesLabel = 'Everything in Small, plus'
    highlights = [
      `**90 credits** + **${bonusCredits} bonus credits**`,
      `**$${costFormatted}** per additional credit`,
      '**Unlimited** valuation files',
      'Multi-user collaboration & shared notes',
      '**Priority support**',
      'Personalized onboarding walkthrough',
    ]
  } else if (normalizedName.includes('large')) {
    includesLabel = 'Everything in Medium, plus'
    highlights = [
      `**200 credits** + **${bonusCredits} bonus credits**`,
      `**$${costFormatted}** per additional credit`,
      'Advanced valuation modeling',
      'Value drivers & benchmark comparisons',
      '**Priority support SLA**',
      'Custom onboarding & review session',
    ]
  } else if (isEnterprise) {
    includesLabel = 'Everything in Large, plus'
    highlights = [
      `**500+ credits** + **${bonusCredits} bonus credits**`,
      `**$${costFormatted}** volume credit rate`,
      '**Role-based permissions** & audit-friendly logs',
      'SSO-ready enterprise security',
      'Dedicated success manager',
      '**4-hour support SLA**',
    ]
  }

  const isPopular = normalizedName.includes('medium')

  // Clean formatted name
  let displayName = item.plan_name
  if (displayName === 'Beginner(Free)') displayName = 'Beginner (Free)'

  return {
    id: item.plan_id,
    name: displayName,
    description: getPlanDescription(item.plan_name, null),
    popular: isPopular,
    monthly: monthlyRate,
    quarterly: quarterlyMonthlyRate,
    annual: annualMonthlyRate,
    price: baseMonthly,
    currency: item.currency || (country === 'USA' ? 'USD' : 'CAD'),
    quarterlyBilledTotal,
    annualBilledTotal,
    isCustom: isEnterprise,
    credits: monthlyCredits,
    credits_bonus: bonusCredits,
    cost_per_credits: costPerCredit,
    cta: isEnterprise ? 'Talk to Us' : isFree ? 'Start Free Trial' : 'Get Started',
    ctaTo: isEnterprise ? '/contact' : '/get-started',
    includesLabel,
    highlights,
  }
}

/**
 * Fetch country and billing-cycle specific pricing from POST /api/v1/plans-pricing
 */
export async function getPlansPricing(
  billingCycle: BillingCycle = 'annual',
  country: Country = 'Canada',
): Promise<PricingPlan[]> {
  const endpoints = [
    'https://valu8er.instaging.net/api/v1/plans-pricing',
    '/api/v1/plans-pricing',
  ]

  for (const url of endpoints) {
    try {
      const response = await axios.post<ApiPlansPricingResponse>(
        url,
        {
          billing_cycle: billingCycle,
          country,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 8000,
        },
      )

      if (response.data?.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data.map((item) => transformPlansPricingItem(item, country))
      }
    } catch {
      // Try next endpoint or fall back
    }
  }

  // Fallback with exchange rate calculation if API fails
  const rate = country === 'USA' ? getUsdExchangeRate() : 1.0
  const currency: CurrencyCode = country === 'USA' ? 'USD' : 'CAD'

  return FALLBACK_PLANS.map((plan) => {
    if (plan.isCustom || plan.monthly === 0) {
      return { ...plan, currency }
    }

    const monthly = Math.round(plan.monthly * rate)
    const quarterly = Math.round((plan.quarterly ?? plan.monthly) * rate)
    const annual = Math.round(plan.annual * rate)
    const quarterlyTotal = plan.quarterlyBilledTotal ? Math.round(plan.quarterlyBilledTotal * rate) : monthly * 3
    const annualTotal = plan.annualBilledTotal ? Math.round(plan.annualBilledTotal * rate) : annual * 12
    const costPerCredit = plan.cost_per_credits ? +(plan.cost_per_credits * rate).toFixed(2) : undefined

    return {
      ...plan,
      currency,
      monthly,
      quarterly,
      annual,
      quarterlyBilledTotal: quarterlyTotal,
      annualBilledTotal: annualTotal,
      cost_per_credits: costPerCredit,
    }
  })
}

/**
 * Backward compatibility: get base pricing plans
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  return getPlansPricing('annual', 'Canada')
}
