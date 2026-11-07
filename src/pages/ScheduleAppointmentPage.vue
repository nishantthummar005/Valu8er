<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppSection from '@/components/ui/AppSection.vue'
import {
  ensureCalendlyAssetsLoaded,
  getCalendlyEventTypes,
  getCalendlyUser,
  openCalendlyPopup,
  type CalendlyEventType,
  type CalendlyUser,
} from '@/services/calendly'

const loading = ref(true)
const user = ref<CalendlyUser | null>(null)
const demoEvent = ref<CalendlyEventType | null>(null)
const inlineWidgetContainer = ref<HTMLElement | null>(null)
const isApiConnected = ref(true)

const perks = [
  {
    icon: 'mdi-monitor-dashboard',
    title: 'Live Platform Walkthrough',
    desc: 'Interactive hands-on demo covering automated comps, DCF valuation modeling, and real-time multiples.',
  },
  {
    icon: 'mdi-account-tie',
    title: 'Consult with Valuation Leaders',
    desc: 'Direct consultation with Rim Grewal, MBA, CPA, CA, CBV, BVIUK, ABV to discuss your workflow and firm goals.',
  },
  {
    icon: 'mdi-calendar-sync',
    title: 'Instant Calendar Confirmation',
    desc: 'Receive immediate Google Calendar / Outlook invites with personalized Zoom conferencing details.',
  },
  {
    icon: 'mdi-shield-check-outline',
    title: 'Secure & Confidential',
    desc: 'All discussions and modeling data are handled under strict enterprise confidentiality standards.',
  },
]

const initInlineWidget = async () => {
  if (!inlineWidgetContainer.value || !demoEvent.value) return

  await nextTick()
  const target = inlineWidgetContainer.value
  const schedulingUrl = demoEvent.value.scheduling_url

  const mountWidget = () => {
    if (window.Calendly?.initInlineWidget && target) {
      target.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: schedulingUrl,
        parentElement: target,
      })
      return true
    }
    return false
  }

  if (!mountWidget()) {
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (mountWidget() || attempts >= 25) {
        clearInterval(interval)
      }
    }, 150)
  }
}

const handlePopupBooking = () => {
  if (demoEvent.value) {
    openCalendlyPopup(demoEvent.value.scheduling_url)
  }
}

onMounted(async () => {
  try {
    const [userData, events] = await Promise.all([
      getCalendlyUser(),
      getCalendlyEventTypes(),
      ensureCalendlyAssetsLoaded(),
    ])

    user.value = userData

    // Pin specifically to the Demo with Rim Grewal appointment
    const targetDemo =
      events.find(
        (e) =>
          e.name.includes('Demo with Rim Grewal') ||
          e.slug.includes('demo') ||
          e.name.toLowerCase().includes('demo'),
      ) || events[0]

    demoEvent.value = targetDemo || null
    isApiConnected.value = true
  } catch {
    isApiConnected.value = false
  } finally {
    loading.value = false
    await nextTick()
    initInlineWidget()
  }
})
</script>

<template>
  <div class="schedule-page">
    <!-- Hero Section -->
    <AppSection size="lg" class="schedule-hero">
      <div class="schedule-hero__aura" aria-hidden="true" />
      <AppContainer>
        <div class="schedule-hero__content">
          <!-- Live API Connectivity Pill -->
          <div class="api-status-badge">
            <span class="status-dot" :class="{ 'is-active': isApiConnected }" />
            <span>Calendly Live API Integrated</span>
            <span class="api-user-tag" v-if="user">• {{ user.name }}</span>
          </div>

          <h1 class="schedule-hero__title">
            Schedule an <span class="gradient-text">Appointment</span>
          </h1>

          <p class="schedule-hero__subtitle">
            Book your live walkthrough with Rim Grewal. Select your preferred date and time directly
            from the calendar below for a comprehensive demonstration of the Valu8er platform.
          </p>

          <!-- Host Profile Card -->
          <div v-if="user" class="host-profile-pill">
            <div class="host-avatar">
              <v-icon icon="mdi-account-tie" size="20" />
            </div>
            <div class="host-info">
              <div class="host-name">{{ user.name }}</div>
              <div class="host-meta">
                <span>{{ user.email }}</span>
                <span class="meta-separator">•</span>
                <span>{{ user.timezone }}</span>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </AppSection>

    <!-- Appointment & Live Calendly Scheduler Section -->
    <AppSection size="md" class="scheduler-section">
      <AppContainer>
        <div class="scheduler-container">
          <div class="scheduler-frame-box">
            <!-- Appointment Header Details -->
            <div class="scheduler-frame-box__header">
              <div class="selected-summary">
                <div class="appointment-eyebrow">
                  <span class="appointment-type-tag">Live Demonstration</span>
                </div>

                <h2 class="appointment-title">
                  {{ demoEvent?.name || 'Demo with Rim Grewal, MBA, CPA, CA, CBV, BVIUK, ABV' }}
                </h2>

                <p v-if="demoEvent?.description_plain" class="appointment-desc">
                  {{ demoEvent.description_plain }}
                </p>

                <div class="selected-details">
                  <span class="detail-badge">
                    <v-icon icon="mdi-clock-outline" size="15" />
                    {{ demoEvent?.duration || 60 }} Minutes
                  </span>
                  <span class="detail-badge">
                    <v-icon icon="mdi-video-outline" size="15" />
                    Zoom Meeting Link Included
                  </span>
                  <span class="detail-badge">
                    <v-icon icon="mdi-account-tie-outline" size="15" />
                    Led by Rim Grewal
                  </span>
                </div>
              </div>

              <div class="header-actions">
                <AppButton
                  variant="primary"
                  icon="mdi-open-in-new"
                  @click="handlePopupBooking"
                  class="popup-btn"
                >
                  Open Popup Scheduler
                </AppButton>
              </div>
            </div>

            <!-- Loader State -->
            <div v-if="loading" class="loading-state">
              <AppLoader text="Fetching live appointment slots from Calendly..." />
            </div>

            <!-- Calendly Live Inline Widget -->
            <div v-show="!loading" class="calendly-widget-wrapper">
              <div
                ref="inlineWidgetContainer"
                class="calendly-inline-target"
                style="min-width: 320px; height: 750px;"
              />
            </div>
          </div>
        </div>
      </AppContainer>
    </AppSection>

    <!-- Why Book Section -->
    <AppSection size="lg" class="why-book-section">
      <AppContainer>
        <div class="section-heading text-center">
          <AppBadge variant="subtle" size="sm" class="mb-3">What To Expect</AppBadge>
          <h2 class="section-title">Designed for Corporate & Advisory Leaders</h2>
          <p class="section-subtitle">
            Zero sales pressure. Our meetings are structured to evaluate technical fit, modeling methodologies, and platform capabilities.
          </p>
        </div>

        <div class="perks-grid">
          <AppCard
            v-for="perk in perks"
            :key="perk.title"
            variant="glass"
            hoverable
            class="perk-card"
          >
            <div class="perk-icon-box">
              <v-icon :icon="perk.icon" size="24" />
            </div>
            <h3 class="perk-title">{{ perk.title }}</h3>
            <p class="perk-desc">{{ perk.desc }}</p>
          </AppCard>
        </div>
      </AppContainer>
    </AppSection>
  </div>
