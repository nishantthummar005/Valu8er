<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppSection from '@/components/ui/AppSection.vue'
import { useReveal } from '@/composables/useReveal'
import { onboardingSteps, onboardingVideo } from '@/data/homeDemo'

const root = ref<HTMLElement | null>(null)
const { visible } = useReveal(root)

const activeId = ref<(typeof onboardingSteps)[number]['id']>(onboardingSteps[0].id)
const tabRefs = ref<HTMLButtonElement[]>([])
const videoPlaying = ref(false)

const active = computed(() => onboardingSteps.find((s) => s.id === activeId.value) ?? onboardingSteps[0])

const embedSrc = computed(
  () =>
    `https://www.youtube-nocookie.com/embed/${onboardingVideo.youtubeId}?rel=0&modestbranding=1&playsinline=1${
      videoPlaying.value ? '&autoplay=1' : ''
    }`,
)

function setTabRef(el: unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

async function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowRight') next = (index + 1) % onboardingSteps.length
  if (event.key === 'ArrowLeft') next = (index - 1 + onboardingSteps.length) % onboardingSteps.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = onboardingSteps.length - 1

  const step = onboardingSteps[next]
  if (!step) return
  activeId.value = step.id
  await nextTick()
  tabRefs.value[next]?.focus()
}

function playVideo() {
  videoPlaying.value = true
}
</script>

<template>
  <AppSection tone="muted">
    <AppContainer size="xl">
      <div ref="root" class="onboarding" :class="{ 'is-visible': visible }">
        <header>
          <p class="section-kicker">Getting started</p>
          <h2 class="text-h1 text-balance">
            Leaving spreadsheets behind? We make the move
            <span class="heading-accent">feel light.</span>
          </h2>
          <p class="text-body">
            Most valuation work still lives in desktop files. Moving into Valu8er takes days, not
            months — and the workflow compounds with every rolled-forward engagement.
          </p>
        </header>

        <div class="onboarding__tabs" role="tablist" aria-label="Getting started steps">
          <button
            v-for="(step, index) in onboardingSteps"
            :key="step.id"
            :ref="(el) => setTabRef(el, index)"
            type="button"
            role="tab"
            :id="`onboard-tab-${step.id}`"
            :aria-controls="`onboard-panel-${step.id}`"
            :aria-selected="activeId === step.id"
            :tabindex="activeId === step.id ? 0 : -1"
            :class="{ 'is-active': activeId === step.id }"
            @click="activeId = step.id"
            @keydown="onTabKeydown($event, index)"
          >
            <span>{{ step.n }}</span>
            {{ step.id === 'start' ? 'Onboarding' : step.id === 'migrate' ? 'Migration' : 'Support' }}
          </button>
        </div>

        <div class="onboarding__body">
          <article
            :id="`onboard-panel-${active.id}`"
            :key="active.id"
            class="onboarding__panel"
            role="tabpanel"
            :aria-labelledby="`onboard-tab-${active.id}`"
          >
            <p class="onboarding__n">{{ active.n }}</p>
            <h3 class="text-h2">{{ active.title }}</h3>
            <p class="text-body">{{ active.copy }}</p>
            <ul>
              <li v-for="point in active.points" :key="point">{{ point }}</li>
            </ul>
          </article>

          <aside class="onboarding__media" aria-label="Product walkthrough video">
            <div class="onboarding__video">
              <div class="onboarding__video-frame">
                <iframe
                  v-if="videoPlaying"
                  :src="embedSrc"
                  :title="onboardingVideo.title"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  referrerpolicy="strict-origin-when-cross-origin"
                />
                <button
                  v-else
                  type="button"
                  class="onboarding__poster"
                  :aria-label="`Play ${onboardingVideo.title}`"
                  @click="playVideo"
                >
                  <span class="onboarding__poster-art" aria-hidden="true">
                    <span class="onboarding__poster-grid" />
                    <span class="onboarding__poster-card">
                      <span class="onboarding__poster-dot" />
                      <span class="onboarding__poster-lines">
                        <i /><i /><i />
                      </span>
                      <span class="onboarding__poster-chart">
                        <i /><i /><i /><i /><i />
                      </span>
                    </span>
                  </span>
                  <span class="onboarding__poster-veil" aria-hidden="true" />
                  <span class="onboarding__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                      <path d="M8.5 6.8v10.4L18 12 8.5 6.8z" />
                    </svg>
                  </span>
                  <span class="onboarding__duration">{{ onboardingVideo.duration }}</span>
                </button>
              </div>
            </div>
            <div class="onboarding__media-meta">
              <p class="onboarding__media-label">Product tour</p>
              <p class="onboarding__media-caption">{{ onboardingVideo.caption }}</p>
            </div>
          </aside>
        </div>
      </div>
    </AppContainer>
  </AppSection>
</template>

<style scoped>
.onboarding {
  display: grid;
  gap: var(--space-7);
}

.onboarding header {
  display: grid;
  gap: var(--space-3);
}

.section-kicker {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.onboarding__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.onboarding__tabs button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.7rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full, 999px);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color var(--duration-base) var(--ease-out),
    color var(--duration-base) var(--ease-out),
    background var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.onboarding__tabs button:hover:not(.is-active) {
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.onboarding__tabs button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.onboarding__tabs button span {
  color: var(--color-brand-primary);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
}

.onboarding__tabs button.is-active {
  border-color: transparent;
  background: var(--color-text);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-sm);
}

.onboarding__tabs button.is-active span {
  color: var(--color-brand-highlight);
}

