<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()

// Launch Target Date: 10 days from now
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 10)

const timeLeft = ref({
  days: 10,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

let timerInterval: ReturnType<typeof setInterval> | null = null

function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance <= 0) {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (timerInterval) clearInterval(timerInterval)
    return
  }

  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  document.title = 'Coming Soon — Valu8er'
  updateCountdown()
  timerInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="coming-soon" :class="{ 'is-dark': theme.isDark }">
    <!-- Futuristic Animated Background Effects -->
    <div class="futuristic-bg" aria-hidden="true">
      <!-- Undulating Aurora Gradients -->
      <div class="aurora-beam aurora-beam--1" />
      <div class="aurora-beam aurora-beam--2" />
      <div class="aurora-beam aurora-beam--3" />

      <!-- Interactive Cyber Perspective Horizon Grid -->
      <div class="cyber-grid" />

      <!-- Floating Tech Spark Orbs -->
      <div class="tech-orb tech-orb--1" />
      <div class="tech-orb tech-orb--2" />
      <div class="tech-orb tech-orb--3" />
      <div class="tech-orb tech-orb--4" />
      <div class="tech-orb tech-orb--5" />
    </div>

    <!-- Top Navigation Bar -->
    <header class="coming-soon__nav">
      <div class="nav-container">
        <div class="nav-actions">
          <ThemeToggle />

          <!-- <span class="nav-divider" aria-hidden="true" /> -->

          <!-- Direct View Home Button -->
          <!--<RouterLink to="/home" class="nav-cta-btn nav-cta-btn--home" title="View Home Page">
            <v-icon icon="mdi-home-variant-outline" size="18" class="btn-icon" />
            <span class="btn-text">View Home</span>
          </RouterLink> -->

          <!-- Other Pages Dropdown --> 
          <!-- <div ref="pagesMenuRef" class="nav-pages-dropdown">
            <button
              type="button"
              class="nav-cta-btn nav-cta-btn--pages"
              :class="{ 'is-active': isPagesOpen }"
              :aria-expanded="isPagesOpen"
              aria-label="View other pages"
              @click="togglePagesMenu" >
              <v-icon icon="mdi-view-grid-outline" size="18" class="btn-icon" />
              <v-icon
                icon="mdi-chevron-down"
                size="16"
                class="btn-chevron"
                :class="{ 'is-rotated': isPagesOpen }"
              />
            </button>

            <transition name="dropdown-pop">
              <div v-if="isPagesOpen" class="pages-menu" role="menu">
                <div class="pages-menu__header">
                  <div class="pages-menu__header-title">
                    <v-icon icon="mdi-compass-outline" size="16" />
                    <span>Explore Valu8er Pages</span>
                  </div>
                  <div class="pages-menu__header-sub">Navigate to preview pages across the platform</div>
                </div>

                <div class="pages-menu__body">
                  <div v-for="group in sitePages" :key="group.title" class="pages-menu__group">
                    <div class="pages-menu__group-title">{{ group.title }}</div>
                    <div class="pages-menu__list">
                      <RouterLink
                        v-for="pageItem in group.items"
                        :key="pageItem.path"
                        :to="pageItem.path"
                        class="pages-menu__item"
                        @click="closePagesMenu"
                      >
                        <div class="item-icon-box">
                          <v-icon :icon="pageItem.icon" size="17" />
                        </div>
                        <div class="item-content">
                          <div class="item-header">
                            <span class="item-name">{{ pageItem.name }}</span>
                            <span v-if="pageItem.badge" class="item-badge">{{ pageItem.badge }}</span>
                          </div>
                          <span class="item-desc">{{ pageItem.desc }}</span>
                        </div>
                        <v-icon icon="mdi-arrow-right" size="14" class="item-arrow" />
                      </RouterLink>
                    </div>
                  </div>
                </div>

                <div class="pages-menu__footer">
                  <span class="pages-menu__footer-hint">Tip: Press <kbd>Esc</kbd> to close</span>
                </div>
              </div>
            </transition> 
          </div> -->  
        </div>
      </div>
    </header>

    <!-- Main Hero Stage -->
    <main class="coming-soon__content">
      <div class="hero-container">
        <!-- Futuristic Holographic Logo Showcase -->
        <div class="logo-stage">
          <!-- Concentric Orbiting HUD Tech Rings -->
          <div class="hud-ring hud-ring--outer" />
          <div class="hud-ring hud-ring--dashed" />
          <div class="hud-ring hud-ring--inner" />

          <!-- Floating Orbit Satellite Dots -->
          <div class="orbit-satellite" />

          <!-- Radial Holographic Aura Halo -->
          <div class="holo-aura" />

          <!-- Tech Core Logo Card with Futuristic Corner Brackets -->
          <div class="logo-card">
            <span class="corner-bracket corner-bracket--tl" />
            <span class="corner-bracket corner-bracket--tr" />
            <span class="corner-bracket corner-bracket--bl" />
            <span class="corner-bracket corner-bracket--br" />

            <AppLogo variant="mark" :size="92" />
          </div>
        </div>

        <!-- Launch Badge with Shimmer Sheen -->
        <div class="launch-pill">
          <span class="launch-pill__shimmer" />
          <span class="launch-pill__icon">
            <v-icon icon="mdi-sparkles" size="14" />
          </span>
          <span class="launch-pill__text">Next-Gen Valuation Platform</span>
        </div>

        <!-- Headline & Subtitle -->
        <h1 class="hero-headline">
          <span class="headline-gradient">Coming soon.</span>
        </h1>

        <p class="hero-subtitle">
          Valu8er combines guided valuation modeling, automated market comparables, and delivery-ready executive reports into one seamless experience.
        </p>

        <!-- Futuristic HUD Countdown Clock (10 Days) -->
        <div class="countdown-section">
          <div class="countdown-hud">
            <div class="countdown-card">
              <span class="hud-corner hud-corner--tl" />
              <span class="hud-corner hud-corner--br" />
              <div class="countdown-number">{{ String(timeLeft.days).padStart(2, '0') }}</div>
              <div class="countdown-label">Days</div>
            </div>

            <div class="countdown-divider">
              <span class="divider-dot" />
              <span class="divider-dot" />
            </div>

            <div class="countdown-card">
              <span class="hud-corner hud-corner--tl" />
              <span class="hud-corner hud-corner--br" />
              <div class="countdown-number">{{ String(timeLeft.hours).padStart(2, '0') }}</div>
              <div class="countdown-label">Hours</div>
            </div>

            <div class="countdown-divider">
              <span class="divider-dot" />
              <span class="divider-dot" />
            </div>

            <div class="countdown-card">
              <span class="hud-corner hud-corner--tl" />
              <span class="hud-corner hud-corner--br" />
              <div class="countdown-number">{{ String(timeLeft.minutes).padStart(2, '0') }}</div>
              <div class="countdown-label">Minutes</div>
            </div>

            <div class="countdown-divider">
              <span class="divider-dot" />
              <span class="divider-dot" />
            </div>

            <div class="countdown-card">
              <span class="hud-corner hud-corner--tl" />
              <span class="hud-corner hud-corner--br" />
              <div class="countdown-number">{{ String(timeLeft.seconds).padStart(2, '0') }}</div>
              <div class="countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        <!-- Schedule Appointment CTA Section -->
        <div class="hero-cta-section">
          <a
            href="https://calendly.com/rim-valexp/valu8er-demo-1pm-est"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-schedule-btn"
          >
            <span class="btn-shimmer" aria-hidden="true" />
            <v-icon icon="mdi-calendar-check" size="20" class="btn-icon" />
            <span class="btn-text">Schedule Appointment</span>
            <v-icon icon="mdi-open-in-new" size="16" class="btn-external" />
          </a>
          <p class="hero-cta-subtext">
            <v-icon icon="mdi-clock-outline" size="14" class="subtext-icon" />
            <span>1-on-1 Live Walkthrough & Consultation with Rim Grewal</span>
          </p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="coming-soon__footer">
      <div class="footer-container">
        <span class="footer-copy">© {{ currentYear }} Valu8er Inc. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.coming-soon {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg, #F3F6FB);
  color: var(--color-text, #0B1633);
  overflow-x: hidden;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  transition: background-color 0.4s ease, color 0.4s ease;
}

.coming-soon.is-dark {
  background-color: #0A0F1D;
  color: #F1F5F9;
}

/* ==============================================================================
   FUTURISTIC BACKGROUND ANIMATIONS
   ============================================================================== */
.futuristic-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* Undulating Aurora Wave Beams */
.aurora-beam {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  will-change: transform, opacity;
}

.aurora-beam--1 {
  top: -20%;
  left: 50%;
  width: 900px;
  height: 520px;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(13, 148, 136, 0.22) 0%, rgba(20, 184, 166, 0.1) 45%, transparent 70%);
  animation: aurora-float-1 16s ease-in-out infinite alternate;
}

.coming-soon.is-dark .aurora-beam--1 {
  background: radial-gradient(circle, rgba(20, 184, 166, 0.38) 0%, rgba(13, 148, 136, 0.2) 45%, transparent 70%);
}

.aurora-beam--2 {
  top: 30%;
  right: -15%;
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(56, 189, 248, 0.06) 50%, transparent 75%);
  animation: aurora-float-2 20s ease-in-out infinite alternate;
}

