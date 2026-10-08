export const demoCompany = {
  name: 'Acme Technologies',
  industry: 'Enterprise software',
  updated: 'Updated today',
  value: '$8.42M',
  low: '$7.6M',
  high: '$9.3M',
  confidence: 'High',
  revenue: '$4.8M',
  ebitda: '$1.1M',
  growth: '+18.4%',
  position: 0.58,
}

export const revenueTrend = [3.2, 3.4, 3.6, 3.9, 4.1, 4.4, 4.8]
export const ebitdaTrend = [0.62, 0.68, 0.74, 0.8, 0.88, 0.97, 1.1]
export const valuationTrend = [6.8, 7.1, 7.4, 7.6, 7.9, 8.2, 8.42]
export const benchmarkBars = [62, 71, 58, 80, 74]

export const valuationFactors = [
  { label: 'Revenue', value: '$4.8M', note: 'Stable trailing year' },
  { label: 'Growth', value: '+18.4%', note: 'Above peer median' },
  { label: 'Margins', value: '22.9%', note: 'Holds through scale' },
  { label: 'Market multiple', value: '7.6x', note: 'Earnings-based view' },
  { label: 'Industry context', value: 'Software', note: 'Private-company set' },
]

export const heroProof = [
  'Guided setup for first valuation',
  'Team workflow in one workspace',
  'Billable-ready report outputs',
]

export const heroStats = [
  { value: '10–20×', label: 'Faster report completion' },
  { value: '100+', label: 'Countries & currencies' },
  { value: 'AWS', label: 'Cloud security foundation' },
]

export const costLeak = {
  kicker: 'The hidden cost of spreadsheet valuations',
  title: 'Every engagement still leaks hours to folders, rework, and version chase.',
  lede:
    'Excel models, Word drafts, email threads, and shared drives quietly absorb judgment time before a conclusion is ready to defend.',
  perFileLabel: 'Per engagement · illustrative',
  totalHours: 11,
  perFile: [
    { label: 'Hunting inputs & versions', hours: '3.0 hrs', value: 3 },
    { label: 'Manual schedules & cross-checks', hours: '4.0 hrs', value: 4 },
    { label: 'Rework after assumption changes', hours: '2.5 hrs', value: 2.5 },
    { label: 'Extra review rounds', hours: '1.5 hrs', value: 1.5 },
  ],
  totals: [
    { value: '11 hrs', label: 'lost per engagement', note: 'before judgment starts' },
    { value: '$1,375', label: 'cost per engagement', note: 'at $125/hr blended' },
    { value: '0%', label: 'billable recovery', note: 'rework rarely invoices' },
  ],
  annualLabel: 'At 100 engagements per year',
  annual: [
    { value: '1,100', label: 'hrs leaked / year' },
    { value: '$137K', label: 'capacity lost' },
    { value: '0.5 FTE', label: 'absorbed by rework' },
  ],
  annualNote: 'At 100 valuation engagements per year, teams effectively fund half a full-time role in avoidable rework.',
}

export type RecoveryStage = {
  id: string
  label: string
  todayTitle: string
  todayCopy: string
  todayLoss: string
  nextTitle: string
  nextCopy: string
  nextGain: string
}

export const recoveryStages: RecoveryStage[] = [
  {
    id: 'organize',
    label: 'Organize',
    todayTitle: 'Files live across folders and inboxes',
    todayCopy:
      'Financials, comps, and working notes arrive by email and sit in disconnected drives. Status is a conversation, not a system.',
    todayLoss: '− 3 hrs chasing',
    nextTitle: 'The engagement lives in one workspace',
    nextCopy:
      'Company context, source documents, and team ownership sit on the same file — visible to everyone who needs them.',
    nextGain: '+ 3 hrs recovered',
  },
  {
    id: 'model',
    label: 'Model & conclude',
    todayTitle: 'Hours of arithmetic before real judgment',
    todayCopy:
      'Manual mapping, schedule rebuilds, and multiple recalculation each time an assumption changes. Review starts late.',
    todayLoss: '− 4 hrs rework',
    nextTitle: 'Calculations and multiples stay structured',
    nextCopy:
      'Built-in math, diagnostics, and suggested multiples help teams start closer to a defensible range — then record why.',
    nextGain: '+ 4 hrs recovered',
  },
  {
    id: 'deliver',
    label: 'Review & deliver',
    todayTitle: 'Issues surface in the final pass',
    todayCopy:
      'Partners catch gaps on delivery day. Word drafts, chart packs, and appendices get rebuilt under deadline pressure.',
    todayLoss: '− 1.5 hrs extra reviews',
    nextTitle: 'Review stays attached to the file',
    nextCopy:
      'Notes, diagnostics, and auto-generated schedules keep the conclusion reviewable throughout — not only at the end.',
    nextGain: '+ 1.5 hrs recovered',
  },
]

