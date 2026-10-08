export type BillingCycle = 'monthly' | 'annual'

export type PlanId = 'essentials' | 'professional' | 'enterprise'

export type PricingPlan = {
  id: PlanId
  name: string
  description: string
  popular?: boolean
  monthly: number
  annual: number
  cta: string
  ctaTo: string
  highlights: string[]
  includesLabel: string
}

export type FeatureCell = string | boolean

export type FeatureRow = {
  label: string
  essentials: FeatureCell
  professional: FeatureCell
  enterprise: FeatureCell
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
    title: 'Workspace',
    rows: [
      { label: 'Active valuation files', essentials: 'Up to 5', professional: 'Unlimited', enterprise: 'Unlimited' },
      { label: 'Estimated value, range & confidence', essentials: true, professional: true, enterprise: true },
      { label: 'Financial analysis views', essentials: true, professional: true, enterprise: true },
      { label: 'Value drivers panel', essentials: true, professional: true, enterprise: true },
      { label: 'Historical trends', essentials: 'Core', professional: 'Full', enterprise: 'Full' },
      { label: 'Benchmark comparisons', essentials: 'Illustrative', professional: 'Full', enterprise: 'Full' },
      { label: 'Report summary preview', essentials: true, professional: true, enterprise: true },
    ],
  },
  {
    title: 'Collaboration',
    rows: [
      { label: 'Multi-user access', essentials: false, professional: true, enterprise: true },
      { label: 'Shared workspace notes', essentials: false, professional: true, enterprise: true },
      { label: 'Team handoff views', essentials: false, professional: true, enterprise: true },
    ],
  },
  {
    title: 'Controls & security',
    rows: [
      { label: 'Role-based permissions', essentials: false, professional: false, enterprise: true },
      { label: 'SSO-ready access', essentials: false, professional: false, enterprise: true },
      { label: 'File lock & sign-off trail', essentials: false, professional: false, enterprise: true },
    ],
  },
  {
    title: 'Support',
    rows: [
      { label: 'Support channel', essentials: 'Email', professional: 'Priority + chat', enterprise: 'Dedicated + SLA' },
      { label: 'Onboarding', essentials: 'Self-serve', professional: 'Walkthrough', enterprise: 'Guided implementation' },
      { label: 'Training hours', essentials: '—', professional: '2 hrs', enterprise: '10 hrs' },
      { label: 'Success contact', essentials: '—', professional: 'Shared', enterprise: 'Dedicated' },
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

export function formatPrice(amount: number) {
  return `$${amount}`
}

export function priceFor(plan: PricingPlan, cycle: BillingCycle) {
  return cycle === 'annual' ? plan.annual : plan.monthly
}

export function billingNote(cycle: BillingCycle) {
  return cycle === 'annual' ? 'per seat / month, billed annually' : 'per seat / month, billed monthly'
}