.coming-soon.is-dark .aurora-beam--2 {
  background: radial-gradient(circle, rgba(14, 165, 233, 0.25) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 75%);
}

.aurora-beam--3 {
  bottom: -15%;
  left: -10%;
  width: 700px;
  height: 550px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(13, 148, 136, 0.08) 50%, transparent 75%);
  animation: aurora-float-3 18s ease-in-out infinite alternate;
}

.coming-soon.is-dark .aurora-beam--3 {
  background: radial-gradient(circle, rgba(20, 184, 166, 0.28) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 75%);
}

@keyframes aurora-float-1 {
  0% { transform: translateX(-50%) translateY(0) scale(1); }
  50% { transform: translateX(-47%) translateY(40px) scale(1.08); }
  100% { transform: translateX(-53%) translateY(-20px) scale(0.96); }
}

@keyframes aurora-float-2 {
  0% { transform: translateY(0) rotate(0deg) scale(1); }
  50% { transform: translateY(-60px) rotate(15deg) scale(1.12); }
  100% { transform: translateY(40px) rotate(-10deg) scale(0.92); }
}

@keyframes aurora-float-3 {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-40px) scale(1.1); }
  100% { transform: translateY(30px) scale(0.95); }
}

/* Perspective Cyber Grid */
.cyber-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: radial-gradient(circle at 50% 40%, black 35%, transparent 75%);
  -webkit-mask-image: radial-gradient(circle at 50% 40%, black 35%, transparent 75%);
}