export const connectedSystem = {
  kicker: 'One connected system',
  title: 'Your entire valuation workflow. One workspace.',
  lede:
    'Valu8er replaces the Excel–Word–folder stack with a guided path from inputs to a billable-ready report — without losing professional judgment.',
  sourcesLabel: 'Bring in from your stack',
  sources: ['Financials', 'Documents', 'Comps', 'Notes', 'Templates'],
  hubLabel: 'Valu8er workspace',
  stages: [
    { label: 'Chart the company', state: 'Mapped' },
    { label: 'Run methods', state: 'Generated' },
    { label: 'Form the range', state: 'Checked' },
    { label: 'Produce the report', state: 'Ready' },
  ],
  readyLabel: 'Complete file · ready for review',
  outcomesLabel: 'What stays attached',
  callouts: [
    {
      title: 'Diagnostics before sign-off',
      copy: 'Warnings and checks surface material gaps so reviewers spend time on judgment, not scavenger hunts.',
    },
    {
      title: 'Schedules that stay in sync',
      copy: 'Cross-references, appendices, and charts regenerate with the file instead of drifting in separate docs.',
    },
  ],
}

export type HomePillar = {
  id: string
  label: string
  title: string
  copy: string
  points: string[]
  panel: {
    eyebrow: string
    heading: string
    metrics: { label: string; value: string }[]
    status: string
  }
}

export const homePillars: HomePillar[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    title: 'Team-based valuation workflow',
    copy:
      'Every file, model, document, and review note lives in one dashboard — so staff allocate, collaborate, and hand off without email archaeology.',
    points: [
      'All live and completed files in one place',
      'Staff allocation and review notes on the file',
      'Duplicate and roll forward prior valuations',
      'Supporting documents attached by section',
    ],
    panel: {
      eyebrow: 'Engagement dashboard',
      heading: 'Acme Technologies · Live file',
      metrics: [
        { label: 'Owner', value: 'Priya N.' },
        { label: 'Reviewer', value: 'Daniel O.' },
        { label: 'Status', value: 'In review' },
        { label: 'Docs', value: '24 attached' },
      ],
      status: 'Team workspace active',
    },
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    title: 'Guided analysis with suggested multiples',
    copy:
      'Like modern tax software for valuations: algorithms handle the arithmetic while professionals steer methods, standards, and conclusions.',
    points: [
      'Asset, cash flow, earnings, and market approaches',
      'Independently suggested EBITDA & sales multiples',
      'Built-in tax, capital gains, and recapture checks',
      'Diagnostics and warnings through the file',
    ],
    panel: {
      eyebrow: 'Method intelligence',
      heading: 'Earnings approach · suggested view',
      metrics: [
        { label: 'Multiple', value: '7.6×' },
        { label: 'EBITDA', value: '$1.1M' },
        { label: 'Midpoint', value: '$8.42M' },
        { label: 'Confidence', value: 'High' },
      ],
      status: '15 pillars informing the range',
    },
  },
  {
    id: 'delivery',
    label: 'Delivery',
    title: 'Reports that look finished — and stay current',
    copy:
      'Auto-generated schedules, charts, and cross-references produce visually clear valuation reports ready for clients, boards, or tax use.',
    points: [
      'Billable PDF-ready narratives and schedules',
      'Informal schedules-only or comprehensive reports',
      'Global standards and multi-currency support',
      'Update reports from a completed prior file',
    ],
    panel: {
      eyebrow: 'Report package',
      heading: 'Comprehensive · 100+ pages capable',
      metrics: [
        { label: 'Schedules', value: 'Synced' },
        { label: 'Charts', value: 'Embedded' },
        { label: 'Refs', value: 'Linked' },
        { label: 'Output', value: 'Ready' },
      ],
      status: 'Delivery package assembled',
    },
  },
]

