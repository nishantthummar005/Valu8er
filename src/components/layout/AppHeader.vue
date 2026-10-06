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
  <header class="app-header" :class="{ 'is-scrolled': scrolled }">
    <AppContainer size="xl" class="app-header__bar" :class="{ 'is-desktop': isNavDesktop }">
      <RouterLink to="/" class="app-header__brand" aria-label="Valu8er home">
        <AppLogo variant="lockup" :size="isNavDesktop ? 32 : 28" />
      </RouterLink>
      <DesktopNav v-if="isNavDesktop" />
      <div v-if="isNavDesktop" class="app-header__actions">
        <ThemeToggle />
        <AppButton variant="ghost" to="/login">Login</AppButton>
        <AppButton to="/get-started">Get Started</AppButton>
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
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  background: color-mix(in srgb, var(--color-bg) 42%, transparent);
  transition:
    background var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.app-header.is-scrolled {
  border-bottom-color: var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  box-shadow: var(--shadow-xs);
  backdrop-filter: blur(16px);
}

.app-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 4.25rem;
}

.app-header__bar.is-desktop {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
}

.app-header__brand {
  display: inline-flex;
  flex-shrink: 0;
  justify-self: start;
  color: inherit;
  text-decoration: none;
}

.app-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  justify-self: end;
}

@media (prefers-reduced-motion: reduce) {
  .app-header {
    transition: none;
  }
}
</style>
