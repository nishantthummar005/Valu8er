<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { getFaqs, type FaqItem } from '@/services/faqs'

const loading = ref(true)
const faqs = ref<FaqItem[]>([])
const searchQuery = ref('')
const openId = ref<number | null>(0)

onMounted(async () => {
  try {
    const data = await getFaqs()
    faqs.value = data
  } catch {
    faqs.value = []
  } finally {
    loading.value = false
  }
})

const filteredFaqs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return faqs.value
  return faqs.value.filter(
    (item) =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query),
  )
})

function toggle(index: number) {
  openId.value = openId.value === index ? null : index
}
</script>

<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <AppSection size="lg" class="faq-hero">
      <div class="faq-hero__aura" aria-hidden="true" />
      <AppContainer>
        <div class="faq-hero__content">
          <AppBadge variant="subtle" size="md" class="mb-4">
            <v-icon icon="mdi-help-circle-outline" size="14" class="mr-1" />
            Resources & Help
          </AppBadge>

          <h1 class="faq-hero__title">
            Frequently Asked <span class="gradient-text">Questions</span>
          </h1>

          <p class="faq-hero__subtitle">
            Find answers to common questions about our platform, business hours, order tracking, and support.
          </p>

          <!-- Search Input -->
          <div class="faq-search-box">
            <v-icon icon="mdi-magnify" size="20" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search questions by keyword..."
              aria-label="Search questions"
              class="search-input"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="clear-btn"
              @click="searchQuery = ''"
              aria-label="Clear search"
            >
              <v-icon icon="mdi-close-circle" size="18" />
            </button>
          </div>
        </div>
      </AppContainer>
    </AppSection>

    <!-- FAQ Accordion List Section -->
    <AppSection size="md" class="faq-list-section">
      <AppContainer size="md">
        <!-- Loading State -->
        <div v-if="loading" class="faq-loading">
          <AppLoader text="Fetching questions from server..." />
        </div>

        <!-- FAQ Items -->
        <div v-else-if="filteredFaqs.length > 0" class="faq__list">
          <div
            v-for="(item, index) in filteredFaqs"
            :key="item.id || item.question"
            class="faq__item"
            :class="{ 'is-open': openId === index }"
          >
            <h3>
              <button
                type="button"
                :id="`faq-page-button-${index}`"
                :aria-expanded="openId === index"
                :aria-controls="`faq-page-panel-${index}`"
                class="faq__button"
                @click="toggle(index)"
              >
                <span class="faq__question-text">{{ item.question }}</span>
                <span class="faq__icon" aria-hidden="true">
                  {{ openId === index ? '−' : '+' }}
                </span>
              </button>
            </h3>

            <div
              :id="`faq-page-panel-${index}`"
              role="region"
              :aria-labelledby="`faq-page-button-${index}`"
              :hidden="openId !== index"
              class="faq__panel"
            >
              <p class="faq__answer-text">{{ item.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="faq-empty-state">
          <v-icon icon="mdi-help-box-outline" size="48" class="text-teal mb-3" />
          <h3 class="empty-title">No questions found</h3>
          <p class="empty-desc">
            We couldn't find any questions matching "{{ searchQuery }}". Try another keyword or reach out to our team.
          </p>
          <AppButton variant="outline" @click="searchQuery = ''">
            Reset Search
          </AppButton>
        </div>
      </AppContainer>
    </AppSection>

    <!-- Still Have Questions Section -->
    <AppSection size="lg" class="faq-cta-section">
      <AppContainer size="md">
        <AppCard variant="glass" class="faq-cta-card">
          <div class="cta-icon-badge">
            <v-icon icon="mdi-headset" size="28" />
          </div>
          <h2 class="cta-title">Still have questions?</h2>
          <p class="cta-desc">
            Can't find the answer you're looking for? Speak directly with our valuation specialists and technical team.
          </p>
          <div class="cta-actions">
            <AppButton variant="primary" to="/contact" icon="mdi-message-text-outline">
              Contact Us
            </AppButton>
            <AppButton variant="outline" to="/schedule-appointment" icon="mdi-calendar">
              Schedule Appointment
            </AppButton>
          </div>
        </AppCard>
      </AppContainer>
    </AppSection>
  </div>
</template>

<style scoped>
.faq-page {
  position: relative;
  overflow-x: clip;
}

/* Hero Section */
.faq-hero {
  position: relative;
  text-align: center;
  padding-block: var(--space-12) var(--space-8);
  isolation: isolate;
}

.faq-hero__aura {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, rgba(2, 132, 199, 0.12) 50%, transparent 70%);
  filter: blur(90px);
  pointer-events: none;
  z-index: -1;
}

.faq-hero__content {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.faq-hero__title {
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

.faq-hero__subtitle {
  font-size: clamp(1.05rem, 1vw + 0.6rem, 1.25rem);
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 620px;
  margin: 0 0 var(--space-8);
}

/* Search Box */
.faq-search-box {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  max-width: 540px;
  padding: 0.75rem 1.15rem;
  background: var(--color-surface);
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, var(--color-brand-primary));
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transition: all 0.2s ease;
}

.faq-search-box:focus-within {
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-primary) 20%, transparent);
}

.search-icon {
  color: var(--color-brand-primary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--color-text);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.clear-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  padding: 0;
}

.clear-btn:hover {
  color: var(--color-text);
}

/* FAQ List */
.faq-list-section {
  padding-block: var(--space-4) var(--space-12);
}

.faq-loading {
  text-align: center;
  padding: var(--space-12) 0;
}

.faq__list {
  display: grid;
  gap: var(--space-3);
}

.faq__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 16px);
  background: var(--color-surface);
  overflow: hidden;
  transition: all 0.22s ease;
}

.faq__item:hover {
  border-color: color-mix(in srgb, var(--color-brand-primary) 35%, var(--color-border));
}

.faq__item.is-open {
  border-color: color-mix(in srgb, var(--color-brand-primary) 50%, var(--color-border));
  box-shadow: 0 8px 20px rgba(13, 148, 136, 0.08);
}

.faq__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  padding: var(--space-5) var(--space-6);
  background: transparent;
  border: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
}

.faq__question-text {
  font-family: 'Outfit', sans-serif;
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}

.faq__icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface-muted) 80%, transparent);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-brand-primary);
  transition: all 0.2s ease;
}

.faq__item.is-open .faq__icon {
  background: var(--color-brand-primary);
  border-color: var(--color-brand-primary);
  color: #fff;
}

.faq__panel {
  padding: 0 var(--space-6) var(--space-5);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.faq__answer-text {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin: 0;
}

/* Empty State */
.faq-empty-state {
  text-align: center;
  padding: var(--space-12) var(--space-4);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-2xl, 20px);
}

.empty-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 var(--space-2);
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto var(--space-5);
  line-height: 1.55;
}

/* CTA Card */
.faq-cta-section {
  padding-block: var(--space-6) var(--space-16);
}

.faq-cta-card {
  text-align: center;
  padding: var(--space-8) var(--space-6);
  border-radius: var(--radius-2xl, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cta-icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.15) 0%, rgba(2, 132, 199, 0.12) 100%);
  color: #0D9488;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-4);
  border: 1px solid rgba(13, 148, 136, 0.25);
}

.cta-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 750;
  color: var(--color-text);
  margin: 0 0 var(--space-2);
}

.cta-desc {
  font-size: 0.98rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  margin: 0 0 var(--space-6);
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}

.text-teal {
  color: #0D9488;
}
</style>