export type HomeAudience = {
  id: string
  label: string
  title: string
  copy: string
  to: string
  cta: string
  focus: { label: string; level: string }[]
  points: string[]
}

export const homeAudiences: HomeAudience[] = [
  {
    id: 'owners',
    label: 'Owners & operators',
    title: 'Know what the business is worth before the hard conversation.',
    copy:
      'Whether you are planning a sale, recap, or succession path, Valu8er gives a calm range with the drivers beside it — not a black-box number.',
    to: '/solutions/business-owners',
    cta: 'Explore for owners',
    focus: [
      { label: 'Readable range', level: 'Core' },
      { label: 'Driver clarity', level: 'High' },
      { label: 'Revisit later', level: 'Core' },
    ],
    points: [
      'Value any industry from traditional to SaaS and fintech',
      'Keep supporting documents with the conclusion',
      'Revisit and update without rebuilding from scratch',
    ],
  },
  {
    id: 'cpa',
    label: 'CPAs & CFOs',
    title: 'Grow a valuation practice without guessing the next schedule.',
    copy:
      'Limited valuation experience is fine. Valu8er guides schedule by schedule with diagnostics and warnings — and optional live-file help when you need it.',
    to: '/solutions/advisors',
    cta: 'Explore for CPAs & CFOs',
    focus: [
      { label: 'Guided workflow', level: 'High' },
      { label: 'CRA-ready rigor', level: 'High' },
      { label: 'Partnership option', level: 'Core' },
    ],
    points: [
      'Go beyond thin standards with corroboration-minded outputs',
      'Independently suggested multiples for tax valuations',
      'Partner with Valu8er on engagements when you prefer not to DIY',
    ],
  },
  {
    id: 'teams',
    label: 'Boutique & enterprise teams',
    title: 'Same platform underneath — tuned for throughput and control.',
    copy:
      'Put staff on files together, standardize method, and keep review notes where the work happens. Scale users without inventing a new process each time.',
    to: '/solutions/finance-teams',
    cta: 'Explore for teams',
    focus: [
      { label: 'Team workflow', level: 'High' },
      { label: 'Roll-forward speed', level: 'High' },
      { label: 'Governance', level: 'Core' },
    ],
    points: [
      'Flexible plans from individual to enterprise seats',
      'Duplicate prior industry files to move faster',
      'Consistent method across analysts and reviewers',
    ],
  },
]

export const onboardingVideo = {
  /** Swap this ID anytime — poster UI stays branded */
  youtubeId: 'M7lc1UVf-VE',
  title: 'Valu8er product walkthrough',
  caption: 'See how a valuation file moves from inputs to a billable-ready report.',
  duration: '3:12',
}

export type OnboardingStep = {
  id: string
  n: string
  title: string
  copy: string
  points: string[]
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'start',
    n: '01',
    title: 'Up and running in days — not a six-month project.',
    copy:
      'No heavy IT program required. Create a workspace, invite the team, and open the first engagement the same week.',
    points: [
      'Guided path to the first valuation file',
      'Templates ready for common engagement types',
      'Theme and team settings without consultants',
    ],
  },
  {
    id: 'migrate',
    n: '02',
    title: 'Bring prior work forward instead of starting over.',
    copy:
      'Duplicate completed files, roll valuation dates, and keep documents attached so industry playbooks compound.',
    points: [
      'Duplicate dental, pharmacy, SaaS, and more',
      'Change the valuation date and refresh the view',
      'Keep section documents with the rolled file',
    ],
  },
  {
    id: 'support',
    n: '03',
    title: 'Support when judgment needs a second set of eyes.',
    copy:
      'From product guidance to optional live-file assistance — including industry research and comparable selection help.',
    points: [
      'In-product diagnostics and warnings',
      'Optional live-file collaboration',
      'Resources for standards and report levels',
    ],
  },
]

