export const platformCompany = {
  name: 'Acme Technologies',
  industry: 'Enterprise Software',
  period: 'FY2025',
  value: '$8.42M',
  low: '$7.6M',
  high: '$9.3M',
  range: '$7.6M — $9.3M',
  confidence: 'High',
  revenue: '$4.8M',
  ebitda: '$1.1M',
  growth: '+18.4%',
  growthPlain: '18.4%',
  margin: '22.9%',
  multiple: '7.2×',
  quality: 'Strong',
  health: 'Healthy',
  employees: '25',
  position: 0.58,
  status: 'Analysis Ready',
  revenuePerEmployee: '$192K',
  referenceRevenuePerEmployee: '$176K',
}

export const dashboardNav = [
  { label: 'Overview', to: '/platform', current: true },
  { label: 'Valuation', to: '/platform/valuation', current: false },
  { label: 'Financials', to: '/platform/analysis', current: false },
  { label: 'Benchmarking', to: '/platform/benchmarking', current: false },
  { label: 'Reports', to: '/platform/reports', current: false },
] as const

export const dashboardMetrics = [
  { label: 'Revenue', value: platformCompany.revenue },
  { label: 'EBITDA', value: platformCompany.ebitda },
  { label: 'Growth', value: platformCompany.growth },
  { label: 'EBITDA margin', value: platformCompany.margin },
]

export const dashboardDrivers = [
  { label: 'Revenue growth', value: 'Strong' },
  { label: 'Profitability', value: 'Strong' },
  { label: 'Market multiple', value: platformCompany.multiple },
  { label: 'Industry position', value: 'Above reference' },
  { label: 'Financial quality', value: platformCompany.health },
]

export const revenueHistory = [
  { year: '2022', value: 3.1, display: '$3.1M' },
  { year: '2023', value: 3.7, display: '$3.7M' },
  { year: '2024', value: 4.1, display: '$4.1M' },
  { year: '2025', value: 4.8, display: '$4.8M' },
]

export const ebitdaHistory = [
  { year: '2022', value: 0.6, display: '$0.6M' },
  { year: '2023', value: 0.8, display: '$0.8M' },
  { year: '2024', value: 0.9, display: '$0.9M' },
  { year: '2025', value: 1.1, display: '$1.1M' },
]

export const revenueTrend = revenueHistory.map((item) => item.value)
export const ebitdaTrend = ebitdaHistory.map((item) => item.value)

export const valuationDrivers = [
  { label: 'Revenue', value: platformCompany.revenue, tone: 'positive', note: 'Carries the midpoint' },
  { label: 'Growth', value: platformCompany.growth, tone: 'positive', note: 'Still expanding' },
  { label: 'EBITDA margin', value: platformCompany.margin, tone: 'positive', note: 'Holds through scale' },
  { label: 'Industry multiple', value: platformCompany.multiple, tone: 'neutral', note: 'Earnings-based view' },
  { label: 'Financial quality', value: platformCompany.quality, tone: 'watch', note: 'Watch concentration' },
] as const

export const analysisInsights = [
  { title: 'Growth accelerating', copy: 'The last two periods add more revenue than the two before them.' },
  { title: 'Margins improving', copy: 'Earnings keep pace as the top line expands.' },
  { title: 'Profitability strengthening', copy: 'EBITDA rises through the same four-year window.' },
]

export const benchmarkRows = [
  { label: 'Revenue growth', company: '18.4%', reference: '12.1%', companyValue: 18.4, referenceValue: 12.1 },
  { label: 'EBITDA margin', company: '22.9%', reference: '18.7%', companyValue: 22.9, referenceValue: 18.7 },
  { label: 'Revenue / employee', company: '$192K', reference: '$176K', companyValue: 192, referenceValue: 176 },
  { label: 'Valuation multiple', company: '7.2×', reference: '6.4×', companyValue: 7.2, referenceValue: 6.4 },
]

export const reportOutline = [
  'Executive Summary',
  'Financial Performance',
  'Valuation Analysis',
  'Value Drivers',
  'Benchmark Overview',
  'Key Observations',
]

export const problemTraditional = [
  { title: 'Spreadsheets everywhere', copy: 'Financial figures live across multiple files and versions.' },
  { title: 'Manual calculations', copy: 'Valuation logic is rebuilt or checked manually.' },
  { title: 'Hard-to-compare performance', copy: 'Historical and reference metrics aren’t viewed together.' },
  { title: 'Numbers without context', copy: 'A valuation figure doesn’t explain what is driving it.' },
  { title: 'Reports assembled separately', copy: 'Analysis has to be turned into presentation-ready output manually.' },
]