[data-theme='dark'] .onboarding__tabs button {
  background: var(--color-surface-elevated);
  border-color: var(--color-border-strong);
}

[data-theme='dark'] .onboarding__tabs button.is-active {
  background: var(--color-text);
  color: var(--color-text-inverse);
  border-color: transparent;
  box-shadow: none;
}

[data-theme='dark'] .onboarding__tabs button.is-active span {
  color: var(--color-brand-deep);
}

.onboarding__body {
  display: grid;
  gap: var(--space-6);
  align-items: stretch;
}

.onboarding__panel {
  display: grid;
  gap: var(--space-4);
  align-content: start;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  background: color-mix(in srgb, var(--color-surface-muted) 35%, var(--color-surface));
  box-shadow: var(--shadow-xs);
  animation: reveal-up var(--duration-base) var(--ease-out) both;
}

.onboarding__n {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.onboarding__panel ul {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.onboarding__panel li {
  position: relative;
  padding-left: 1.1rem;
}

.onboarding__panel li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: var(--color-brand-primary);
}

.onboarding__media {
  display: grid;
  gap: var(--space-4);
  align-content: start;
  animation: reveal-up var(--duration-base) var(--ease-out) both;
  animation-delay: 80ms;
}

.onboarding__video {
  position: relative;
  border-radius: var(--radius-2xl);
  padding: 1px;
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-brand-bright) 55%, transparent),
      color-mix(in srgb, var(--color-border-strong) 70%, transparent) 42%,
      color-mix(in srgb, var(--color-brand-primary) 35%, transparent)
    );
  box-shadow: var(--shadow-md);
}

.onboarding__video::before {
  content: '';
  position: absolute;
  inset: -18% -8% auto;
  height: 55%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, var(--color-glow), transparent 68%);
  opacity: 0.9;
}

.onboarding__video-frame {
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: calc(var(--radius-2xl) - 1px);
  background: #0b1220;
  aspect-ratio: 16 / 9;
}

.onboarding__video-frame iframe,
.onboarding__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.onboarding__poster {
  display: grid;
  place-items: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: #fff;
  background: #171f2f;
}

.onboarding__poster-art {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 18%, rgba(20, 184, 166, 0.28), transparent 34%),
    radial-gradient(circle at 18% 78%, rgba(13, 148, 136, 0.18), transparent 36%),
    linear-gradient(160deg, #1a2438 0%, #101826 55%, #0c1422 100%);
}

.onboarding__poster-grid {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.14) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(180deg, #000 20%, transparent 90%);
}

.onboarding__poster-card {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 18%;
  bottom: 22%;
  display: grid;
  gap: 0.75rem;
  align-content: start;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background: rgba(23, 31, 47, 0.82);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(8px);
}

.onboarding__poster-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #2dd4bf;
  box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.16);
}

.onboarding__poster-lines {
  display: grid;
  gap: 0.4rem;
}

.onboarding__poster-lines i {
  display: block;
  height: 0.4rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.28);
}

.onboarding__poster-lines i:nth-child(1) {
  width: 58%;
  background: rgba(94, 234, 212, 0.45);
}

.onboarding__poster-lines i:nth-child(2) {
  width: 78%;
}

.onboarding__poster-lines i:nth-child(3) {
  width: 46%;
}

.onboarding__poster-chart {
  display: flex;
  align-items: end;
  gap: 0.4rem;
  height: 3.2rem;
  margin-top: 0.35rem;
}

.onboarding__poster-chart i {
  flex: 1;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, #5eead4, #0d9488);
  opacity: 0.85;
}

.onboarding__poster-chart i:nth-child(1) { height: 42%; }
.onboarding__poster-chart i:nth-child(2) { height: 68%; }
.onboarding__poster-chart i:nth-child(3) { height: 54%; }
.onboarding__poster-chart i:nth-child(4) { height: 86%; }
.onboarding__poster-chart i:nth-child(5) { height: 72%; }

.onboarding__poster-veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 18, 32, 0.08) 0%, rgba(11, 18, 32, 0.42) 100%),
    radial-gradient(circle at 50% 45%, transparent 18%, rgba(11, 18, 32, 0.35) 100%);
}

.onboarding__play {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-brand-primary) 92%, #062321);
  color: #fff;
  box-shadow:
    0 0 0 10px color-mix(in srgb, var(--color-brand-primary) 18%, transparent),
    var(--shadow-md);
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.onboarding__poster:hover .onboarding__play,
.onboarding__poster:focus-visible .onboarding__play {
  transform: scale(1.06);
  background: var(--color-brand-bright);
}

.onboarding__poster:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 3px;
}

.onboarding__play svg {
  margin-left: 0.15rem;
}

.onboarding__duration {
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  z-index: 1;
  padding: 0.3rem 0.55rem;
  border-radius: var(--radius-sm);
  background: rgba(11, 18, 32, 0.78);
  color: #f8fafc;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
}

.onboarding__media-meta {
  display: grid;
  gap: 0.35rem;
  padding-inline: 0.15rem;
}

.onboarding__media-label {
  margin: 0;
  color: var(--color-brand-primary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.onboarding__media-caption {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (min-width: 900px) {
  .onboarding__body {
    grid-template-columns: minmax(0, 1.05fr) minmax(17rem, 0.95fr);
    gap: var(--space-7);
    align-items: center;
  }

  .onboarding__panel {
    min-height: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .onboarding__panel,
  .onboarding__media {
    animation: none;
  }

  .onboarding__play {
    transition: none;
  }
}
</style>