export const impactStats = [
  { value: '10–20×', label: 'Faster path to finished reports' },
  { value: '100+', label: 'Countries and currencies supported' },
  { value: '4+', label: 'Valuation approach families' },
  { value: 'AWS', label: 'Security practices you can trust' },
]

export type HomeTestimonial = {
  id: string
  badge: string
  quote: { text: string; bold?: boolean }[]
  name: string
  role: string
  initials: string
}

/** Row 1 scrolls right → left */
export const testimonialRowOne: HomeTestimonial[] = [
  {
    id: 'r1-1',
    badge: 'Report speed',
    quote: [
      { text: 'We stopped rebuilding Word schedules from scratch. ' },
      { text: 'The package stays synced to the file', bold: true },
      { text: ' — and clients notice the clarity.' },
    ],
    name: 'Priya Nair',
    role: 'Valuation Lead · Toronto',
    initials: 'PN',
  },
  {
    id: 'r1-2',
    badge: 'Team handoffs',
    quote: [
      { text: 'Review notes live on the engagement now. ' },
      { text: 'No more email threads as the audit trail', bold: true },
      { text: '.' },
    ],
    name: 'Daniel Ortega',
    role: 'Partner · Austin',
    initials: 'DO',
  },
  {
    id: 'r1-3',
    badge: 'Guided practice',
    quote: [
      { text: 'Our newer CPAs can move schedule by schedule with ' },
      { text: 'diagnostics that catch misses early', bold: true },
      { text: '.' },
    ],
    name: 'Hannah Blake',
    role: 'CPA · Chicago',
    initials: 'HB',
  },
  {
    id: 'r1-4',
    badge: 'Tax valuations',
    quote: [
      { text: 'Suggested multiples plus a full paper trail made ' },
      { text: 'CRA-facing files feel less risky', bold: true },
      { text: '.' },
    ],
    name: 'Marcus Chen',
    role: 'Tax Advisor · Vancouver',
    initials: 'MC',
  },
  {
    id: 'r1-5',
    badge: 'Roll forward',
    quote: [
      { text: 'Duplicating last year’s dental file and updating the date ' },
      { text: 'cut days off our cycle', bold: true },
      { text: '.' },
    ],
    name: 'Elena Vargas',
    role: 'Boutique Firm · Denver',
    initials: 'EV',
  },
]

/** Row 2 scrolls left → right */
export const testimonialRowTwo: HomeTestimonial[] = [
  {
    id: 'r2-1',
    badge: 'Defensible midpoint',
    quote: [
      { text: 'When boards ask why this number, we point to ' },
      { text: 'methods, drivers, and charts in one place', bold: true },
      { text: '.' },
    ],
    name: 'James Whitfield',
    role: 'CFO · London',
    initials: 'JW',
  },
  {
    id: 'r2-2',
    badge: 'Less spreadsheet chase',
    quote: [
      { text: 'Financials, comps, and conclusions ' },
      { text: 'finally stopped living in three tools', bold: true },
      { text: '.' },
    ],
    name: 'Sofia Rahman',
    role: 'Transaction Advisor · Singapore',
    initials: 'SR',
  },
  {
    id: 'r2-3',
    badge: 'Owner clarity',
    quote: [
      { text: 'Before succession talks I needed ' },
      { text: 'a calm view of worth and why', bold: true },
      { text: '. This is that view.' },
    ],
    name: 'Tom Hughes',
    role: 'Founder · Montreal',
    initials: 'TH',
  },
  {
    id: 'r2-4',
    badge: 'Visual reports',
    quote: [
      { text: 'Clients actually read the charts. ' },
      { text: 'The report stopped feeling like a binder dump', bold: true },
      { text: '.' },
    ],
    name: 'Aisha Okonkwo',
    role: 'Managing Director · New York',
    initials: 'AO',
  },
  {
    id: 'r2-5',
    badge: 'Multi-country work',
    quote: [
      { text: 'Switching currency and standards without rebuilding the model ' },
      { text: 'saved an entire analyst week', bold: true },
      { text: '.' },
    ],
    name: 'Lars Bergman',
    role: 'Cross-border Advisor · Stockholm',
    initials: 'LB',
  },
]
