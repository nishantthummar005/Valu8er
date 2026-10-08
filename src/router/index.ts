import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import FoundationLayout from '@/layouts/FoundationLayout.vue'

const page = (path: string, name: string, title: string, eyebrow: string): RouteRecordRaw => ({
  path,
  name,
  component: () => import('@/pages/PlaceholderPage.vue'),
  meta: { title, eyebrow },
})

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
          meta: { title: 'Home', eyebrow: 'Website' },
        },
        {
          path: 'platform',
          name: 'platform',
          component: () => import('@/pages/PlatformPage.vue'),
          meta: { title: 'Platform', eyebrow: 'Product' },
        },
        page('platform/valuation', 'platform-valuation', 'Valuation', 'Platform'),
        page('platform/analysis', 'platform-analysis', 'Analysis', 'Platform'),
        page('platform/benchmarking', 'platform-benchmarking', 'Benchmarking', 'Platform'),
        page('platform/reports', 'platform-reports', 'Reports', 'Platform'),
        page('solutions', 'solutions', 'Solutions', 'Audience'),
        page('solutions/business-owners', 'solutions-owners', 'Business Owners', 'Solutions'),
        page('solutions/advisors', 'solutions-advisors', 'Advisors', 'Solutions'),
        page('solutions/finance-teams', 'solutions-finance', 'Finance Teams', 'Solutions'),
        page('resources', 'resources', 'Resources', 'Library'),
        page('resources/guides', 'resources-guides', 'Guides', 'Resources'),
        page('resources/insights', 'resources-insights', 'Insights', 'Resources'),
        page('resources/faq', 'resources-faq', 'FAQs', 'Resources'),
        {
          path: 'pricing',
          name: 'pricing',
          component: () => import('@/pages/PricingPage.vue'),
          meta: { title: 'Pricing', eyebrow: 'Website' },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/AboutPage.vue'),
          meta: { title: 'About', eyebrow: 'Company' },
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import('@/pages/ContactPage.vue'),
          meta: { title: 'Contact', eyebrow: 'Company' },
        },
        page('privacy', 'privacy', 'Privacy', 'Legal'),
        page('terms', 'terms', 'Terms', 'Legal'),
        page('cookies', 'cookies', 'Cookie Policy', 'Legal'),
      ],
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/pages/auth/LoginPage.vue'),
          meta: { title: 'Sign in' },
        },
      ],
    },
    {
      path: '/get-started',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'get-started',
          component: () => import('@/pages/auth/GetStartedPage.vue'),
          meta: { title: 'Get started' },
        },
      ],
    },
    {
      path: '/forgot-password',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'forgot-password',
          component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
          meta: { title: 'Reset password' },
        },
      ],
    },
    {
      path: '/reset-password',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'reset-password',
          component: () => import('@/pages/auth/ResetPasswordPage.vue'),
          meta: { title: 'Set a new password' },
        },
      ],
    },
    {
      path: '/foundation',
      component: FoundationLayout,
      children: [
        {
          path: '',
          name: 'foundation',
          component: () => import('@/pages/FoundationPage.vue'),
          meta: { title: 'Design system' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