.coming-soon.is-dark .cyber-grid {
  background-image:
    linear-gradient(to right, rgba(45, 212, 191, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(45, 212, 191, 0.06) 1px, transparent 1px);
}


/* Floating Futuristic Tech Spark Orbs */
.tech-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: float-spark 8s ease-in-out infinite;
}

.tech-orb--1 {
  width: 6px;
  height: 6px;
  top: 22%;
  left: 18%;
  background: #14B8A6;
  box-shadow: 0 0 12px #14B8A6;
  animation-duration: 9s;
}

.tech-orb--2 {
  width: 8px;
  height: 8px;
  top: 35%;
  right: 20%;
  background: #38BDF8;
  box-shadow: 0 0 16px #38BDF8;
  animation-duration: 11s;
  animation-delay: -2s;
}

.tech-orb--3 {
  width: 5px;
  height: 5px;
  bottom: 25%;
  left: 28%;
  background: #5EEAD4;
  box-shadow: 0 0 10px #5EEAD4;
  animation-duration: 8s;
  animation-delay: -4s;
}

.tech-orb--4 {
  width: 7px;
  height: 7px;
  top: 65%;
  right: 25%;
  background: #0D9488;
  box-shadow: 0 0 14px #0D9488;
  animation-duration: 10s;
  animation-delay: -1s;
}

.tech-orb--5 {
  width: 4px;
  height: 4px;
  top: 15%;
  right: 42%;
  background: #2DD4BF;
  box-shadow: 0 0 8px #2DD4BF;
  animation-duration: 7s;
  animation-delay: -3s;
}

