import { footerContact } from '@/config/navigation'

export const contactHero = {
  eyebrow: "Let's talk",
  title: "Let's make financial clarity easier.",
  lede:
    'Reach out about the valuation platform, product questions, business use cases, partnerships, or how to get started. Share a little context and we’ll point you toward the right next step.',
}

export type ContactOption = {
  id: string
  title: string
  copy: string
  cta: string
  to: string
  icon: string
  external?: boolean
}

export const contactOptions: ContactOption[] = [
  {
    id: 'product',
    title: 'Product & Platform',
    copy: 'Questions about valuation, analysis, benchmarking, reports, and platform capabilities.',
    cta: 'Explore Platform',
    to: '/platform',
    icon: 'valuation',
  },
  {
    id: 'started',
    title: 'Getting Started',
    copy: 'Want to understand how the platform could fit your business workflow?',
    cta: 'Get Started',
    to: '/get-started',
    icon: 'workflow',
  },
  {
    id: 'general',
    title: 'General Enquiries',
    copy: 'For general questions, partnerships, or other enquiries.',
    cta: footerContact.email,
    to: `mailto:${footerContact.email}`,
    icon: 'mdi-email-outline',
    external: true,
  },
]

export const contactTopics = [
  { title: 'Understanding the platform', value: 'platform' },
  { title: 'Business valuation', value: 'valuation' },
  { title: 'Financial analysis', value: 'analysis' },
  { title: 'Benchmarking', value: 'benchmarking' },
  { title: 'Reporting', value: 'reporting' },
  { title: 'Getting started', value: 'getting-started' },
  { title: 'Partnership', value: 'partnership' },
  { title: 'General enquiry', value: 'general' },
]

export const contactProcess = [
  {
    n: '01',
    title: 'Tell us what you need',
    copy: 'Share your goals, questions, or use case so we understand what you’re solving for.',
  },
  {
    n: '02',
    title: 'Explore the right workflow',
    copy: 'Understand which parts of the platform fit your needs — valuation, analysis, or delivery.',
  },
  {
    n: '03',
    title: 'Move forward with clarity',
    copy: 'Get the information needed to decide your next step with confidence.',
  },
]

export const contactResources = [
  {
    title: 'Explore the Platform',
    copy: 'See valuation, financial analysis, benchmarking, and reporting.',
    to: '/platform',
    icon: 'dashboard',
  },
  {
    title: 'Get Started',
    copy: 'Start exploring the product experience.',
    to: '/get-started',
    icon: 'workflow',
  },
  {
    title: 'Frequently Asked Questions',
    copy: 'Find answers to common questions.',
    to: '/resources/faq',
    icon: 'insights',
  },
]

export type ContactFaq = {
  question: string
  answer: string
  link?: { label: string; to: string }
}

export const contactFaqs: ContactFaq[] = [
  {
    question: 'What is the platform?',
    answer:
      'Valu8er is a financial intelligence and valuation platform that helps teams organize inputs, run structured analysis, and keep reasoning attached to the file.',
  },
  {
    question: 'Who is it for?',
    answer:
      'It’s designed for business owners, advisors, and finance teams who need clearer, more defensible valuation workflows.',
  },
  {
    question: 'Can I explore the platform before contacting you?',
    answer: 'Yes. You can review the platform anytime before reaching out.',
    link: { label: 'Explore the platform', to: '/platform' },
  },
  {
    question: 'Is this contact form connected to email?',
    answer:
      'Not yet. This form is currently a frontend demonstration and does not send or store messages.',
  },
]

export const MESSAGE_MIN_LENGTH = 20
