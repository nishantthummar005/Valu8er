export type BillingCycle = 'monthly' | 'quarterly' | 'annual'
export type Country = 'Canada' | 'USA'
export type CurrencyCode = 'CAD' | 'USD'

export type PlanId = string | number

export type PricingPlan = {
  id: PlanId
  name: string
  description: string
  popular?: boolean
  monthly: number
  quarterly?: number
  annual: number
  price?: number
  currency?: CurrencyCode
  quarterlyBilledTotal?: number
  annualBilledTotal?: number
  credits?: number
  credits_bonus?: number
  cost_per_credits?: number
  isCustom?: boolean
  cta: string
  ctaTo: string
  highlights: string[]
  includesLabel: string
}

export type FeatureCell = string | boolean

export type FeatureRow = {
  label: string
  labelHtml?: string
  tablesOnly: FeatureCell
  briefReport: FeatureCell
  intermediate: FeatureCell
  advanced: FeatureCell
}

export type FeatureGroup = {
  title: string
  rows: FeatureRow[]
}

export const pricingHero = {
  eyebrow: 'Pricing',
  title: 'One price.\nThe whole platform.',
  copy: 'Valuation, financial analysis, benchmarking, and reporting in one structured workspace — priced simply by seat.',
  capabilities: ['Valuation', 'Analysis', 'Benchmarking', 'Reporting'],
  trust: [
    '14-day free trial',
    'No credit card required',
    'Cancel anytime',
    'Upgrade when you need more',
  ],
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    description: 'For owners and small teams starting with a clear valuation workspace.',
    monthly: 49,
    annual: 42,
    cta: 'Start free trial',
    ctaTo: '/get-started',
    includesLabel: 'Included with your plan',
    highlights: [
      'Up to **5 active valuation files**',
      '**Estimated value, range & confidence**',
      'Financial trends and margin views',
      'Illustrative **benchmark comparisons**',
      'Structured report summary preview',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For advisors and growing teams running valuation work regularly.',
    popular: true,
    monthly: 89,
    annual: 76,
    cta: 'Start free trial',
    ctaTo: '/get-started',
    includesLabel: 'Everything in Essentials, plus',
    highlights: [
      '**Unlimited** valuation files',
      'Multi-user collaboration',
      'Value driver panels & historical trends',
      'Shared workspace notes',
      '**Priority support**',
      'Onboarding walkthrough',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For finance teams that need controls, deeper support, and firm-wide rollout.',
    monthly: 129,
    annual: 110,
    cta: 'Talk to us',
    ctaTo: '/contact',
    includesLabel: 'Everything in Professional, plus',
    highlights: [
      '**Role-based permissions** & audit-friendly records',
      'SSO-ready access controls',
      'Dedicated success contact',
      'Implementation guidance',
      'Custom onboarding & training hours',
      '**4-hour support SLA**',
    ],
  },
]

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Report Specifications & Capacity',
    rows: [
      {
        label: '# of Credits Required',
        tablesOnly: '10',
        briefReport: '20',
        intermediate: '40',
        advanced: '60',
      },
      {
        label: '# of Pages',
        tablesOnly: '10 to 15',
        briefReport: '35 to 45+',
        intermediate: '50 to 60+',
        advanced: '70 to 80+',
      },
      {
        label: '# of Methodologies*',
        tablesOnly: '4',
        briefReport: '7',
        intermediate: '7',
        advanced: '7',
      },
    ],
  },
  {
    title: 'Standards & Valuation Basics',
    rows: [
      {
        label: 'Suitable for American & Canadian Valuation Standards',
        tablesOnly: false,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Asset Deal or Share Valuation',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'AI Inputting of Financial Statements',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'AI Suggested Normalization of Items',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'AI Suggested Enterprise Value Range',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: '2000+ Industries',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'In-House Comparables Assistance',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Stub Period Calculator',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Hard Assets vs Goodwill Allocation',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Key Metrics Chart (Sales, Margins and Growth)',
        tablesOnly: true,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
    ],
  },
  {
    title: 'Reporting, Governance & Compliance',
    rows: [
      {
        label: 'Formal Full Body Report Generation suitable for CRA',
        labelHtml: 'Formal Full Body Report Generation suitable for <span style="color: #ef4444; font-weight: 700;">CRA</span>',
        tablesOnly: false,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'En Bloc Value and Individual Interest Conclusion**',
        tablesOnly: false,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Automatic Trapped-In Taxes Calculations',
        tablesOnly: false,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Economics - GDP Analysis',
        tablesOnly: false,
        briefReport: true,
        intermediate: true,
        advanced: true,
      },
    ],
  },
  {
    title: 'Industry Benchmarking & Financial Analysis',
    rows: [
      {
        label: 'Industry Historical and Forecasted Growth',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Industry Average Employee Productivity',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Industry Average Establishment Revenues and Wage Metrics',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Economics - Inflation and CPI Analysis',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Key Metrics Comparison for Goodwill Reasonability (Body)',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'EBITDA Margin Schedule',
        tablesOnly: false,
        briefReport: false,
        intermediate: true,
        advanced: true,
      },
      {
        label: 'Company Revenue Growth',
        tablesOnly: false,
        briefReport: false,
        intermediate: '—',
        advanced: '—',
      },
    ],
  },
  {
    title: 'Economic & Market Comparables Charts',
    rows: [
      {
        label: 'Economics - Country Average Hourly Wage',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Economics - Country Average Unemployment Rate',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Economics - Country Prime Lending Rate',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Industry - Revenues',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Industry - Establishments',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Industry - Revenue Productivity',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Revenues of Subject vs Comparables',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'EBITDA Margin % of Subject vs Comparables',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Growth Rate of Subject vs Comparables',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
      {
        label: 'Average Revenues per Employee - Subject vs Industry',
        tablesOnly: false,
        briefReport: false,
        intermediate: false,
        advanced: '—',
      },
    ],
  },
]

export const pricingFaqs = [
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. You can explore the valuation workspace for 14 days with no credit card. This is a frontend demo — trial signup does not create a real account yet.',
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fee on Essentials or Professional. Enterprise rollouts with custom onboarding may include a scoped implementation discussion, agreed upfront.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. Upgrade anytime. Monthly plans can be changed as your team grows. Annual plans can move up with the remaining balance applied to the new tier.',
  },
  {
    question: 'How does annual vs monthly billing work?',
    answer:
      'Monthly billing is charged each month at the listed monthly rate. Annual billing is charged upfront for 12 months at a 15% discount. Cancel monthly anytime.',
  },
  {
    question: 'What counts as a seat?',
    answer:
      'A seat is a named user who can open valuation files, edit analysis, or share report summaries in the workspace.',
  },
  {
    question: 'Do you offer volume or multi-team discounts?',
    answer:
      'Yes. Teams with multiple offices, larger seat counts, or enterprise controls should contact us for custom pricing.',
  },
  {
    question: 'How is Valu8er different from a spreadsheet?',
    answer:
      'Spreadsheets scatter versions, assumptions, and conclusions. Valu8er keeps the valuation range, drivers, benchmarks, and summary attached to one structured file.',
  },
]