@keyframes float-spark {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { transform: translateY(-24px) translateX(12px); opacity: 0.9; }
}

/* ==============================================================================
   TOP NAVIGATION
   ============================================================================== */
.coming-soon__nav {
  position: relative;
  z-index: 30;
  background: transparent !important;
  border: none !important;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Top Nav Actions & Buttons */
.nav-divider {
  width: 1px;
  height: 1.5rem;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(13, 148, 136, 0.35),
    transparent
  );
  margin-inline: 0.15rem;
}

.coming-soon.is-dark .nav-divider {
  background: linear-gradient(
    180deg,
    transparent,
    rgba(45, 212, 191, 0.4),
    transparent
  );
}

.nav-cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.35rem;
  padding: 0.4rem 0.95rem;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.825rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
  white-space: nowrap;
}

/* View Home button styling */
.nav-cta-btn--home {
  color: #0B6E6A;
  background: rgba(13, 148, 136, 0.09);
  border: 1px solid rgba(13, 148, 136, 0.28);
  box-shadow: 0 2px 10px rgba(13, 148, 136, 0.08);
}

.coming-soon.is-dark .nav-cta-btn--home {
  color: #5EEAD4;
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(45, 212, 191, 0.35);
  box-shadow: 0 0 16px rgba(20, 184, 166, 0.15);
}

.nav-cta-btn--home:hover {
  color: #FFFFFF;
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%);
  border-color: transparent;
  transform: translateY(-1.5px);
  box-shadow: 0 6px 20px rgba(13, 148, 136, 0.3);
}

.coming-soon.is-dark .nav-cta-btn--home:hover {
  color: #0A0F1D;
  background: linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%);
  border-color: transparent;
  transform: translateY(-1.5px);
  box-shadow: 0 0 24px rgba(45, 212, 191, 0.45);
}