</template>

<style scoped>
.schedule-page {
  position: relative;
  overflow-x: clip;
}

/* Hero Section */
.schedule-hero {
  position: relative;
  text-align: center;
  padding-block: var(--space-12) var(--space-8);
  isolation: isolate;
}

.schedule-hero__aura {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.24) 0%, rgba(2, 132, 199, 0.12) 50%, transparent 70%);
  filter: blur(90px);
  pointer-events: none;
  z-index: -1;
}

.schedule-hero__content {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.api-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.95rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 30%, transparent);
  font-size: 0.8125rem;
  font-weight: 650;
  color: var(--color-brand-primary);
  margin-bottom: var(--space-4);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10B981;
  box-shadow: 0 0 10px #10B981;
  animation: pulse-dot 2s infinite ease-in-out;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
}

.api-user-tag {
  opacity: 0.85;
}

.schedule-hero__title {
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

.schedule-hero__subtitle {
  font-size: clamp(1.05rem, 1vw + 0.6rem, 1.25rem);
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 680px;
  margin: 0 0 var(--space-6);
}

.host-profile-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  box-shadow: var(--shadow-sm);
}

.host-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.host-info {
  text-align: left;
}

.host-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.host-meta {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.meta-separator {
  opacity: 0.5;
}

/* Scheduler Section */
.scheduler-section {
  padding-block: var(--space-2) var(--space-10);
}

.scheduler-container {
  display: flex;
  flex-direction: column;
}

.loading-state {
  padding: var(--space-12) var(--space-6);
  text-align: center;
}

/* Scheduler Frame Box */
.scheduler-frame-box {
  background: var(--color-surface);
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, var(--color-brand-primary));
  border-radius: var(--radius-2xl, 24px);
  box-shadow: 0 20px 48px -12px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(13, 148, 136, 0.08);
  overflow: hidden;
}

.scheduler-frame-box__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-8);
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  background: color-mix(in srgb, var(--color-surface-muted) 50%, transparent);
}

.selected-summary {
  flex: 1;
  min-width: 280px;
}

.appointment-eyebrow {
  margin-bottom: var(--space-2);
}

.appointment-type-tag {
  display: inline-flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 12%, transparent);
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-brand-primary) 25%, transparent);
}

.appointment-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0 0 var(--space-2);
  line-height: 1.3;
}

.appointment-desc {
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 760px;
  margin: 0 0 var(--space-4);
}

.selected-details {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  font-weight: 650;
  color: var(--color-text-secondary);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
}

.header-actions {
  display: flex;
  align-items: center;
}

.popup-btn {
  white-space: nowrap;
}

.calendly-widget-wrapper {
  background: var(--color-surface);
  min-height: 750px;
}

/* Why Book Section */
.why-book-section {
  padding-block: var(--space-8) var(--space-12);
}

.section-heading {
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-5);
}

.perk-card {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl, 18px);
}

.perk-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(2, 132, 199, 0.12) 100%);
  color: #0D9488;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  border: 1px solid rgba(13, 148, 136, 0.2);
}

.perk-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
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

@media (max-width: 640px) {
  .scheduler-frame-box__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
  }

  .popup-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
