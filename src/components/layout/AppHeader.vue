<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { useHeaderScroll } from '@/composables/useHeaderScroll'
import DesktopNav from './DesktopNav.vue'
import MobileNav from './MobileNav.vue'
import MobileNavDrawer from './MobileNavDrawer.vue'

const drawerOpen = ref(false)
const { scrolled } = useHeaderScroll()
const { isNavDesktop } = useBreakpoints()

watch(isNavDesktop, (desktop) => {
  if (desktop) drawerOpen.value = false
})
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': scrolled, 'is-desktop': isNavDesktop }">
    <div class="app-header__hairline" aria-hidden="true" />
    <AppContainer size="xl" class="app-header__bar">
      <RouterLink to="/" class="app-header__brand" aria-label="Valu8er home">
        <span class="app-header__brand-glow" aria-hidden="true" />
        <AppLogo variant="lockup" :size="isNavDesktop ? 48 : 40" />
      </RouterLink>

      <div v-if="isNavDesktop" class="app-header__center">
        <DesktopNav />
      </div>

      <div v-if="isNavDesktop" class="app-header__actions">
        <ThemeToggle />
        <span class="app-header__divider" aria-hidden="true" />
        <AppButton variant="ghost" to="/login">Login</AppButton>
        <AppButton to="/get-started" class="app-header__cta">Get Started</AppButton>
      </div>

      <MobileNav v-else :open="drawerOpen" @toggle="drawerOpen = !drawerOpen" />
    </AppContainer>
  </header>
  <MobileNavDrawer :open="drawerOpen" @close="drawerOpen = false" />
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  isolation: isolate;
  border-bottom: 1px solid transparent;
  background: color-mix(in srgb, var(--color-bg) 55%, transparent);
  backdrop-filter: blur(10px) saturate(1.15);
  transition:
    background var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    backdrop-filter var(--duration-base) var(--ease-out);
}

.app-header__hairline {
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    color-mix(in srgb, var(--color-brand-primary) 0%, transparent) 12%,
    color-mix(in srgb, var(--color-brand-primary) 55%, transparent) 50%,
    color-mix(in srgb, var(--color-brand-primary) 0%, transparent) 88%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
}

.app-header.is-scrolled {
  border-bottom-color: color-mix(in srgb, var(--color-border) 85%, transparent);
  background: color-mix(in srgb, var(--color-surface) 78%, transparent);
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--color-brand-primary) 8%, transparent),
    var(--shadow-xs);
  backdrop-filter: blur(18px) saturate(1.25);
}

.app-header.is-scrolled .app-header__hairline {
  opacity: 1;
}

.app-header__bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 4.75rem;
  padding-block: 0.35rem;
}

.app-header.is-desktop .app-header__bar {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-6);
}

.app-header__brand {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: transform var(--duration-fast) var(--ease-out);
}

.app-header__brand:hover {
  transform: translateY(-1px);
}

.app-header__brand-glow {
  position: absolute;
  inset: -0.35rem -0.5rem;
  border-radius: inherit;
  background: radial-gradient(
    circle at 20% 50%,
    color-mix(in srgb, var(--color-brand-primary) 22%, transparent),
    transparent 68%
  );
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
  pointer-events: none;
  z-index: -1;
}

.app-header__brand:hover .app-header__brand-glow {
  opacity: 1;
}

.app-header__center {
  display: flex;
  justify-content: center;
  min-width: 0;
}

.app-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
}

.app-header__divider {
  width: 1px;
  height: 1.35rem;
  margin-inline: var(--space-1);
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in srgb, var(--color-border-strong, var(--color-border)) 90%, transparent),
    transparent
  );
}

.app-header__cta {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-brand-primary) 18%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .app-header,
  .app-header__brand,
  .app-header__brand-glow,
  .app-header__hairline {
    transition: none;
  }

  .app-header__brand:hover {
    transform: none;
  }
}
</style>
