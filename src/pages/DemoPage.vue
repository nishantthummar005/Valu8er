<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import DemoRequest from '@/components/demo/DemoRequest.vue'

const demoPerks = [
  {
    icon: 'mdi-chart-timeline-variant-shimmer',
    title: 'Customized Valuation Modeling',
    description:
      'See DCF, public company comparables, and transaction multiples tailored to your industry and growth stage.',
  },
  {
    icon: 'mdi-lightning-bolt-circle',
    title: 'Automated Market Comps',
    description:
      'Learn how Valu8er pulls real-time multiples and transaction data in seconds, replacing hours of manual research.',
  },
  {
    icon: 'mdi-file-document-check-outline',
    title: 'Executive-Ready Reports',
    description:
      'Preview audit-grade PDF and presentation decks ready for board meetings, investors, and M&A advisory.',
  },
  {
    icon: 'mdi-shield-lock-outline',
    title: 'Enterprise Security & Governance',
    description:
      'Review bank-grade AES-256 encryption, role-based team permissions, and compliant audit trails.',
  },
]

const calendlyInlineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // If Calendly inline widget is desired, we can also initialize it
  const checkCalendly = setInterval(() => {
    if (window.Calendly?.initInlineWidget && calendlyInlineRef.value) {
      clearInterval(checkCalendly)
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/rim-valexp/valu8er-demo-1pm-est',
        parentElement: calendlyInlineRef.value,
      })
    }
  }, 300)

  setTimeout(() => clearInterval(checkCalendly), 10000)
})
</script>

<template>
  <div class="demo-page">
    <!-- Hero Section -->
    <AppSection size="lg" class="demo-hero">
      <div class="demo-hero__aura" aria-hidden="true" />
      <AppContainer>
        <div class="demo-hero__content">
          <AppBadge variant="subtle" size="md" class="demo-hero__badge">
            <v-icon icon="mdi-sparkles" size="14" class="mr-1" />
            Live 1-on-1 Walkthrough
          </AppBadge>

          <h1 class="demo-hero__title">
            See the future of valuation <br />
            <span class="gradient-text">built for your workflow</span>
          </h1>

          <p class="demo-hero__subtitle">
            Book a dedicated 20-minute session with our valuation modeling specialists.
            Explore automated comparables, customized financial projections, and delivery-ready
            reports tailored to your firm.
          </p>

          <div class="demo-hero__actions">
            <!-- Calendly Trigger from DemoRequest.vue -->
            <DemoRequest label="Book Your Demo Now" />
            <AppButton variant="outline" to="/platform" icon="mdi-arrow-right">
              Explore Platform
            </AppButton>
          </div>

          <div class="demo-hero__meta">
            <span class="meta-item">
              <v-icon icon="mdi-check-circle" size="16" class="text-teal" />
              20-minute targeted tour
            </span>
            <span class="meta-item">
              <v-icon icon="mdi-check-circle" size="16" class="text-teal" />
              Tailored to your sector
            </span>
            <span class="meta-item">
              <v-icon icon="mdi-check-circle" size="16" class="text-teal" />
              No preparation required
            </span>
          </div>
        </div>
      </AppContainer>
    </AppSection>

    <!-- Interactive Calendly Booking Container -->
    <AppSection size="md" class="demo-calendar-section">
      <AppContainer>
        <div class="calendar-card-wrapper">
          <div class="calendar-card-header">
            <div class="calendar-card-header__info">
              <h2 class="calendar-card-header__title">Select a Date & Time</h2>
              <p class="calendar-card-header__subtitle">
                Choose a time that works best for your schedule. Instant calendar invite sent upon booking.
              </p>
            </div>
            <div class="calendar-card-header__action">
              <DemoRequest label="Open in Fullscreen" />
            </div>
          </div>

          <!-- Embedded Calendly Widget Frame -->
          <div class="calendar-embed-container">
            <div
              ref="calendlyInlineRef"
              class="calendly-inline-widget"
              data-url="https://calendly.com/rim-valexp/valu8er-demo-1pm-est"
              style="min-width: 320px; height: 700px;"
            />
          </div>
        </div>
      </AppContainer>
    </AppSection>

    <!-- What You Will Experience Section -->
    <AppSection size="lg" class="demo-perks-section">
      <AppContainer>
        <div class="section-header text-center">
          <AppBadge variant="subtle" size="sm" class="mb-3">What To Expect</AppBadge>
          <h2 class="section-title">Everything covered in your live walkthrough</h2>
          <p class="section-subtitle">
            We respect your time. Every session is led by a product specialist focused on your specific valuation needs.
          </p>
        </div>

        <div class="perks-grid">
          <AppCard
            v-for="perk in demoPerks"
            :key="perk.title"
            variant="glass"
            hoverable
            class="perk-card"
          >
            <div class="perk-icon-wrap">
              <v-icon :icon="perk.icon" size="26" />
            </div>
            <h3 class="perk-title">{{ perk.title }}</h3>
            <p class="perk-desc">{{ perk.description }}</p>
          </AppCard>
        </div>
      </AppContainer>
    </AppSection>

    <!-- Bottom CTA Banner -->
    <AppSection size="md" class="demo-cta-section">
      <AppContainer>
        <div class="demo-cta-box">
          <div class="demo-cta-box__glow" aria-hidden="true" />
          <h2 class="demo-cta-box__title">Ready to accelerate your valuation workflow?</h2>
          <p class="demo-cta-box__desc">
            Join corporate advisors, private equity teams, and finance directors saving 70%+ of modeling time.
          </p>
          <div class="demo-cta-box__buttons">
            <DemoRequest label="Schedule a Demo" />
            <AppButton variant="secondary" to="/get-started">
              Start Free Trial
            </AppButton>
          </div>
        </div>
      </AppContainer>
    </AppSection>
  </div>
