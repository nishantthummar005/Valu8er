export type NavChild = {
  label: string
  to: string
  icon?: string
  description?: string
}

export type NavItem = {
  label: string
  to: string
  children?: NavChild[]
}

export type FooterColumn = {
  title: string
  links: Array<{ label: string; to: string }>
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Platform',
    to: '/platform',
    children: [
      { label: 'Valuation', to: '/platform/valuation', icon: 'valuation', description: 'Structured value assessment' },
      { label: 'Analysis', to: '/platform/analysis', icon: 'analysis', description: 'Financial review workspace' },
      { label: 'Benchmarking', to: '/platform/benchmarking', icon: 'benchmarking', description: 'Peer comparison views' },
      { label: 'Reports', to: '/platform/reports', icon: 'reports', description: 'Export-ready summaries' },
    ],
  },
  {
    label: 'Solutions',
    to: '/solutions',
    children: [
      { label: 'Business Owners', to: '/solutions/business-owners', icon: 'company', description: 'Clarity for ownership decisions' },
      { label: 'Advisors', to: '/solutions/advisors', icon: 'users', description: 'Shared client context' },
      { label: 'Finance Teams', to: '/solutions/finance-teams', icon: 'workflow', description: 'Internal valuation workflows' },
    ],
  },
  {
    label: 'Resources',
    to: '/resources',
    children: [
      { label: 'Guides', to: '/resources/guides', icon: 'documents', description: 'Practical walkthroughs' },
      { label: 'Insights', to: '/resources/insights', icon: 'insights', description: 'Notes from the field' },
      { label: 'FAQs', to: '/resources/faq', icon: 'dashboard', description: 'Common questions' },
    ],
  },
  { label: 'Pricing', to: '/pricing' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', to: '/platform' },
      { label: 'Valuation', to: '/platform/valuation' },
      { label: 'Analysis', to: '/platform/analysis' },
      { label: 'Reports', to: '/platform/reports' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Business Owners', to: '/solutions/business-owners' },
      { label: 'Advisors', to: '/solutions/advisors' },
      { label: 'Finance Teams', to: '/solutions/finance-teams' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Guides', to: '/resources/guides' },
      { label: 'Insights', to: '/resources/insights' },
      { label: 'FAQ', to: '/resources/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
]

export const socialPlaceholders = [
  { label: 'LinkedIn (placeholder)', icon: 'mdi-linkedin' },
  { label: 'X (placeholder)', icon: 'mdi-twitter' },
]

export function isNavActive(path: string, to: string) {
  if (to === '/') return path === '/'
  return path === to || path.startsWith(`${to}/`)
}
