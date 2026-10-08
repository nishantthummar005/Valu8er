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
  { label: 'About Us', to: '/about' },
  { label: 'Platform', to: '/platform' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact Us', to: '/contact' },
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', to: '/platform' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Get Started', to: '/get-started' },
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
      { label: 'About Us', to: '/about' },
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

export const footerContact = {
  email: 'info@valu8er.com',
  phone: '1-833-825-8837',
  phoneDisplay: '1-833-VALU8ER',
}

export const footerTrust = [
  { label: 'AWS cloud security', icon: 'security' },
  { label: 'Team workflow', icon: 'workflow' },
  { label: 'Report-ready outputs', icon: 'reports' },
]

export function isNavActive(path: string, to: string) {
  if (to === '/') return path === '/'
  return path === to || path.startsWith(`${to}/`)
}
