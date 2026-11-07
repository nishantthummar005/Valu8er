import type { PricingPlan } from '@/data/pricingDemo'

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

/**
 * Static fallback descriptions used when the API description is null, empty, or undefined.
 * Preserves existing brand messaging across plan tiers.
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

/**
 * Returns the plan description: if the API description is null or empty,
 * falls back to the static description.
 */
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

/**
 * Static fallback plans based on verified API schema and business rules
 */
export const FALLBACK_PLANS: PricingPlan[] = [
  {
    id: 1,
    name: 'Beginner (Free)',
    description: STATIC_DESCRIPTIONS.beginner,
    monthly: 0,
    annual: 0,
    price: 0,
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
    monthly: 71,
    annual: 60,
    price: 720,
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
    monthly: 185,
    annual: 158,
    price: 1890,
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
      'Multi-user collaboration & notes',
      '**Priority support**',
      'Personalized onboarding walkthrough',
    ],
  },
  {
    id: 4,
    name: 'Large',
    description: STATIC_DESCRIPTIONS.large,
    monthly: 353,
    annual: 300,
    price: 3600,
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
    annual: 0,
    price: 0,
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
      '**Role-based permissions** & audit logs',
      'SSO-ready enterprise security',
      'Dedicated success manager',
      '**4-hour support SLA**',
    ],
  },
]

/**
 * Transforms an API plan item into our UI PricingPlan structure
 */
export function transformApiPlan(plan: ApiPlan): PricingPlan {
  const rawPrice = parseFloat(plan.price) || 0
  const normalizedName = plan.name.toLowerCase()
  const isEnterprise = normalizedName.includes('enterprise')
  const isFree = normalizedName.includes('free') || (rawPrice === 0 && !isEnterprise)

  // Annual calculation: base price / 12 months
  const annualMonthlyEquivalent = isFree || isEnterprise ? 0 : Math.round(rawPrice / 12)

  // Monthly calculation: standard uncommitted rate (+15%)
  const standardMonthlyRate =
    isFree || isEnterprise
      ? 0
      : Math.round(annualMonthlyEquivalent > 0 ? annualMonthlyEquivalent / 0.85 : 0)

  // Highlights based on plan attributes & tiers
  let highlights: string[] = []
  let includesLabel = 'Included with your plan'

  if (isFree) {
    includesLabel = 'Included with free plan'
    highlights = [
      `**${plan.credits_bonus || 20} bonus credits** included`,
      'Up to **3 active valuation files**',
      '**Estimated value, range & confidence**',
      'Financial trends and margin views',
      'Structured report summary preview',
      'Email support',
    ]
  } else if (normalizedName.includes('small')) {
    includesLabel = 'Everything in Beginner, plus'
    highlights = [
      `**${plan.credits} credits** + **${plan.credits_bonus} bonus credits**`,
      `**$${plan.cost_per_credits}** per additional credit`,
      'Up to **10 active valuation files**',
      'Multi-user collaboration',
      'Value driver panels & historical trends',
      'Standard support',
    ]
  } else if (normalizedName.includes('medium')) {
    includesLabel = 'Everything in Small, plus'
    highlights = [
      `**${plan.credits} credits** + **${plan.credits_bonus} bonus credits**`,
      `**$${plan.cost_per_credits}** per additional credit`,
      '**Unlimited** valuation files',
      'Multi-user collaboration & shared notes',
      '**Priority support**',
      'Personalized onboarding walkthrough',
    ]
  } else if (normalizedName.includes('large')) {
    includesLabel = 'Everything in Medium, plus'
    highlights = [
      `**${plan.credits} credits** + **${plan.credits_bonus} bonus credits**`,
      `**$${plan.cost_per_credits}** per additional credit`,
      'Advanced valuation modeling',
      'Value drivers & benchmark comparisons',
      '**Priority support SLA**',
      'Custom onboarding & review session',
    ]
  } else if (isEnterprise) {
    includesLabel = 'Everything in Large, plus'
    highlights = [
      `**${plan.credits}+ credits** + **${plan.credits_bonus} bonus credits**`,
      `**$${plan.cost_per_credits}** volume credit rate`,
      '**Role-based permissions** & audit-friendly logs',
      'SSO-ready enterprise security',
      'Dedicated success manager',
      '**4-hour support SLA**',
    ]
  } else {
    highlights = [
      `**${plan.credits} credits** + **${plan.credits_bonus} bonus**`,
      `**$${plan.cost_per_credits}** per additional credit`,
      'Valuation modeling workspace',
      'Structured reporting preview',
      'Support access',
    ]
  }

  const isPopular = normalizedName.includes('medium')

  return {
    id: plan.id,
    name: plan.name,
    description: getPlanDescription(plan.name, plan.description),
    popular: isPopular,
    monthly: standardMonthlyRate,
    annual: annualMonthlyEquivalent,
    price: rawPrice,
    isCustom: isEnterprise,
    credits: plan.credits,
    credits_bonus: plan.credits_bonus,
    cost_per_credits: plan.cost_per_credits,
    cta: isEnterprise ? 'Talk to Us' : isFree ? 'Start Free Trial' : 'Get Started',
    ctaTo: isEnterprise ? '/contact' : '/get-started',
    includesLabel,
    highlights,
  }
}

/**
 * Fetch plans from http://valu8er.instaging.net/api/v1/plans with fallback resilience
 */
export async function getPricingPlans(): Promise<PricingPlan[]> {
  const endpoints = [
    '/api/v1/plans',
    'https://valu8er.instaging.net/api/v1/plans',
    'http://valu8er.instaging.net/api/v1/plans',
  ]

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        const result: ApiPlansResponse = await response.json()
        if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
          const activePlans = result.data.filter((p) => p.active === 1)
          if (activePlans.length > 0) {
            return activePlans.map(transformApiPlan)
          }
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  return FALLBACK_PLANS
}
