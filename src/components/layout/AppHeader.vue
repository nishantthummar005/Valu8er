<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppContainer from '@/components/ui/AppContainer.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'
import { useHeaderScroll } from '@/composables/useHeaderScroll'
import { useAuthStore } from '@/stores/auth'
import DesktopNav from './DesktopNav.vue'
import MobileNav from './MobileNav.vue'
import MobileNavDrawer from './MobileNavDrawer.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const drawerOpen = ref(false)
const isUserMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

const { scrolled } = useHeaderScroll()
const { isNavDesktop } = useBreakpoints()

watch(isNavDesktop, (desktop) => {
  if (desktop) drawerOpen.value = false
})

watch(
  () => route.path,
  () => {
    isUserMenuOpen.value = false
  },
)

function handleAdminDashboard() {
  isUserMenuOpen.value = false
  authStore.openDashboard()
}

async function handleLogout() {
  isUserMenuOpen.value = false
  await authStore.logout()
  if (route.path.startsWith('/login')) {
    void router.push('/home')
  }
}

function handlePointerOutside(event: MouseEvent) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    isUserMenuOpen.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isUserMenuOpen.value) {
    isUserMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handlePointerOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handlePointerOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="app-header" :class="{ 'is-scrolled': scrolled, 'is-desktop': isNavDesktop }">
    <div class="app-header__hairline" aria-hidden="true" />
    <AppContainer size="xxl" class="app-header__bar">
      <RouterLink to="/" class="app-header__brand" aria-label="Valu8er home">
        <span class="app-header__brand-glow" aria-hidden="true" />
        <AppLogo variant="mark" :size="isNavDesktop ? 40 : 34" />
      </RouterLink>

      <div v-if="isNavDesktop" class="app-header__center">
        <DesktopNav />
      </div>

      <div v-if="isNavDesktop" class="app-header__actions">
        <ThemeToggle />
        <span class="app-header__divider" aria-hidden="true" />

        <template v-if="authStore.isAuthenticated">
          <!-- User Profile Dropdown Menu -->
          <div ref="userMenuRef" class="user-menu">
            <button
              type="button"
              class="user-menu__trigger"
              :class="{ 'is-open': isUserMenuOpen }"
              :aria-expanded="isUserMenuOpen"
              aria-label="User account menu"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <span class="user-menu__avatar">
                <img
                  v-if="authStore.user?.avatar"
                  :src="authStore.user.avatar"
                  :alt="authStore.fullName"
                  class="user-menu__avatar-img"
                />
                <span v-else class="user-menu__avatar-initials">
                  {{ authStore.initials }}
                </span>
              </span>
              <span class="user-menu__greeting">Hi {{ authStore.displayName }}</span>
              <v-icon
                icon="mdi-chevron-down"
                size="16"
                class="user-menu__chevron"
                :class="{ 'is-rotated': isUserMenuOpen }"
              />
            </button>

            <transition name="dropdown-pop">
              <div v-if="isUserMenuOpen" class="user-menu__dropdown" role="menu">
                <div class="user-menu__header">
                  <div class="user-menu__header-avatar">
                    <img
                      v-if="authStore.user?.avatar"
                      :src="authStore.user.avatar"
                      :alt="authStore.fullName"
                      class="user-menu__avatar-img"
                    />
                    <span v-else class="user-menu__avatar-initials">
                      {{ authStore.initials }}
                    </span>
                  </div>
                  <div class="user-menu__header-details">
                    <span class="user-menu__header-name">{{ authStore.fullName }}</span>
                    <span class="user-menu__header-email">{{ authStore.email }}</span>
                    <span v-if="authStore.organizationName" class="user-menu__header-org">
                      {{ authStore.organizationName }}
                    </span>
                  </div>
                </div>

                <div class="user-menu__divider" />

                <div class="user-menu__items">
                  <button
                    type="button"
                    class="user-menu__item"
                    @click="handleAdminDashboard"
                  >
                    <v-icon icon="mdi-view-dashboard-outline" size="18" class="user-menu__item-icon" />
                    <span>Admin Dashboard</span>
                    <v-icon icon="mdi-open-in-new" size="14" class="user-menu__item-badge" />
                  </button>

                  <button
                    type="button"
                    class="user-menu__item user-menu__item--danger"
                    :disabled="authStore.isLoggingOut"
                    @click="handleLogout"
                  >
                    <v-icon
                      :icon="authStore.isLoggingOut ? 'mdi-loading' : 'mdi-logout'"
                      size="18"
                      class="user-menu__item-icon"
                      :class="{ 'mdi-spin': authStore.isLoggingOut }"
                    />
                    <span>{{ authStore.isLoggingOut ? 'Logging out...' : 'Logout' }}</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </template>

        <template v-else>
          <AppButton variant="ghost" size="sm" to="/login">Login</AppButton>
          <AppButton size="sm" to="/get-started" class="app-header__cta">Get Started</AppButton>
        </template>
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
  gap: var(--space-3);
  min-height: 4.5rem;
  padding-block: 0.35rem;
}

.app-header.is-desktop .app-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
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
  align-items: center;
  flex: 1;
  min-width: 0;
  padding-inline: var(--space-2);
}

.app-header__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  flex-shrink: 0;
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

/* User Profile Menu */
.user-menu {
  position: relative;
}

.user-menu__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.85rem 0.35rem 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu__trigger:hover,
.user-menu__trigger.is-open {
  border-color: var(--color-brand-primary);
  background: color-mix(in srgb, var(--color-brand-primary) 8%, var(--color-surface));
}

.user-menu__avatar {
  display: grid;
  place-items: center;
  width: 1.95rem;
  height: 1.95rem;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-brand-primary), #009988);
  color: #031417;
  font-size: 0.775rem;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.user-menu__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-menu__greeting {
  font-weight: 600;
  color: var(--color-text);
}

.user-menu__chevron {
  color: var(--color-text-muted);
  transition: transform 0.2s ease;
}

.user-menu__chevron.is-rotated {
  transform: rotate(180deg);
}

.user-menu__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 50;
  min-width: 250px;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
}

.user-menu__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.5rem 0.4rem;
}

.user-menu__header-avatar {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-brand-primary), #009988);
  color: #031417;
  font-size: 0.85rem;
  font-weight: 750;
}

.user-menu__header-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.user-menu__header-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu__header-email {
  font-size: 0.775rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu__header-org {
  font-size: 0.725rem;
  font-weight: 600;
  color: var(--color-brand-primary);
  margin-top: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-menu__divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.4rem 0;
}

.user-menu__items {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-menu__item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 550;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s ease, color 0.15s ease;
}

.user-menu__item:hover {
  background: color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
  color: var(--color-brand-primary);
}

.user-menu__item-icon {
  color: var(--color-text-muted);
  transition: color 0.15s ease;
}

.user-menu__item:hover .user-menu__item-icon {
  color: var(--color-brand-primary);
}

.user-menu__item-badge {
  margin-left: auto;
  color: var(--color-text-muted);
}

.user-menu__item--danger {
  color: #ef4444;
}

.user-menu__item--danger .user-menu__item-icon {
  color: #ef4444;
}

.user-menu__item--danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.user-menu__item--danger:hover .user-menu__item-icon {
  color: #dc2626;
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