</template>

<style scoped>
.demo-page {
  position: relative;
  overflow-x: clip;
}

/* Hero Section */
.demo-hero {
  position: relative;
  text-align: center;
  padding-block: var(--space-12) var(--space-8);
  isolation: isolate;
}

.demo-hero__aura {
  position: absolute;
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  width: 850px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, rgba(2, 132, 199, 0.12) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: -1;
}

.demo-hero__content {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.demo-hero__badge {
  margin-bottom: var(--space-4);
}

.demo-hero__title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.4rem, 4.5vw + 1rem, 3.8rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 var(--space-4);
  color: var(--color-text);
}

.gradient-text {
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 60%, #6366F1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.demo-hero__subtitle {
  font-size: clamp(1.05rem, 1vw + 0.6rem, 1.25rem);
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 680px;
  margin: 0 0 var(--space-6);
}

.demo-hero__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.demo-hero__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-6);
  font-size: 0.875rem;
  font-weight: 550;
  color: var(--color-text-secondary);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.text-teal {
  color: #0D9488;
}

/* Calendar Embedding Card */
.demo-calendar-section {
  padding-block: var(--space-4) var(--space-10);
}

.calendar-card-wrapper {
  background: var(--color-surface);
  border: 1px solid color-mix(in srgb, var(--color-border) 85%, var(--color-brand-primary));
  border-radius: var(--radius-2xl, 24px);
  box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(13, 148, 136, 0.06);
  overflow: hidden;
}

.calendar-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  background: color-mix(in srgb, var(--color-surface-muted) 50%, transparent);
}

.calendar-card-header__title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 750;
  margin: 0 0 0.25rem;
  color: var(--color-text);
}

.calendar-card-header__subtitle {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.calendar-embed-container {
  width: 100%;
  min-height: 700px;
  background: var(--color-surface);
}

/* Perks Section */
.demo-perks-section {
  padding-block: var(--space-8) var(--space-12);
}

.section-header {
  max-width: 640px;
  margin: 0 auto var(--space-10);
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 var(--space-2);
}

.section-subtitle {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.perks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-5);
}

.perk-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl, 18px);
}

.perk-icon-wrap {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(2, 132, 199, 0.12) 100%);
  color: #0D9488;
  margin-bottom: var(--space-4);
  border: 1px solid rgba(13, 148, 136, 0.2);
}

.perk-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 var(--space-2);
}

.perk-desc {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--color-text-secondary);
  margin: 0;
}

/* CTA Box */
.demo-cta-section {
  padding-block: 0 var(--space-14);
}

.demo-cta-box {
  position: relative;
  text-align: center;
  padding: var(--space-10) var(--space-6);
  border-radius: var(--radius-2xl, 24px);
  background: linear-gradient(145deg, #0D9488 0%, #0369A1 100%);
  color: #ffffff;
  overflow: hidden;
  box-shadow: 0 20px 48px -12px rgba(13, 148, 136, 0.4);
}

.demo-cta-box__glow {
  position: absolute;
  inset: -50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.demo-cta-box__title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-3);
}

.demo-cta-box__desc {
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.92;
  max-width: 580px;
  margin: 0 auto var(--space-6);
}

.demo-cta-box__buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

@media (max-width: 640px) {
  .calendar-card-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