export function formatPrice(amount: number | string) {
  if (typeof amount === 'string') return amount
  const formatted = Number.isInteger(amount) ? amount.toLocaleString() : amount.toFixed(0)
  return `$${formatted}`
}

export function priceFor(plan: PricingPlan, cycle: BillingCycle): number | string {
  if (plan.isCustom && !plan.annual && !plan.quarterly && !plan.monthly) {
    return 'Custom'
  }
  if (cycle === 'annual') return plan.annual
  if (cycle === 'quarterly') return plan.quarterly ?? plan.monthly
  return plan.monthly
}

export function billingNote(cycle: BillingCycle, plan?: PricingPlan) {
  if (plan?.isCustom && !plan?.quarterlyBilledTotal && !plan?.annualBilledTotal) {
    return 'tailored firm rollout'
  }
  if (plan && plan.monthly === 0 && plan.annual === 0) {
    return 'free forever, no card needed'
  }
  if (cycle === 'annual') {
    const total = plan?.annualBilledTotal ?? plan?.price
    if (total && total > 0) {
      return `per seat / mo ($${Math.round(total).toLocaleString()} billed annually)`
    }
    return 'per seat / month, billed annually'
  }
  if (cycle === 'quarterly') {
    const total = plan?.quarterlyBilledTotal ?? (plan?.quarterly ? plan.quarterly * 3 : undefined)
    if (total && total > 0) {
      return `per seat / mo ($${Math.round(total).toLocaleString()} billed quarterly)`
    }
    return 'per seat / month, billed quarterly'
  }
  return 'per seat / month, billed monthly'
}