export const problemPlatform = [
  { title: 'One structured workspace', copy: 'Financial information and valuation analysis live together.' },
  { title: 'Transparent valuation view', copy: 'See the estimated value, range and underlying drivers.' },
  { title: 'Financial trends in context', copy: 'Understand revenue, margins and growth together.' },
  { title: 'Benchmark performance', copy: 'Compare key metrics against relevant reference data.' },
  { title: 'Decision-ready reporting', copy: 'Bring the analysis together into a clear output.' },
]

export const workflowSteps = [
  { id: 'understand', n: '01', title: 'Understand', heading: 'Start with the financial picture.', copy: 'Bring the core business information into one structured view.' },
  { id: 'analyze', n: '02', title: 'Analyze', heading: 'See what the numbers are telling you.', copy: 'Read revenue, earnings, and margin together across the same periods.' },
  { id: 'value', n: '03', title: 'Value', heading: 'See the estimated value — and what drives it.', copy: 'A midpoint is useful when the range, confidence, and drivers sit beside it.' },
  { id: 'benchmark', n: '04', title: 'Benchmark', heading: 'Put performance into context.', copy: 'Place the company next to an illustrative reference set — not in isolation.' },
  { id: 'report', n: '05', title: 'Report', heading: 'Turn the analysis into a clear output.', copy: 'Keep the conclusion, the figures, and the caveats in one structured summary.' },
] as const

export const platformCapabilities = [
  { icon: 'valuation', title: 'Valuation intelligence', copy: 'See estimated value, valuation range and confidence.', to: '/platform/valuation' },
  { icon: 'analysis', title: 'Financial analysis', copy: 'Understand revenue, EBITDA, margins and growth.', to: '/platform/analysis' },
  { icon: 'insights', title: 'Value drivers', copy: 'See which financial and business factors influence value.', to: '/platform/valuation' },
  { icon: 'benchmarking', title: 'Benchmarking', copy: 'Compare performance against relevant reference metrics.', to: '/platform/benchmarking' },
  { icon: 'analytics', title: 'Historical trends', copy: 'Understand how financial performance changes over time.', to: '/platform/analysis' },
  { icon: 'reports', title: 'Reporting', copy: 'Bring valuation and analysis together into a clear summary.', to: '/platform/reports' },
]

export const ecosystemNodes = [
  { label: 'Financials', position: 'tl' },
  { label: 'Valuation', position: 'tr' },
  { label: 'Drivers', position: 'ml' },
  { label: 'Benchmarking', position: 'mr' },
  { label: 'Reports', position: 'bl' },
  { label: 'Insights', position: 'br' },
] as const

export const reasoningChain = [
  { label: 'Estimated value', value: platformCompany.value },
  { label: 'Revenue growth', value: platformCompany.growth },
  { label: 'EBITDA margin', value: platformCompany.margin },
  { label: 'Industry multiple', value: platformCompany.multiple },
  { label: 'Financial quality', value: platformCompany.quality },
  { label: 'Confidence', value: platformCompany.confidence },
]

export const dataSources = [
  { title: 'Financial statements', items: ['Revenue', 'Expenses', 'EBITDA', 'Margins'] },
  { title: 'Business profile', items: ['Industry', 'Business model', 'Size', 'Growth stage'] },
  { title: 'Historical performance', items: ['Revenue trends', 'Profitability', 'Growth'] },
  { title: 'Market context', items: ['Reference metrics', 'Valuation multiples', 'Benchmark indicators'] },
]

export const insightStatements = [
  { title: 'What is the business worth?', copy: 'Estimated value and valuation range.', value: platformCompany.value },
  { title: 'What is driving the value?', copy: 'Financial and business factors influencing the result.', value: platformCompany.growth },
  { title: 'How does the business compare?', copy: 'Performance and valuation context against reference metrics.', value: 'Above reference' },
]

export const capabilityGrid = [
  { title: 'Valuation', copy: 'Range, midpoint, and confidence in one view.', to: '/platform/valuation' },
  { title: 'Financial analysis', copy: 'Revenue, earnings, and margin over time.', to: '/platform/analysis' },
  { title: 'Benchmarking', copy: 'Company measures beside a reference set.', to: '/platform/benchmarking' },
  { title: 'Value drivers', copy: 'The few factors that actually move the range.', to: '/platform/valuation' },
  { title: 'Historical trends', copy: 'A four-period read of the financial picture.', to: '/platform/analysis' },
  { title: 'Report summaries', copy: 'A structured output ready for review.', to: '/platform/reports' },
  { title: 'Decision support', copy: 'Keep the conclusion attached to the same file.', to: '/platform' },
  { title: 'Structured workspace', copy: 'Valuation, analysis, and reporting in one place.', to: '/platform' },
]