/* Other Pages dropdown button styling */
.nav-cta-btn--pages {
  color: var(--color-text, #0B1633);
  background: var(--color-surface, #FFFFFF);
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.coming-soon.is-dark .nav-cta-btn--pages {
  color: #F1F5F9;
  background: rgba(22, 32, 50, 0.75);
  border-color: rgba(148, 163, 184, 0.22);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.nav-cta-btn--pages:hover,
.nav-cta-btn--pages.is-active {
  color: #0D9488;
  border-color: rgba(13, 148, 136, 0.4);
  background: rgba(13, 148, 136, 0.06);
  transform: translateY(-1.5px);
}

.coming-soon.is-dark .nav-cta-btn--pages:hover,
.coming-soon.is-dark .nav-cta-btn--pages.is-active {
  color: #2DD4BF;
  border-color: rgba(45, 212, 191, 0.45);
  background: rgba(20, 184, 166, 0.14);
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.2);
}

.btn-icon {
  display: inline-flex;
}

.btn-chevron {
  transition: transform 0.25s ease;
  margin-left: -0.15rem;
}

.btn-chevron.is-rotated {
  transform: rotate(180deg);
}

/* Dropdown Menu Container */
.nav-pages-dropdown {
  position: relative;
}

.pages-menu {
  position: absolute;
  top: calc(100% + 0.65rem);
  right: 0;
  width: 370px;
  max-width: calc(100vw - 2rem);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(13, 148, 136, 0.24);
  border-radius: 20px;
  box-shadow:
    0 20px 48px -10px rgba(15, 23, 42, 0.18),
    0 0 24px rgba(13, 148, 136, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 50;
  overflow: hidden;
  text-align: left;
}

.coming-soon.is-dark .pages-menu {
  background: linear-gradient(155deg, rgba(20, 29, 47, 0.96) 0%, rgba(12, 18, 32, 0.98) 100%);
  border-color: rgba(45, 212, 191, 0.35);
  box-shadow:
    0 24px 54px -12px rgba(0, 0, 0, 0.75),
    0 0 32px rgba(45, 212, 191, 0.2);
}

.pages-menu__header {
  padding: 1.1rem 1.25rem 0.9rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  background: linear-gradient(180deg, rgba(13, 148, 136, 0.05) 0%, transparent 100%);
}

.coming-soon.is-dark .pages-menu__header {
  border-bottom-color: rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(45, 212, 191, 0.08) 0%, transparent 100%);
}

.pages-menu__header-title {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 750;
  color: var(--color-text, #0B1633);
}

.coming-soon.is-dark .pages-menu__header-title {
  color: #F8FAFC;
}

.pages-menu__header-sub {
  font-size: 0.75rem;
  color: var(--color-text-secondary, #64748B);
  margin-top: 0.2rem;
}

.coming-soon.is-dark .pages-menu__header-sub {
  color: #94A3B8;
}

.pages-menu__body {
  padding: 0.75rem 0.85rem;
  max-height: 420px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.pages-menu__group + .pages-menu__group {
  margin-top: 0.85rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.coming-soon.is-dark .pages-menu__group + .pages-menu__group {
  border-top-color: rgba(255, 255, 255, 0.06);
}

.pages-menu__group-title {
  font-size: 0.68rem;
  font-weight: 750;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #0D9488;
  padding: 0.25rem 0.5rem 0.4rem;
}

.coming-soon.is-dark .pages-menu__group-title {
  color: #2DD4BF;
}

.pages-menu__list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.pages-menu__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 0.65rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.18s ease;
}

.pages-menu__item:hover {
  background: rgba(13, 148, 136, 0.08);
  transform: translateX(2px);
}

.coming-soon.is-dark .pages-menu__item:hover {
  background: rgba(45, 212, 191, 0.12);
}

.item-icon-box {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: rgba(13, 148, 136, 0.1);
  color: #0D9488;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.coming-soon.is-dark .item-icon-box {
  background: rgba(45, 212, 191, 0.12);
  color: #2DD4BF;
}

.pages-menu__item:hover .item-icon-box {
  background: #0D9488;
  color: #FFFFFF;
}

.coming-soon.is-dark .pages-menu__item:hover .item-icon-box {
  background: #2DD4BF;
  color: #0A0F1D;
}

.item-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.item-name {
  font-size: 0.835rem;
  font-weight: 700;
  color: var(--color-text, #0B1633);
}

.coming-soon.is-dark .item-name {
  color: #F1F5F9;
}

.item-badge {
  font-size: 0.65rem;
  font-weight: 750;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(13, 148, 136, 0.15);
  color: #0D9488;
}

.coming-soon.is-dark .item-badge {
  background: rgba(45, 212, 191, 0.2);
  color: #5EEAD4;
}

.item-desc {
  font-size: 0.72rem;
  color: var(--color-text-secondary, #64748B);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.08rem;
}

.coming-soon.is-dark .item-desc {
  color: #94A3B8;
}

.item-arrow {
  color: var(--color-text-secondary, #94A3B8);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.18s ease;
  flex-shrink: 0;
}

.pages-menu__item:hover .item-arrow {
  opacity: 1;
  transform: translateX(0);
  color: #0D9488;
}

.coming-soon.is-dark .pages-menu__item:hover .item-arrow {
  color: #2DD4BF;
}

.pages-menu__footer {
  padding: 0.55rem 1.15rem;
  background: rgba(15, 23, 42, 0.02);
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.coming-soon.is-dark .pages-menu__footer {
  background: rgba(0, 0, 0, 0.2);
  border-top-color: rgba(255, 255, 255, 0.05);
}

.pages-menu__footer-hint {
  font-size: 0.7rem;
  color: var(--color-text-secondary, #64748B);
}

.pages-menu__footer-hint kbd {
  display: inline-block;
  padding: 0.08rem 0.35rem;
  font-size: 0.65rem;
  font-family: inherit;
  border-radius: 4px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.6);
}

.coming-soon.is-dark .pages-menu__footer-hint kbd {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

/* Dropdown Animation */
.dropdown-pop-enter-active,
.dropdown-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-pop-enter-from,
.dropdown-pop-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

/* ==============================================================================
   MAIN HERO CONTENT
   ============================================================================== */
.coming-soon__content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.5rem 1.5rem;
}

.hero-container {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ==============================================================================
   FUTURISTIC HOLOGRAPHIC LOGO STAGE
   ============================================================================== */
.logo-stage {
  position: relative;
  width: 190px;
  height: 190px;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Concentric HUD Rings */
.hud-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.hud-ring--outer {
  width: 186px;
  height: 186px;
  border: 1px solid rgba(13, 148, 136, 0.25);
  animation: ring-rotate-cw 32s linear infinite;
}

.coming-soon.is-dark .hud-ring--outer {
  border-color: rgba(45, 212, 191, 0.35);
  box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
}

.hud-ring--dashed {
  width: 160px;
  height: 160px;
  border: 1.5px dashed rgba(20, 184, 166, 0.45);
  animation: ring-rotate-ccw 22s linear infinite;
}

.coming-soon.is-dark .hud-ring--dashed {
  border-color: rgba(94, 234, 212, 0.45);
}

.hud-ring--inner {
  width: 136px;
  height: 136px;
  border: 1px solid rgba(14, 165, 233, 0.28);
  animation: ring-rotate-cw 18s linear infinite;
}

/* Satellite Dot Orbiting Outer Ring */
.orbit-satellite {
  position: absolute;
  width: 186px;
  height: 186px;
  border-radius: 50%;
  animation: ring-rotate-cw 12s linear infinite;
  pointer-events: none;
}

.orbit-satellite::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #14B8A6;
  box-shadow: 0 0 12px #2DD4BF, 0 0 20px #14B8A6;
}

@keyframes ring-rotate-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ring-rotate-ccw {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

/* Hologram Aura Halo */
.holo-aura {
  position: absolute;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.4) 0%, rgba(13, 148, 136, 0.18) 55%, transparent 75%);
  filter: blur(28px);
  animation: holo-pulse 3.8s ease-in-out infinite alternate;
}

.coming-soon.is-dark .holo-aura {
  background: radial-gradient(circle, rgba(45, 212, 191, 0.6) 0%, rgba(13, 148, 136, 0.25) 55%, transparent 80%);
  filter: blur(34px);
}

@keyframes holo-pulse {
  0% { transform: scale(0.92); opacity: 0.55; }
  100% { transform: scale(1.16); opacity: 0.95; }
}

/* Futuristic Logo Card */
.logo-card {
  position: relative;
  z-index: 5;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: visible;
}

.coming-soon.is-dark .logo-card {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.logo-card:hover,
.coming-soon.is-dark .logo-card:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: none !important;
}

/* Corner Cyber HUD Brackets */
.corner-bracket {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: #0D9488;
  border-style: solid;
  pointer-events: none;
  transition: all 0.25s ease;
}

.coming-soon.is-dark .corner-bracket {
  border-color: #2DD4BF;
  filter: drop-shadow(0 0 6px #2DD4BF);
}

.corner-bracket--tl {
  top: -6px;
  left: -6px;
  border-width: 2.5px 0 0 2.5px;
}

.corner-bracket--tr {
  top: -6px;
  right: -6px;
  border-width: 2.5px 2.5px 0 0;
}

.corner-bracket--bl {
  bottom: -6px;
  left: -6px;
  border-width: 0 0 2.5px 2.5px;
}

.corner-bracket--br {
  bottom: -6px;
  right: -6px;
  border-width: 0 2.5px 2.5px 0;
}

/* ==============================================================================
   LAUNCH PILL WITH SHIMMER SHEEN
   ============================================================================== */
.launch-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 1.25rem;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--color-brand-primary, #0D9488) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-brand-primary, #0D9488) 32%, transparent);
  box-shadow: 0 4px 16px rgba(13, 148, 136, 0.1);
  margin-bottom: 1.6rem;
  overflow: hidden;
}

.coming-soon.is-dark .launch-pill {
  background: rgba(20, 184, 166, 0.12);
  border-color: rgba(45, 212, 191, 0.4);
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.18);
}

.launch-pill__shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: skewX(-20deg);
  animation: shimmer-sheen 4s ease-in-out infinite;
}

@keyframes shimmer-sheen {
  0% { left: -100%; }
  35%, 100% { left: 160%; }
}

.launch-pill__icon {
  color: #0D9488;
  display: flex;
}

.coming-soon.is-dark .launch-pill__icon {
  color: #2DD4BF;
  filter: drop-shadow(0 0 6px #2DD4BF);
}

.launch-pill__text {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #0B6E6A;
}

.coming-soon.is-dark .launch-pill__text {
  color: #5EEAD4;
}

/* ==============================================================================
   TYPOGRAPHY
   ============================================================================== */
.hero-headline {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.4rem, 4.5vw + 1rem, 3.85rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.035em;
  margin: 0 0 1.25rem 0;
  max-width: 820px;
  color: var(--color-text, #0B1633);
}

.headline-gradient {
  background: linear-gradient(135deg, #0B6E6A 0%, #0D9488 45%, #0284C7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.coming-soon.is-dark .headline-gradient {
  background: linear-gradient(135deg, #2DD4BF 0%, #5EEAD4 45%, #38BDF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 24px rgba(45, 212, 191, 0.35));
}

.hero-subtitle {
  font-size: clamp(1.05rem, 1vw + 0.55rem, 1.22rem);
  line-height: 1.65;
  color: var(--color-text-secondary, #4B5B74);
  margin: 0 0 3.25rem 0;
  max-width: 660px;
}

.coming-soon.is-dark .hero-subtitle {
  color: #94A3B8;
}

/* ==============================================================================
   FUTURISTIC HUD COUNTDOWN CLOCK
   ============================================================================== */
.countdown-section {
  width: 100%;
}

.countdown-hud {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.1rem;
}

.countdown-card {
  position: relative;
  min-width: 92px;
  padding: 1.2rem 1rem;
  border-radius: 18px;
  background: var(--color-surface, #FFFFFF);
  border: 1px solid rgba(13, 148, 136, 0.22);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.07), 0 0 18px rgba(13, 148, 136, 0.08);
  backdrop-filter: blur(14px);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.coming-soon.is-dark .countdown-card {
  background: linear-gradient(145deg, rgba(22, 32, 50, 0.85) 0%, rgba(14, 22, 38, 0.85) 100%);
  border: 1px solid rgba(45, 212, 191, 0.35);
  box-shadow: 0 12px 32px -6px rgba(0, 0, 0, 0.6), 0 0 24px rgba(20, 184, 166, 0.18);
}

.countdown-card:hover {
  transform: translateY(-3px);
  border-color: #0D9488;
  box-shadow: 0 14px 34px rgba(13, 148, 136, 0.2);
}

.coming-soon.is-dark .countdown-card:hover {
  border-color: #2DD4BF;
  box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.7), 0 0 32px rgba(45, 212, 191, 0.35);
}

/* Micro HUD Corner Notches */
.hud-corner {
  position: absolute;
  width: 7px;
  height: 7px;
  border-color: rgba(13, 148, 136, 0.6);
  border-style: solid;
  pointer-events: none;
}

.coming-soon.is-dark .hud-corner {
  border-color: #2DD4BF;
}

.hud-corner--tl {
  top: 4px;
  left: 4px;
  border-width: 1.5px 0 0 1.5px;
}

.hud-corner--br {
  bottom: 4px;
  right: 4px;
  border-width: 0 1.5px 1.5px 0;
}

.countdown-number {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.1rem, 3.2vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text, #0B1633);
  line-height: 1;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
}

.coming-soon.is-dark .countdown-number {
  color: #F8FAFC;
  text-shadow: 0 0 16px rgba(45, 212, 191, 0.25);
}

.countdown-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 750;
  color: #0D9488;
}

.coming-soon.is-dark .countdown-label {
  color: #2DD4BF;
}

/* Pulsing Divider Dots */
.countdown-divider {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  margin-top: -0.6rem;
}

.divider-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #0D9488;
  opacity: 0.6;
  animation: dot-pulse 2s ease-in-out infinite alternate;
}

.coming-soon.is-dark .divider-dot {
  background-color: #2DD4BF;
  box-shadow: 0 0 8px #2DD4BF;
}

.divider-dot:nth-child(2) {
  animation-delay: 0.3s;
}

@keyframes dot-pulse {
  0% { transform: scale(0.8); opacity: 0.3; }
  100% { transform: scale(1.3); opacity: 1; }
}

/* ==============================================================================
   HERO CTA BUTTON (CALENDLY SCHEDULE APPOINTMENT)
   ============================================================================== */
.hero-cta-section {
  margin-top: 3.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  z-index: 10;
}

.hero-schedule-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.95rem 2.25rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%);
  color: #ffffff !important;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 750;
  letter-spacing: -0.01em;
  text-decoration: none;
  box-shadow:
    0 10px 28px -4px rgba(13, 148, 136, 0.4),
    0 0 20px rgba(13, 148, 136, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.coming-soon.is-dark .hero-schedule-btn {
  background: linear-gradient(135deg, #14B8A6 0%, #0284C7 100%);
  box-shadow:
    0 12px 32px -4px rgba(20, 184, 166, 0.45),
    0 0 30px rgba(45, 212, 191, 0.35);
  border-color: rgba(94, 234, 212, 0.4);
}

.hero-schedule-btn:hover {
  transform: translateY(-2.5px) scale(1.02);
  background: linear-gradient(135deg, #0F766E 0%, #0369A1 100%);
  box-shadow:
    0 16px 36px -4px rgba(13, 148, 136, 0.55),
    0 0 40px rgba(13, 148, 136, 0.45);
}

.coming-soon.is-dark .hero-schedule-btn:hover {
  background: linear-gradient(135deg, #2DD4BF 0%, #38BDF8 100%);
  color: #0A0F1D !important;
  box-shadow:
    0 16px 40px -4px rgba(45, 212, 191, 0.65),
    0 0 45px rgba(45, 212, 191, 0.5);
}

.hero-schedule-btn:active {
  transform: translateY(0) scale(0.99);
}

.btn-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-20deg);
  animation: btn-sheen 3.6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes btn-sheen {
  0% { left: -100%; }
  30%, 100% { left: 180%; }
}

.btn-icon {
  flex-shrink: 0;
}

.btn-external {
  opacity: 0.85;
  transition: transform 0.2s ease;
  margin-left: 0.15rem;
}

.hero-schedule-btn:hover .btn-external {
  transform: translate(2px, -2px);
  opacity: 1;
}

.hero-cta-subtext {
  font-size: 0.825rem;
  color: var(--color-text-secondary, #4B5B74);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  opacity: 0.9;
}

.coming-soon.is-dark .hero-cta-subtext {
  color: #94A3B8;
}

.subtext-icon {
  color: #0D9488;
}

.coming-soon.is-dark .subtext-icon {
  color: #2DD4BF;
}

/* ==============================================================================
   FOOTER
   ============================================================================== */
.coming-soon__footer {
  position: relative;
  z-index: 20;
  background: transparent !important;
  border: none !important;
  padding: 2rem 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}


.footer-copy {
  font-size: 0.8125rem;
  color: var(--color-text-secondary, #4B5B74);
}

.coming-soon.is-dark .footer-copy {
  color: #8494AB;
}

/* ==============================================================================
   RESPONSIVE DESIGN
   ============================================================================== */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 1.25rem;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .nav-cta-btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.78rem;
  }

  .nav-cta-btn .btn-text {
    display: none;
  }

  .pages-menu {
    width: 320px;
  }

  .coming-soon__content {
    padding: 3rem 1.25rem;
  }

  .hero-cta-section {
    margin-top: 2.25rem;
  }

  .hero-schedule-btn {
    padding: 0.85rem 1.65rem;
    font-size: 0.95rem;
  }

  .logo-stage {
    width: 160px;
    height: 160px;
    margin-bottom: 2rem;
  }

  .hud-ring--outer, .orbit-satellite {
    width: 154px;
    height: 154px;
  }

  .hud-ring--dashed {
    width: 136px;
    height: 136px;
  }

  .countdown-hud {
    gap: 0.5rem;
  }

  .countdown-card {
    min-width: 68px;
    padding: 0.9rem 0.65rem;
  }

  .countdown-number {
    font-size: 1.85rem;
  }

  .footer-center {
    flex-direction: column;
    gap: 0.65rem;
    text-align: center;
  }
}
</style>
